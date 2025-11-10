# 6 Static Files

This section explains what static files are, how to configure them, and related topics including forms and CSRF.

## 12.6.1 What Are Static Files?
- Front-end assets that don’t change on the server: JavaScript, CSS, images, third-party plugins, etc.
- You typically create a `static/` directory to store these assets during development.

## 12.6.2 Static Files Configuration
```python
# Acts as the public URL prefix for static assets
STATIC_URL = '/static/'

# Multiple static directories (development-time)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'static1'),
    os.path.join(BASE_DIR, 'static2'),
]
```

## 12.6.3 Dynamic Resolution in Templates
```html
{% load static %}
<link rel="stylesheet" href="{% static 'bootstrap-3.3.7-dist/css/bootstrap.min.css' %}">
<script src="{% static 'bootstrap-3.3.7-dist/js/bootstrap.min.js' %}"></script>
```

## 12.6.4 Form Submission and `action`
- By default, an HTML `<form>` submits using `GET`.
- `action` attribute options:
  - Omit `action`: submit to the current page URL.
  - Full path: submit to a specific URL.
  - Relative path: e.g., `/login/`.

Example GET submission:
```
http://127.0.0.1:8000/login/?username=jason&password=123
```

## 12.6.5 CSRF Middleware (Early Development)
During early prototyping, you might temporarily disable CSRF to simplify POST submissions. In `settings.py`:
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # 'django.middleware.csrf.CsrfViewMiddleware',  # Disabled for early prototypes only
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

Caution: Re-enable CSRF protection for any real application. It’s essential for security.

[Back to Index](../README.md)