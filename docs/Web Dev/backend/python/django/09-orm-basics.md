# 9 Django ORM Basics

Django’s ORM (Object-Relational Mapping) lets you work with databases using Python classes and objects instead of writing raw SQL.

- Class → Table
- Object → Row/Record
- Attribute → Column/Field

## Models and Migrations
Create a model in `models.py`:
```python
from django.db import models

class User(models.Model):
    """
    Basic user model demonstrating common field types.
    """
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=32)
    password = models.IntegerField()
```

Django auto-creates an `id` primary key if you don’t declare one:
```python
class Author(models.Model):
    username = models.CharField(max_length=32)
    password = models.IntegerField()
```

Run migrations whenever you change models:
```bash
python manage.py makemigrations   # Record changes
python manage.py migrate          # Apply changes to DB
```

## 12.9.1 Field-level CRUD
- Add a field with `null=True` (allows empty values at the DB level):
  ```python
  info = models.CharField(max_length=32, verbose_name='Bio', null=True)
  ```
- Add a field with a default:
  ```python
  hobby = models.CharField(max_length=32, verbose_name='Hobby', default='study')
  ```
- Modify a field: edit the definition, then run migrations.
- Delete a field: remove/comment it and run migrations (use caution, this drops stored data).

Best practices:
- Double-check model changes before migrating.
- Avoid deleting fields unless necessary; prefer deprecating or hiding in the UI.

## 12.9.2 Data-level CRUD
### Read
```python
# Returns a QuerySet (list-like) of matching rows
res = User.objects.filter(username=username)

# First match or None (safe when 0/1 expected)
user_obj = User.objects.filter(username=username).first()

# Notes: QuerySets support slicing but avoid negative indices; prefer .first()/.last()
```

### Create
```python
# One-liner create
res = User.objects.create(username=username, password=password)
# Returns the created object

# Two-step create
user_obj = User(username=username, password=password)
user_obj.save()  # Persist
```

### Read all
```python
user_queryset = User.objects.all()  # or .filter() with no criteria
# Pass to template
return render(request, 'userlist.html', { 'user_queryset': user_queryset })
# Tip: `locals()` can also pass current scope variables
```

### Update
```python
# Bulk update specific fields on all matches
User.objects.filter(id=edit_id).update(username=username, password=password)

# Object-level update (updates all fields on save)
edit_obj = User.objects.filter(id=user_id).first()
edit_obj.username = username
edit_obj.password = password
edit_obj.save()
```
- Bulk `update(...)` touches only the specified fields and is efficient.
- Object-level `save()` rewrites all fields and may be slower when many columns exist.

### Delete
```python
User.objects.filter(id=delete_id).delete()  # Supports bulk deletion
```

## 12.9.6 Relationships Between Tables
Common relationships:
- One-to-Many / Many-to-One
- One-to-One
- Many-to-Many

Example:
```python
from django.db import models

class Publish(models.Model):
    name = models.CharField(max_length=64)

class Author(models.Model):
    username = models.CharField(max_length=32)

class Book(models.Model):
    title = models.CharField(max_length=32)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    # Book ↔ Publish is many-to-one; Book holds the foreign key
    publish = models.ForeignKey(
        to='Publish',
        on_delete=models.CASCADE  # required in modern Django
    )

    # Book ↔ Author is many-to-many; ORM creates the join table automatically
    authors = models.ManyToManyField('Author')
```

Design tips:
- Place foreign keys on the side you query most often.
- For many-to-many, use `ManyToManyField` and let Django manage the intermediate table.