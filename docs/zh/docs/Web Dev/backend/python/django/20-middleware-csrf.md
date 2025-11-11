# 20 Middleware and CSRF: Lifecycle and Protection Patterns

This module explains Django middleware lifecycle methods and CSRF protection mechanics, including decorators for FBV/CBV and practical client-side patterns. It also includes a dynamic import pattern for pluggable strategies.

## Middleware Lifecycle Overview

- `process_request(request)`: Before URL resolution and view; may short-circuit by returning `HttpResponse`.
- `process_view(request, view_func, view_args, view_kwargs)`: After URL match, before calling the view.
- `process_template_response(request, response)`: Called if response has `render()` method.
- `process_exception(request, exception)`: When the view raises an exception.
- `process_response(request, response)`: Always called on the way out; must return `HttpResponse`.

Order:
- Entry: Top-to-bottom for `process_request` and `process_view`.
- Exit: Bottom-to-top for `process_response` and `process_template_response`.
- Exceptions: Bottom-to-top for `process_exception`.

Note:
- If a middleware returns an `HttpResponse` in `process_request`, Django short-circuits view execution and returns via the corresponding `process_response` chain.

## CSRF Protection

- Enable `django.middleware.csrf.CsrfViewMiddleware`.
- Forms: include `{% csrf_token %}`.
- Ajax: send token via `X-CSRFToken` header.

### Decorators (FBV/CBV)

```python
from django.views.decorators.csrf import csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.http import HttpResponse

@csrf_protect
def safe_view(request):
    """
    View requiring CSRF protection.

    Args:
        request (HttpRequest): Incoming request.

    Returns:
        HttpResponse: Basic response.

    Purpose:
        Demonstrate applying csrf_protect to FBV.
    """
    return HttpResponse('protected')

@csrf_exempt
def webhook(request):
    """
    Exempt CSRF for external webhook endpoints.

    Args:
        request (HttpRequest): Incoming POST from third parties.

    Returns:
        HttpResponse: Result of processing.

    Purpose:
        Allow non-CSRF clients while minimizing scope.
    """
    return HttpResponse('ok')

@method_decorator(csrf_exempt, name='dispatch')
class MyCsrfCBV(View):
    """
    Exempt CSRF at the CBV level via dispatch.

    Methods:
        get: Return basic content.
        post: Return basic content.

    Purpose:
        Show correct placement of csrf_exempt for CBV.
    """
    def get(self, request):
        return HttpResponse('get')
    def post(self, request):
        return HttpResponse('post')
```

Notes:
- When middleware is globally enabled, apply `@csrf_exempt` for endpoints that must bypass.
- If middleware is disabled, apply `@csrf_protect` to specific views that require protection.

## Importlib and Dynamic Strategy Pattern

```python
import importlib
from typing import Iterable

def send_all(content: str, notify_list: Iterable[str]) -> None:
    """
    Dynamically load classes and call a common interface.

    Args:
        content (str): Message content to send.
        notify_list (Iterable[str]): Dotted paths like 'notify.email.Email'.

    Returns:
        None

    Purpose:
        Demonstrate pluggable strategies via importlib and duck typing.
    """
    for path_str in notify_list:
        module_path, class_name = path_str.rsplit('.', maxsplit=1)
        module = importlib.import_module(module_path)
        cls = getattr(module, class_name)
        obj = cls()
        obj.send(content)
```

## Notes

- Keep CSRF exemption surface minimal; document why it’s needed.
- Favor duck typing for extensibility where interfaces are consistent.