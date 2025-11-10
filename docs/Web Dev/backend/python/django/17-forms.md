# 17 Forms: HTML Form Basics and Ajax Submissions

This module summarizes HTML forms in Django templates, synchronous vs Ajax submissions, essential attributes, and safe client-side collection of data.

## Form Attributes

- `method`: `get` or `post`. Use `post` for data changes.
- `action`: Target URL to submit.
- `enctype`: 
  - `application/x-www-form-urlencoded` (default) for simple text fields
  - `multipart/form-data` for file uploads
  - `text/plain` (rarely used)
- `target`: Name of a browsing context/iframe (legacy; avoid unless needed).

## Problems with Synchronous Submit

- Full page reload, hard to show inline validation, harder UX.
- Use Ajax to submit and display results dynamically while preserving CSRF.

## Ajax Submit Pattern

```html
<form id="profile-form" method="post" action="/profile/update/" enctype="application/x-www-form-urlencoded">
  {% csrf_token %}
  <input type="text" name="nickname" />
  <button type="submit">Save</button>
  <div id="msg"></div>
  <script>
    const form = document.getElementById('profile-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // avoid full reload
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
        body: new URLSearchParams([...formData]) // send as urlencoded
      });
      const data = await res.json();
      document.getElementById('msg').textContent = data.message || 'Saved';
    });
  </script>
</form>
```

```python
from django.http import JsonResponse

def update_profile(request):
    """
    Update a user's profile via Ajax form submission.

    Args:
        request (HttpRequest): POST with urlencoded form data.

    Returns:
        JsonResponse: Operation status and message.

    Purpose:
        Show server-side handling for Ajax-submitted form data.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    nickname = request.POST.get('nickname', '').strip()
    if len(nickname) < 2:
        return JsonResponse({'error': 'Nickname too short'}, status=400)
    # Persist nickname on user here
    return JsonResponse({'ok': True, 'message': 'Profile updated'})
```

## Quick Collection Helpers

- jQuery `$('form').serialize()` returns urlencoded string of the form.
- `FormData(form)` produces key/value pairs (including files).
- Convert `FormData` to urlencoded: `new URLSearchParams([...formData])`.

## Notes

- Always include `{% csrf_token %}` in form templates.
- For uploads, set `enctype="multipart/form-data"` and use `FormData`.
- Validate on both client and server; server rules are authoritative.