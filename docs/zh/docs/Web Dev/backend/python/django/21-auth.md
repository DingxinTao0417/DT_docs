# 21 Django Auth: Users, Login, and Extending the Model

This module introduces Django’s built-in auth system, common APIs, and how to extend the `auth_user` table via `AbstractUser`.

## Getting Started

- On initial migrations, Django creates tables like `auth_user` and `django_session`.
- Access the admin at `/admin/`; create a superuser to log in:
  - `python manage.py createsuperuser`

## Core Methods

```python
from django.contrib import auth

def login_view(request):
    """
    Authenticate and log in a user.

    Args:
        request (HttpRequest): POST username/password.

    Returns:
        HttpResponse: Redirect or error response.

    Purpose:
        Show usage of authenticate/login and request.user.
    """
    if request.method == 'POST':
        user_obj = auth.authenticate(request,
                                     username=request.POST.get('username'),
                                     password=request.POST.get('password'))
        if user_obj:
            auth.login(request, user_obj)
            return redirect('/home/')
    return render(request, 'login.html')

def logout_view(request):
    """
    Log out current user.

    Args:
        request (HttpRequest): Incoming request.

    Returns:
        HttpResponse: Redirect after logout.

    Purpose:
        Clear session-based login state.
    """
    auth.logout(request)
    return redirect('/login/')

def change_password(request):
    """
    Change the current user's password with verification.

    Args:
        request (HttpRequest): POST old/new/confirm.

    Returns:
        HttpResponse: Result page.

    Purpose:
        Demonstrate `check_password` and `set_password`.
    """
    if request.method == 'POST' and request.user.is_authenticated:
        old = request.POST.get('old')
        new = request.POST.get('new')
        confirm = request.POST.get('confirm')
        if new == confirm and request.user.check_password(old):
            request.user.set_password(new)
            request.user.save()
            return render(request, 'change_pwd.html', {'msg': 'Password updated'})
    return render(request, 'change_pwd.html')
```

### Auth Helpers

- `request.user`: Current user or `AnonymousUser`.
- `request.user.is_authenticated`: Boolean property (not callable in modern Django).
- Decorator: `@login_required(login_url='/login/')`; globally set `LOGIN_URL = '/login/'`.
- Creating users:
  - `User.objects.create_user(username=..., password=...)` (hashes password)
  - `User.objects.create_superuser(username=..., email=..., password=...)`

## Extending `auth_user` via `AbstractUser`

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class UserInfo(AbstractUser):
    """
    Custom user model extending Django’s AbstractUser.

    Fields:
        phone (BigIntegerField): Phone number.

    Purpose:
        Add project-specific fields while preserving auth functionality.
    """
    phone = models.BigIntegerField(null=True)

# In settings.py, set your custom user model
# AUTH_USER_MODEL = 'app01.UserInfo'  # 'app_label.ModelName'
```

Notes:
- Ensure you set `AUTH_USER_MODEL` before initial migrations in a new database.
- Do not override existing `AbstractUser` field names; add new fields only.
- All auth APIs (authenticate, login, etc.) continue to work with your model.