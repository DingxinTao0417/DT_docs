# 8 Connecting to MySQL

This section explains how to switch the default SQLite database to MySQL in a Django project, along with driver options and recommended settings.

## Default: SQLite
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

## Use MySQL
Update `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'day60',
        'USER': 'root',
        'PASSWORD': 'admin123',
        'HOST': '127.0.0.1',
        'PORT': 3306,
        # Recommended charset for modern MySQL
        'OPTIONS': {
            'charset': 'utf8mb4'
        }
    }
}
```

## Choose a Driver
- Preferred: install `mysqlclient` (C-based, generally faster)
  ```bash
  pip install mysqlclient
  ```
- Alternative: use `PyMySQL` and make it behave like `MySQLdb`
  ```bash
  pip install PyMySQL
  ```
  In `project/__init__.py` or any app’s `__init__.py`:
  ```python
  import pymysql
  pymysql.install_as_MySQLdb()
  ```

## Verify the Setup
- Run migrations to ensure the connection works:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```
- If you hit connection or SSL errors, confirm your MySQL server is running, credentials are correct, and client libraries are properly installed.

[Back to Index](../README.md)