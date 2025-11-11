# 12 Django Version Differences

This section highlights key differences across Django 1.x, 2.x, and 3.x that impact routing and models.

## Routing APIs
- Django 1.x uses `url()`; Django 2.x/3.x introduce `path()` and `re_path()`.
- `url()` supports regex directly in the first argument.
- `path()` does not support regex; it matches literal segments.
- `re_path()` in Django 2.x/3.x is the modern equivalent of `url()` for regex.

```python
# Modern
from django.urls import path, re_path
urlpatterns = [
    path('index/', views.index),
    re_path(r'^login/$', views.login),
]

# Legacy (1.x)
from django.conf.urls import url
urlpatterns = [
    url(r'^index/$', views.index),
    url(r'^login/$', views.login),
]
```

## Path Converters (2.x+)
`path()` supports built-in converters to coerce segments into Python types:
- `str`: non-empty string without `/` (default)
- `int`: integers including 0
- `slug`: letters, numbers, hyphens, and underscores
- `uuid`: formatted UUID like `075194d3-...`
- `path`: matches any non-empty string including `/`

Example:
```python
from django.urls import path

urlpatterns = [
    path('index/<int:id>/', views.index),
]

def index(request, id):
    # id is already an int
    return HttpResponse(f'index: {id}')
```

## Custom Converters (advanced)
You can define and register custom converters:
```python
class MonthConverter:
    regex = '\\d{2}'  # required attribute name: regex

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return f'{value:02d}'

from django.urls import register_converter, path
register_converter(MonthConverter, 'mon')

urlpatterns = [
    path('articles/<int:year>/<mon:month>/<slug:other>/', views.article_detail, name='aaa'),
]
```

## Model `ForeignKey` `on_delete`
- Django 1.x often implied cascade behavior.
- Django 2.x/3.x require explicit `on_delete` argument:
```python
from django.db import models

class Book(models.Model):
    publish = models.ForeignKey('Publish', on_delete=models.CASCADE)
```