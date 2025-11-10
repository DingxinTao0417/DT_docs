# 24 Permissions and Groups: Authorization in Django

This module explains Django’s authorization system: built-in permissions, groups, permission checks in views and admin, and patterns to enforce object-level authorization. Examples include function-level comments detailing purpose, parameters, and return values.

## 1) Built‑in Permissions

- For each model, Django auto‑creates permissions: `add`, `change`, `delete`, `view`.
- Codenames follow `"<app_label>.<action>_<modelname>"`, e.g., `blog.add_article`.
- Migrations create and maintain these permissions.

## 2) Checking Permissions in Views

```python
from django.contrib.auth.decorators import login_required, permission_required
from django.http import HttpRequest, HttpResponse


@login_required(login_url="/login/")
@permission_required("blog.view_article", raise_exception=True)
def article_list_view(request: HttpRequest) -> HttpResponse:
    """
    Render a list of articles for authorized users.

    Parameters:
    - request: HttpRequest, the incoming request containing user info.

    Returns:
    - HttpResponse: Rendered page with articles if user has permission;
      raises 403 or redirects if not authorized.
    """
    # At this point, the user is authenticated and has `view_article`.
    # ... query articles and render template
    return HttpResponse("OK")


def can_edit_article(request: HttpRequest) -> bool:
    """
    Check whether current user can change Article records.

    Parameters:
    - request: HttpRequest, contains `request.user`.

    Returns:
    - bool: True if user has `blog.change_article`; otherwise False.
    """
    return request.user.has_perm("blog.change_article")


def can_bulk_manage(request: HttpRequest) -> bool:
    """
    Check multiple permissions at once for bulk operations.

    Parameters:
    - request: HttpRequest.

    Returns:
    - bool: True if user has all listed permissions.
    """
    perms = [
        "blog.add_article",
        "blog.change_article",
        "blog.delete_article",
    ]
    return request.user.has_perms(perms)
```

### Class‑based Views (CBV)

```python
from django.utils.decorators import method_decorator
from django.views import View


class SecureArticleView(View):
    """
    Example CBV enforcing login and `view_article` permission.

    Methods:
    - get: Requires `blog.view_article` permission.

    Returns:
    - HttpResponse: On success; raises/redirects if unauthorized.
    """

    @method_decorator(login_required(login_url="/login/"))
    @method_decorator(permission_required("blog.view_article", raise_exception=True))
    def get(self, request: HttpRequest) -> HttpResponse:
        return HttpResponse("CBV OK")
```

## 3) Groups: Assign Permissions in Bulk

```python
from django.contrib.auth.models import Group, Permission, User


def create_editor_group() -> Group:
    """
    Create an "Editors" group with common Article permissions.

    Returns:
    - Group: The created or existing Editors group.
    """
    group, _ = Group.objects.get_or_create(name="Editors")
    perms_to_add = Permission.objects.filter(
        codename__in=["add_article", "change_article", "view_article"]
    )
    group.permissions.set(perms_to_add)
    return group


def assign_user_to_group(user: User, group: Group) -> None:
    """
    Assign a user to given group.

    Parameters:
    - user: User instance to be assigned.
    - group: Group instance with desired permissions.

    Returns:
    - None
    """
    user.groups.add(group)
```

Notes:
- Group permissions are inherited by all users in the group.
- `is_staff` grants access to admin site; `is_superuser` bypasses checks.

## 4) Enforcing Permissions in Admin

```python
from django.contrib import admin
from django.contrib.auth.models import User
from blog.models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """
    Admin configuration enforcing view/change/delete permissions and scoped data.

    Customizations:
    - has_view_permission, has_change_permission, has_add_permission, has_delete_permission
    - get_queryset to restrict visible rows (e.g., per-user scope)
    - get_readonly_fields to lock fields based on user roles
    """

    list_display = ("id", "title", "author", "created_at")
    search_fields = ("title", "author__username")
    ordering = ("-created_at",)

    def has_view_permission(self, request, obj=None) -> bool:
        """
        Determine whether request.user can view Article rows.

        Parameters:
        - request: HttpRequest with authenticated user.
        - obj: Optional Article instance; None for changelist.

        Returns:
        - bool: True if user has `blog.view_article` or is superuser.
        """
        return request.user.is_superuser or request.user.has_perm("blog.view_article")

    def has_change_permission(self, request, obj=None) -> bool:
        """
        Determine whether user can change Article records.

        Returns:
        - bool: True if user has `blog.change_article` or is superuser.
        """
        return request.user.is_superuser or request.user.has_perm("blog.change_article")

    def has_add_permission(self, request) -> bool:
        """
        Determine whether user can add Article records.

        Returns:
        - bool: True if user has `blog.add_article` or is superuser.
        """
        return request.user.is_superuser or request.user.has_perm("blog.add_article")

    def has_delete_permission(self, request, obj=None) -> bool:
        """
        Determine whether user can delete Article records.

        Returns:
        - bool: True if user has `blog.delete_article` or is superuser.
        """
        return request.user.is_superuser or request.user.has_perm("blog.delete_article")

    def get_queryset(self, request):
        """
        Restrict visible rows per user or role.

        Parameters:
        - request: HttpRequest with authenticated user.

        Returns:
        - QuerySet: Filtered queryset honoring authorization rules.
        """
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        # Example: non‑superusers only see their own articles
        return qs.filter(author=request.user)

    def get_readonly_fields(self, request, obj=None):
        """
        Lock down fields based on roles or states.

        Returns:
        - list[str]: Field names that are read‑only for current user.
        """
        if request.user.is_superuser:
            return []
        return ["author"]
```

## 5) Object‑level Permissions (Overview)

- Django’s core permissions are model‑level.
- For per‑object permissions (e.g., User A can edit only Article #123), adopt a well‑known pattern:
  - Filter querysets by ownership or role in views/admin (`get_queryset`).
  - Validate in `has_*_permission` with `obj` checks when present.
  - Optionally use third‑party libs (e.g., django‑guardian) for persistent object‑level grants.

## 6) Common Patterns & Pitfalls

- Prefer `has_perm/has_perms` checks over manual role flags to stay declarative.
- Keep "who can see what" centralized: query filtering + permission hooks.
- Use `raise_exception=True` with `permission_required` to return 403 for APIs.
- Superusers bypass checks; staff users need explicit permissions.

## 7) Quick Reference

- `user.has_perm("app.codename")`
- `user.has_perms(["app.a", "app.b"])`
- `@permission_required("app.codename", raise_exception=True)`
- Admin hooks: `has_view_permission`, `has_change_permission`, `has_add_permission`, `has_delete_permission`, `get_queryset`, `get_readonly_fields`