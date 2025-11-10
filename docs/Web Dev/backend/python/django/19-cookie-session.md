# 19 Cookies and Sessions: State, Storage, and Auth Patterns

This module clarifies the evolution from cookies to sessions, Django operations for each, and supporting patterns such as login decorators and CBV integration. It also notes token/JWT approaches.

## Cookies in Django

```python
from django.http import HttpResponse

def set_simple_cookie(request):
    """
    Set a cookie and control its expiry.

    Args:
        request (HttpRequest): Incoming request.

    Returns:
        HttpResponse: Response with cookie set.

    Purpose:
        Demonstrate cookie writing with max_age/expires options.
    """
    resp = HttpResponse('cookie set')
    resp.set_cookie('theme', 'dark', max_age=3600)  # or expires=datetime
    return resp

def read_cookie(request):
    """
    Read cookie safely.

    Args:
        request (HttpRequest): Incoming request.

    Returns:
        HttpResponse: Cookie value displayed.

    Purpose:
        Show cookie retrieval via request.COOKIES.
    """
    theme = request.COOKIES.get('theme', 'light')
    return HttpResponse(f'theme={theme}')
```

## Sessions in Django

- Session stores data server-side; client holds a session key.
- Backends: DB (default `django_session`), cache, cached DB, file, or custom.
- Configure expiry per session: `request.session.set_expiry(seconds)`.
- Clear: `request.session.clear()` or `flush()` to remove session key.

```python
def login_view(request):
    """
    Minimal login setting session state.

    Args:
        request (HttpRequest): POST username/password.

    Returns:
        HttpResponse: Redirect on success or error response.

    Purpose:
        Show session usage for storing user state.
    """
    if request.method == 'POST':
        user = auth.authenticate(request, username=request.POST.get('u'), password=request.POST.get('p'))
        if user:
            auth.login(request, user)  # stores ID in session
            request.session.set_expiry(24 * 3600)
            return redirect('/home/')
    return render(request, 'login.html')
```

## Login Required Decorators

```python
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect

@login_required(login_url='/login/')
def home(request):
    """
    Protected view requiring authentication.

    Args:
        request (HttpRequest): Request with potential user session.

    Returns:
        HttpResponse: Home page if logged in; redirect otherwise.

    Purpose:
        Enforce auth for function-based views.
    """
    return render(request, 'home.html')
```

### CBV Decorators

```python
from django.utils.decorators import method_decorator
from django.views import View

@method_decorator(login_required(login_url='/login/'), name='dispatch')
class Dashboard(View):
    """
    Class-based view protected by login.

    Methods:
        get: Render dashboard.

    Purpose:
        Apply `login_required` to CBV via `dispatch`.
    """
    def get(self, request):
        return render(request, 'dashboard.html')
```

## Token/JWT Notes

- For APIs, prefer stateless tokens (e.g., JWT) managed via headers.
- Use DRF + `SimpleJWT` or `djangorestframework-jwt` for production-ready support.

## Session Backend Internals (Overview)

- On login, Django stores the user’s ID in session and sets a cookie with session key.
- Periodic cleanup removes expired sessions from storage.

## Notes

- Cookies are client-side; sessions are server-side.
- Avoid storing sensitive data in cookies; use sessions or tokens.
- Decorators can be applied globally (`LOGIN_URL`) or per-view.