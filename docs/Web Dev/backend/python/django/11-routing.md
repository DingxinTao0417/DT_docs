# 11 Routing Layer

This section covers how Django matches URLs to views, grouping with regular expressions, reverse URL resolution, route dispatch via `include`, namespaces, and pseudo-static URLs.

## 11-1 URL Matching

### Modern API
```python
from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home),  # Home
    re_path(r'^test/$', views.test),
    re_path(r'^testadd/$', views.testadd),
]
```

- By default, Django normalizes trailing slashes when `APPEND_SLASH = True` in `settings.py`.
- Set `APPEND_SLASH = False` to disable automatic trailing slash redirects.

### Legacy API (for older projects)
```python
from django.conf.urls import url
urlpatterns = [
    url(r'^$', views.home),
    url(r'^test/$', views.test),
    url(r'^testadd/$', views.testadd),
]
```

## 11-2 Unnamed Groups
```python
from django.urls import re_path
from django.http import HttpResponse

# Matches digits and passes as positional argument
re_path(r'^test/(\\d+)/$', views.test)

def test(request, xx):
    """
    Handle URL with a positional parameter.
    :param request: Django HttpRequest
    :param xx: Matched number from the URL
    :return: HttpResponse with plain text
    """
    return HttpResponse('test')
```

## 11-3 Named Groups
```python
from django.urls import re_path

re_path(r'^testadd/(?P<year>\\d+)/$', views.testadd)

def testadd(request, year):
    """
    Handle URL with a named parameter.
    :param request: Django HttpRequest
    :param year: Year captured by the regex
    :return: HttpResponse with plain text
    """
    return HttpResponse('testadd')
```

## 11-4 Mixing Groups
- Do not mix unnamed and named groups in the same route.
- You can use multiple groups of the same type in one pattern.

```python
re_path(r'^index/(\\d+)/(\\d+)/(\\d+)/$', views.index)
re_path(r'^index/(?P<year>\\d+)/(?P<age>\\d+)/(?P<month>\\d+)/$', views.index)
```

## 11-5 Reverse Resolution

```python
from django.urls import reverse
from django.urls import path

urlpatterns = [
    path('index/', views.index, name='xxx'),
]

# Templates
# {% url 'xxx' %}

# Python
reverse('xxx')
```

- Ensure names are unique; avoid conflicts across apps.

## 11-6 Reverse with Unnamed Groups
```python
from django.urls import reverse, re_path

urlpatterns = [
    re_path(r'^index/(\\d+)/$', views.index, name='xxx'),
]

# Template usage
# {% url 'xxx' 123 %}

# Python usage
reverse('xxx', args=(1,))

# Common pattern: use the primary key for edit/delete routes
# re_path(r'^edit/(\\d+)/$', views.edit, name='edit')
# reverse('edit', args=(edit_id,))
```

## 11-7 Reverse with Named Groups
```python
from django.urls import reverse, re_path

urlpatterns = [
    re_path(r'^func/(?P<year>\\d+)/$', views.func, name='ooo')
]

# Template
# <a href="{% url 'ooo' year=123 %}">Named</a>
# <a href="{% url 'ooo' 123 %}">Positional</a>

# Python
reverse('ooo', kwargs={'year': 123})
# Or positional for convenience
reverse('ooo', args=(111,))
```

## 11-8 Route Dispatch (include)
```python
# Root urls.py
from django.urls import include, path

urlpatterns = [
    path('app01/', include('app01.urls')),
    path('app02/', include('app02.urls')),
]

# app01/urls.py
from django.urls import path
from . import views
urlpatterns = [
    path('reg/', views.reg),
]

# app02/urls.py
from django.urls import path
from . import views
urlpatterns = [
    path('reg/', views.reg),
]
```

- The root router delegates by prefix; avoid ending root patterns with `$`.

## 11-9 Namespaces

Modern approach (prefer defining `app_name` inside the app’s `urls.py`):
```python
# app01/urls.py
from django.urls import path
from . import views
app_name = 'app01'
urlpatterns = [
    path('reg/', views.reg, name='reg'),
]

# Root urls.py
from django.urls import include, path
urlpatterns = [
    path('app01/', include('app01.urls')),
]

# Reverse
# reverse('app01:reg')
# Template: {% url 'app01:reg' %}
```

Legacy style:
```python
# Root urls.py
path('app01/', include(('app01.urls', 'app01'), namespace='app01'))
```

## 11-10 Pseudo-static URLs
- “Static” pages have fixed content.
- “Pseudo-static” presents dynamic content with static-looking URLs (e.g., `/reg.html`).
- Often used for SEO; design URL patterns consistently and keep routes clean.

```python
from django.urls import path
urlpatterns = [
    path('reg.html', views.reg, name='app02_reg'),
]
```

[Back to Index](../README.md)