# 13 View Layer

This section introduces Django views, core response helpers, JSON responses, file uploads, request attributes, and FBV vs CBV (including a brief source walkthrough).

## 13-1 Core Helpers
- `HttpResponse`: return plain text or raw content.
- `render`: return an HTML template with context pre-rendered.
- `redirect`: return an HTTP redirect.

```python
from django.http import HttpResponse
from django.shortcuts import render, redirect

# render under the hood (simplified idea)
from django.template import Template, Context
res = Template('<h1>{{ user }}</h1>')
con = Context({'user': {'username': 'jason', 'password': 123}})
ret = res.render(con)
return HttpResponse(ret)
```

Note: A view must return an `HttpResponse` object. Returning `None` or other types will raise errors.

## 13-2 JSON Responses
- Web APIs often exchange data as JSON for cross-language compatibility.
- Front-end serialization: `JSON.stringify()` and `JSON.parse()`
- Python serialization: `json.dumps()` and `json.loads()`

```python
import json
from django.http import JsonResponse

def ab_json(request):
    """
    Example JSON responses with dict and list payloads.
    :param request: Django HttpRequest
    :return: JsonResponse
    """
    user_dict = {'username': 'Jason is awesome!', 'password': '123', 'hobby': 'music'}
    l = [111, 222, 333]

    # Basic: return a dict (default safe=True)
    return JsonResponse(user_dict, json_dumps_params={'ensure_ascii': False})

    # For non-dict payloads, set safe=False
    # return JsonResponse(l, safe=False)
```

## 13-3 File Upload via Form
Requirements:
- Use `method="post"` on the form.
- Set `enctype="multipart/form-data"` to support file uploads.

```python
def ab_file(request):
    """
    Handle file upload from a multipart/form-data form.
    :param request: Django HttpRequest
    :return: HttpResponse rendering the form page
    """
    if request.method == 'POST':
        # request.POST: text fields only
        # request.FILES: uploaded files
        file_obj = request.FILES.get('file')
        if file_obj:
            with open(file_obj.name, 'wb') as f:
                for chunk in file_obj.chunks():
                    f.write(chunk)
    return render(request, 'form.html')
```

## 13-4 Request Attributes
```python
request.method          # HTTP method as uppercase string
request.POST            # POSTed text fields
request.GET             # Query string parameters
request.FILES           # Uploaded files
request.body            # Raw request body (bytes)
request.path            # Path portion of the URL
request.path_info       # Similar to path, without script prefix
request.get_full_path() # Full path with query string
```

Example:
```python
print(request.path)           # /app01/ab_file/
print(request.path_info)      # /app01/ab_file/
print(request.get_full_path())# /app01/ab_file/?username=jason
```

## 13-5 FBV vs CBV
- FBV (Function-Based Views): simple functions receiving `request` and returning `HttpResponse`.
- CBV (Class-Based Views): classes that dispatch to methods based on the HTTP verb (`get`, `post`, etc.).

```python
# FBV
from django.http import HttpResponse

def index(request):
    """
    Simple function-based view.
    :param request: Django HttpRequest
    :return: HttpResponse with plain text
    """
    return HttpResponse('index')

# CBV
from django.urls import path
from django.views import View

class MyLogin(View):
    """
    Demonstrates GET and POST handlers in a class-based view.
    """
    def get(self, request):
        return render(request, 'form.html')

    def post(self, request):
        return HttpResponse('POST method')

urlpatterns = [
    path('login/', MyLogin.as_view()),
]
```

### 13-6 CBV Dispatch (Source Walkthrough)
Key idea: `as_view()` returns a callable that constructs your class and dispatches based on the request method.

Pseudo-outline:
```python
class MyView(View):
    @classonlymethod
    def as_view(cls, **initkwargs):
        def view(request, *args, **kwargs):
            self = cls(**initkwargs)
            return self.dispatch(request, *args, **kwargs)
        return view

    def dispatch(self, request, *args, **kwargs):
        if request.method.lower() in self.http_method_names:
            handler = getattr(self, request.method.lower(), self.http_method_not_allowed)
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)
```

[Back to Index](../README.md)