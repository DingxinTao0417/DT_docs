# 5 Core Response Helpers

Django provides a few essential helpers for returning responses from views.

## `HttpResponse`
- Returns plain text or raw content.

## `render`
- Renders and returns an HTML template with optional context.

## `redirect`
- Returns an HTTP redirect to another URL (internal or external).

### Examples
```python
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Plain text response
HttpResponse("Hello, world!")

# Render a template
def home(request):
    return render(request, 'home.html', {"title": "Home"})

# Redirects
def go_out(request):
    return redirect('https://www.example.com/')

def go_home(request):
    return redirect('/home/')
```