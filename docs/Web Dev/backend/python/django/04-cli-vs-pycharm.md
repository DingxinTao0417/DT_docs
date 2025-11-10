# 4 CLI vs PyCharm Setup

When creating a Django project, behavior differs slightly between the command-line tools and PyCharm templates.

## Templates Directory
- PyCharm often creates a `templates/` folder and configures it automatically in `settings.py`.
- CLI-created projects typically leave the `DIRS` list empty, so you must create the folder and configure the path.

### PyCharm-created project
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        # ...
    }
]
```

### CLI-created project
```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Remember to add your templates directory
        # ...
    }
]
```

[Back to Index](../README.md)