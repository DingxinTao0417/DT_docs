# 14 Template Layer (Django Templates)

This module explains Django’s template system: passing data from views, built-in filters and tags, creating custom filters/tags/inclusion tags, and composing templates through inheritance and inclusion. Examples use modern Django conventions.

## Overview

- Templates render dynamic HTML by combining a context (Python data) with template syntax.
- Views typically pass a context to `render(request, template_name, context)`.
- Keep logic minimal in templates; perform business logic in views or template tags/filters.

## Passing Context to Templates

```python
from django.shortcuts import render

def dashboard(request):
    """
    Render a dashboard page with summary statistics.
    Args:
        request: Django HttpRequest.
    Returns:
        HttpResponse: Rendered HTML response.
    """
    context = {
        "user_name": request.user.get_username() if request.user.is_authenticated else "Guest",
        "stats": {"projects": 5, "tasks": 12, "completed": 8},
        "tags": ["django", "templates", "best-practices"],
    }
    return render(request, "dashboard.html", context)
```

In `dashboard.html`:

```html
<h1>Hello, {{ user_name }}</h1>
<p>Projects: {{ stats.projects }}, tasks: {{ stats.tasks }}, completed: {{ stats.completed }}</p>
<ul>
  {% for t in tags %}
    <li>{{ t }}</li>
  {% endfor %}
</ul>
```

## Built-in Filters

Filters transform values. Common filters:

- `|default:"N/A"` – fallback value when variable is missing/empty
- `|length` – size of list/string
- `|upper`, `|lower`, `|title` – string case transforms
- `|date:"Y-m-d H:i"` – format `datetime`
- `|safe` – mark string as safe HTML (use sparingly)

Example:

```html
<p>Total tags: {{ tags|length }}</p>
<p>When: {{ now|date:"Y-m-d H:i" }}</p>
<p>Bio: {{ user.bio|default:"No bio yet" }}</p>
```

## Built-in Tags

Tags provide control flow and utilities:

- `{% if %}…{% elif %}…{% else %}{% endif %}` – conditionals
- `{% for item in list %}…{% empty %}…{% endfor %}` – loops with empty branch
- `{% with var=expr %}…{% endwith %}` – temporary variables
- `{% url 'namespace:name' arg1 arg2 %}` – reverse URL
- `{% csrf_token %}` – CSRF protection token for forms
- `{% include 'path/to/partial.html' %}` – include another template

Example form:

```html
<form method="post">
  {% csrf_token %}
  <!-- fields here -->
  <button type="submit">Submit</button>
  {% if form.errors %}
    <div class="error">Please fix the errors.</div>
  {% endif %}
  {% include "partials/help_text.html" %}
</form>
```

## Custom Filters

Create a `templatetags` package in your app and register filters.

```
your_app/
  templatetags/
    __init__.py
    text_extras.py
```

`text_extras.py`:

```python
from django import template

register = template.Library()

@register.filter(name="truncate_words")
def truncate_words(value, num):
    """
    Truncate a string by word count.
    Args:
        value (str): Original text.
        num (int|str): Max words.
    Returns:
        str: Truncated text if over limit; otherwise original.
    """
    try:
        limit = int(num)
    except (TypeError, ValueError):
        return value
    words = (value or "").split()
    return " ".join(words[:limit]) + ("…" if len(words) > limit else "")
```

Usage:

```html
{% load text_extras %}
<p>{{ article.body|truncate_words:50 }}</p>
```

## Custom `simple_tag`

`simple_tag` is great for formatting values or combining arguments.

```python
from django import template
register = template.Library()

@register.simple_tag
def price_with_currency(amount, currency="USD"):
    """
    Format a price with a currency code.
    Args:
        amount (Decimal|float|int): Monetary value.
        currency (str): ISO currency.
    Returns:
        str: Formatted like "USD 12.99".
    """
    return f"{currency} {amount:.2f}"
```

Usage:

```html
{% load text_extras %}
<span>{% price_with_currency product.price "CNY" %}</span>
```

## Custom `inclusion_tag`

`inclusion_tag` renders a small template fragment with its own context.

```python
from django import template
register = template.Library()

@register.inclusion_tag("partials/tag_badges.html")
def tag_badges(tags):
    """
    Render a list of tags as badges.
    Args:
        tags (list[str]): Tag names.
    Returns:
        dict: Context for the partial template.
    """
    return {"tags": tags or []}
```

`partials/tag_badges.html`:

```html
<ul class="badges">
  {% for t in tags %}
    <li class="badge">{{ t|title }}</li>
  {% empty %}
    <li class="badge badge--empty">No tags</li>
  {% endfor %}
  </ul>
```

Usage:

```html
{% load text_extras %}
{% tag_badges article.tags %}
```

## Template Inheritance

Use `{% extends %}` and `{% block %}` to reuse layouts.

`base.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{% block title %}Site{% endblock %}</title>
  </head>
  <body>
    <header>{% include "partials/nav.html" %}</header>
    <main>
      {% block content %}{% endblock %}
    </main>
    <footer>{% block footer %}&copy; 2025{% endblock %}</footer>
  </body>
</html>
```

`dashboard.html`:

```html
{% extends "base.html" %}
{% block title %}Dashboard{% endblock %}
{% block content %}
  <h1>Hello, {{ user_name }}</h1>
  {% include "partials/stats.html" %}
{% endblock %}
```

## Including and Loading

- `{% include %}` brings partials into a page.
- `{% load %}` loads custom tags/filters modules.
- Prefer small, focused partial templates to keep pages maintainable.

## Tips and Best Practices

- Keep heavy logic out of templates; move to views or tags.
- Avoid overuse of `|safe`; sanitize user-generated content.
- Name blocks consistently (`title`, `content`, `footer`).
- Place custom tags in `your_app/templatetags/` and document usage.