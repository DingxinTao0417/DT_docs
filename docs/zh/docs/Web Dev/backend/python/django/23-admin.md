# 23 Django Admin: Configuration and Customization

This module introduces the built-in Django Admin: enabling the site, registering models, and customizing the admin using `ModelAdmin`, `InlineModelAdmin`, permissions, actions, and display options.

## Enable Admin

- Ensure `INSTALLED_APPS` includes `django.contrib.admin`, `django.contrib.auth`, `django.contrib.contenttypes`, `django.contrib.sessions`, and `django.contrib.messages`.
- Include admin route: `path('admin/', admin.site.urls)` in your project `urls.py`.
- Create a superuser: `python manage.py createsuperuser`.

```python
# mysite/urls.py
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]
```

## Register Models

```python
# app01/admin.py
from django.contrib import admin
from .models import Article, Category, Tag

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """
    Admin configuration for Article.

    Attributes:
        list_display (tuple[str]): Columns shown in the changelist.
        list_filter (tuple[str]): Sidebar filters.
        search_fields (tuple[str]): Searchable fields.
        ordering (tuple[str]): Default ordering.
        date_hierarchy (str): Date drill-down navigation.
        readonly_fields (tuple[str]): Non-editable fields in the form.

    Purpose:
        Provide a curated admin experience for Article objects.
    """
    list_display = ('id', 'title', 'category', 'create_time', 'up_num', 'down_num', 'comment_num')
    list_filter = ('category', 'create_time', 'tags')
    search_fields = ('title', 'desc', 'content')
    ordering = ('-create_time',)
    date_hierarchy = 'create_time'
    readonly_fields = ('up_num', 'down_num', 'comment_num')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for Category.

    Attributes:
        list_display (tuple[str]): Columns to display.
        search_fields (tuple[str]): Searchable fields.

    Purpose:
        Manage article categories in a simple changelist.
    """
    list_display = ('id', 'name', 'blog')
    search_fields = ('name',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """
    Admin configuration for Tag.

    Attributes:
        list_display (tuple[str]): Columns to display.
        search_fields (tuple[str]): Searchable fields.

    Purpose:
        Manage tags efficiently.
    """
    list_display = ('id', 'name', 'blog')
    search_fields = ('name',)
```

## Inline Editing (Related Models)

```python
from django.contrib import admin
from .models import Article, Article2Tag

class Article2TagInline(admin.TabularInline):
    """
    Inline editing for the Article-Tag through model.

    Attributes:
        model (Model): The through model.
        extra (int): Number of empty forms to display.

    Purpose:
        Allow adding/removing tags directly within an Article form.
    """
    model = Article2Tag
    extra = 1

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """
    Extended Article admin with inlines and fieldsets.

    Attributes:
        inlines (list[type[InlineModelAdmin]]): Inline editors.
        fieldsets (tuple): Grouped form layout.

    Purpose:
        Show richer editing UI, grouping fields and managing M2M.
    """
    inlines = [Article2TagInline]
    fieldsets = (
        ('Content', {'fields': ('title', 'desc', 'content', 'category', 'blog')}),
        ('Metrics', {'fields': ('up_num', 'down_num', 'comment_num'), 'classes': ('collapse',)}),
    )
```

## Actions and Permissions

```python
from django.contrib import admin
from django.http import HttpRequest
from typing import Iterable

@admin.action(description='Reset counters to zero')
def reset_counters(modeladmin: admin.ModelAdmin, request: HttpRequest, queryset: Iterable):
    """
    Admin action to reset metrics counters in bulk.

    Args:
        modeladmin (ModelAdmin): The admin class.
        request (HttpRequest): Incoming request from admin.
        queryset (Iterable): Selected objects for batch processing.

    Returns:
        None

    Purpose:
        Demonstrate custom admin actions to manipulate selected rows.
    """
    for obj in queryset:
        obj.up_num = 0
        obj.down_num = 0
        obj.comment_num = 0
        obj.save(update_fields=['up_num', 'down_num', 'comment_num'])

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """
    Article admin with custom actions and permission checks.

    Methods:
        has_add_permission: Control object creation availability.
        has_delete_permission: Control delete access.
        get_queryset: Restrict data visibility.

    Purpose:
        Enforce business rules inside the admin.
    """
    actions = [reset_counters]

    def has_add_permission(self, request: HttpRequest) -> bool:
        """
        Control whether users can add new Article objects.

        Args:
            request (HttpRequest): Admin request object.

        Returns:
            bool: True to allow add; False to deny.

        Purpose:
            Demonstrate fine-grained admin permission control.
        """
        return request.user.is_superuser

    def has_delete_permission(self, request: HttpRequest, obj=None) -> bool:
        """
        Control whether users can delete Article objects.

        Args:
            request (HttpRequest): Admin request object.
            obj (Optional[Model]): Target object, or None for global check.

        Returns:
            bool: True to allow delete; False to deny.

        Purpose:
            Demonstrate object-level delete restriction.
        """
        return request.user.is_superuser

    def get_queryset(self, request: HttpRequest):
        """
        Restrict queryset per user role.

        Args:
            request (HttpRequest): Admin request object.

        Returns:
            QuerySet: Filtered queryset.

        Purpose:
            Example of narrowing visibility based on business rules.
        """
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(up_num__gte=0)
```

## Site Branding

```python
from django.contrib import admin

admin.site.site_header = 'BBS Admin'
admin.site.site_title = 'BBS Admin Portal'
admin.site.index_title = 'Welcome to BBS Administration'
```

## Notes

- Keep actions safe and auditable; log bulk changes.
- Use `readonly_fields` for computed metrics; update via business logic not manual edits.
- Employ inlines for through tables to simplify many-to-many editing.