# 1 Command Line Basics

This section covers the essential command-line operations for creating and running a Django project and apps.

## Create a Django Project
```bash
# Create a new Django project
django-admin startproject django-project
```

## Start the Development Server
```bash
# From the project root (where manage.py lives)
python manage.py runserver
```

## Create an App
```bash
# Create a new app inside your project
python manage.py startapp app01
```

### Naming Apps
- Prefer meaningful names that reflect functionality: `users`, `orders`, `web`, etc.
- For teaching/demo purposes, names like `app01`, `app02` are acceptable.

## Using PyCharm (optional)
- New Project: choose the Django project template.
- Run Server: either via terminal or the green run arrow (edit run configurations as needed).
- Create App: use the integrated terminal with the full command, or Tools → Run manage.py Task (recommended later; for beginners, prefer typing full commands).