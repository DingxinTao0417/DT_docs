# 3 Apps: Concepts and Registration

Django organizes functionality into modular “apps.” Think of the Django project as a university, and each app as a specialized college (e.g., orders, users, complaints). Each app focuses on a single domain or feature set.

## Register Apps in `settings.py`
After creating an app, register it under `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Register your apps (either full path or short form)
    'app01.apps.App01Config',  # Full path
    'app01',                   # Short form
]
```

Note: Some IDEs like PyCharm can scaffold and auto-register an app for you. If you generate the app manually, ensure you add it yourself.

[Back to Index](../README.md)