# 2 Project Files Overview

A typical Django project created by the official tools contains the following files and directories:

```text
mysite/                 # Project root folder
├─ manage.py            # Django entry point and admin utility
├─ db.sqlite3           # Default SQLite database (for small projects)
├─ app01/               # Example app folder
│  ├─ admin.py          # Django admin configuration
│  ├─ apps.py           # App configuration/registration
│  ├─ migrations/       # Database migration history
│  ├─ models.py         # ORM models
│  ├─ tests.py          # Tests for this app
│  └─ views.py          # View functions/classes (presentation layer)
└─ mysite/              # Project settings package
   ├─ settings.py       # Main settings/configuration
   ├─ urls.py           # URL routes linked to views
   └─ wsgi.py           # WSGI entry point
```

[Back to Index](../README.md)