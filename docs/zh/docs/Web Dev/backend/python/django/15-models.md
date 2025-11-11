# 15 Models and ORM (Django ORM)

This module covers Django ORM essentials: single-table CRUD, relation management (OneToMany, ManyToMany), forward/reverse queries, cross-table lookups via double underscores, aggregations and grouping, F/Q expressions, transactions, common fields and options, and performance optimizations using `only/defer` and `select_related/prefetch_related`. Includes modern examples and notes.

## Setup and Example Models

```python
from django.db import models

class Publish(models.Model):
    name = models.CharField(max_length=32)
    addr = models.CharField(max_length=64)
    email = models.EmailField()

    def __str__(self):
        return self.name

class AuthorDetail(models.Model):
    phone = models.CharField(max_length=20, blank=True)

class Author(models.Model):
    name = models.CharField(max_length=32)
    author_detail = models.OneToOneField(AuthorDetail, on_delete=models.CASCADE, null=True, blank=True)

class Book(models.Model):
    title = models.CharField(max_length=64)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    publish_date = models.DateField(auto_now_add=True)
    # One-to-many
    publish = models.ForeignKey(Publish, on_delete=models.CASCADE)
    # Many-to-many
    authors = models.ManyToManyField(Author)

    # Optional fields for examples
    kucun = models.IntegerField(default=0)   # stock
    maichu = models.IntegerField(default=0)  # sold

    def __str__(self):
        return self.title
```

Notes:

- In modern Django (2.x+), `ForeignKey` and `OneToOneField` require `on_delete`.
- `__str__` aids admin and shell readability.

## Single Table CRUD

```python
from app01.models import Book

def create_book():
    """
    Create a book row.
    Returns:
        Book: Created model instance.
    """
    return Book.objects.create(title="Romance of the Three Kingdoms", price=199.00)

def read_books():
    """
    Read examples: all, filter, get.
    Returns:
        QuerySet: Books matching criteria.
    """
    all_books = Book.objects.all()
    cheap_books = Book.objects.filter(price__lt=100)
    one = Book.objects.get(pk=1)  # raises if not found or multiple
    return cheap_books

def update_books():
    """
    Update examples: bulk update and single instance.
    Returns:
        int: Number of updated rows.
    """
    return Book.objects.filter(title__icontains="论语").update(price=88)

def delete_books():
    """
    Delete by filter.
    Returns:
        tuple: (count, details) from delete()
    """
    return Book.objects.filter(price__gt=500).delete()
```

## Common QuerySet APIs (13 must-know)

- `all()` – all rows
- `filter(**lookups)` – WHERE with AND by default
- `exclude(**lookups)` – negated filter
- `get(**lookups)` – single row, raises on 0 or >1
- `order_by("field", "-field")` – sort
- `values("field1", "field2")` – dicts of selected fields
- `values_list("field", flat=True)` – list of a single field
- `distinct()` – remove duplicates
- `count()` – number of rows
- `first()` / `last()` – convenience shortcuts
- `exists()` – efficient existence check
- `aggregate()` – across all rows
- `annotate()` – per-row computed fields for grouping

## Viewing Internal SQL

```python
qs = Book.objects.filter(price__gt=100)
print(qs.query)      # Django compiles SQL; inspect for debugging
```

For executed SQL, use database instrumentation or `django-debug-toolbar` during development.

## Double-underscore Lookups and Cross-table Queries

```python
from app01.models import Author, AuthorDetail, Publish

# Field lookups
Book.objects.filter(title__icontains="爆款", price__gte=50)

# Cross-table forward (following FKs/M2M)
Book.objects.filter(publish__name="东方出版社")
Book.objects.filter(authors__name="jason")

# Reverse relations
pub = Publish.objects.get(name="东方出版社")
pub_books = pub.book_set.all()  # reverse FK: app_label.model_set

author = Author.objects.get(name="jason")
author_books = author.book_set.all()  # reverse M2M uses model_set

# One-to-one reverse
detail = AuthorDetail.objects.get(phone="110")
print(detail.author.name)

# Multi-hop lookups
Book.objects.filter(authors__author_detail__phone__startswith="1")

# Values across relations
Book.objects.filter(pk=1).values("title", "publish__name")
Publish.objects.filter(book__id=1).values("name", "book__title")
```

Guideline:

- Reverse FK/M2M that can return many rows use `.all()`; one-to-one returns a single object.

## Managing Relationships

```python
def attach_author(book: Book, author: Author):
    """
    Attach an author to a book M2M.
    Args:
        book (Book): Target book.
        author (Author): Author to attach.
    Returns:
        None
    """
    book.authors.add(author)     # add/remove/clear/set

def create_with_publish():
    """
    Create a book referencing a publisher via FK.
    Returns:
        Book: Created instance.
    """
    pub = Publish.objects.get(name="东方出版社")
    return Book.objects.create(title="新书", price=59, publish=pub)
```

## Aggregations

```python
from django.db.models import Max, Min, Sum, Count, Avg

Book.objects.aggregate(Avg("price"))
Book.objects.aggregate(Max("price"), Min("price"), Avg("price"), Sum("price"), Count("price"))
```

## Grouping with `annotate`

```python
# 1) Authors per book
Book.objects.annotate(author_num=Count("authors__id")).values("title", "author_num")

# 2) Cheapest book per publisher
Publish.objects.annotate(min_price=Min("book__price")).values("name", "min_price")

# 3) Books with >1 author
Book.objects.annotate(author_num=Count("authors__id")).filter(author_num__gt=1).values("title", "author_num")

# 4) Total price per author
Author.objects.annotate(sum_price=Sum("book__price")).values("name", "sum_price")

# Custom grouping key
Book.objects.values("price").annotate(cnt=Count("id"))
```

## F Expressions

```python
from django.db.models import F

# Sold > stock
Book.objects.filter(maichu__gt=F("kucun"))

# Increase all prices by 50
Book.objects.update(price=F("price") + 50)

# Append text to title (use functions for string ops)
from django.db.models.functions import Concat
from django.db.models import Value
Book.objects.update(title=Concat(F("title"), Value("——爆款")))
```

## Q Objects

```python
from django.db.models import Q

# OR conditions
Book.objects.filter(Q(maichu__gt=100) | Q(price__lt=600))

# NOT
Book.objects.filter(~Q(maichu__gt=100) | ~Q(price__lt=600))

# Programmatic Q
q = Q()
q.connector = "or"
q.children.append(("maichu__gt", 100))
q.children.append(("price__lt", 600))
Book.objects.filter(q)
```

## Transactions

```python
from django.db import transaction

def do_atomic():
    """
    Run multiple ORM operations in one transaction.
    Returns:
        None
    """
    try:
        with transaction.atomic():
            # op1
            # op2
            pass
    except Exception as exc:
        print(exc)
```

## Common Fields and Options

- `AutoField(primary_key=True)` – auto-increment PK
- `CharField(max_length=N, verbose_name=...)` – string
- `IntegerField`, `BigIntegerField` – integers
- `DecimalField(max_digits=8, decimal_places=2)` – fixed-point
- `EmailField` – validated string
- `DateField`, `DateTimeField` – `auto_now`, `auto_now_add`
- `BooleanField` – boolean
- `TextField` – large text
- `FileField(upload_to="/data")` – file uploads; saves path

Custom field example:

```python
class MyCharField(models.Field):
    def __init__(self, max_length, *args, **kwargs):
        self.max_length = max_length
        super().__init__(*args, **kwargs)

    def db_type(self, connection):
        return f"char({self.max_length})"
```

ForeignKey options:

- `unique=True` – behaves similar to `OneToOneField()`; prefer the latter
- `db_index=True` – add index
- `to_field` – link to non-PK field
- `on_delete` – required (e.g., `models.CASCADE`, `SET_NULL`, etc.)

## Query Optimization

```python
# only/defer: control selected columns
qs = Book.objects.only("title")  # non-title fields hit DB lazily
qs = Book.objects.defer("title")  # title excluded until accessed

# select_related: JOINs for FK/OneToOne
books = Book.objects.select_related("publish")
for b in books:
    print(b.publish.name)  # no extra queries

# prefetch_related: secondary query for M2M/Reverse FK
books = Book.objects.prefetch_related("authors")
for b in books:
    print([a.name for a in b.authors.all()])
```

## Library CRUD Mini-case

```python
def library_flow():
    """
    Demonstrate creating publisher, authors, and a book with relations.
    Returns:
        dict: Created objects.
    """
    pub = Publish.objects.create(name="东方出版社", addr="Beijing", email="press@example.com")
    a1 = Author.objects.create(name="jason")
    a2 = Author.objects.create(name="lucy")
    b = Book.objects.create(title="聊斋", price=59, publish=pub)
    b.authors.add(a1, a2)
    return {"publish": pub, "authors": [a1, a2], "book": b}
```

## Reference and Notes

- Use Django’s official docs for detailed API coverage: https://docs.djangoproject.com/
- Always specify `on_delete` for `ForeignKey`/`OneToOneField` in Django 2.x+.
- Prefer `select_related` for FK/OneToOne and `prefetch_related` for M2M/Reverse relations.