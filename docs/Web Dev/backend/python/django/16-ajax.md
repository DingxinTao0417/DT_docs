# 16 Ajax: Modern Data Exchange in Django

This module localizes and modernizes the original Ajax notes, focusing on safe data exchange formats, CSRF handling, file uploads, progress display, pagination, and serialization. Examples use jQuery and native `fetch/XHR`, with brief mentions of Axios and DRF for practical upgrades.

## Concepts and Data Formats

- URL-encoded: `application/x-www-form-urlencoded` (simple key-value pairs)
- Multipart FormData: `multipart/form-data` (files + fields)
- JSON: `application/json` (structured data)
- Choose the format based on payload type and server expectations.

## CSRF Essentials for POST

- Django enforces CSRF by `CsrfViewMiddleware`. For HTML forms, include `{% csrf_token %}` in the template.
- For Ajax, attach the token via header `X-CSRFToken`.

```html
<!-- Template form example (safe POST) -->
<form action="" method="post">
  {% csrf_token %}
  <input type="text" name="username" />
  <input type="submit" />
  <!-- Attach CSRF for Ajax via cookie or template tag as needed -->
</form>
```

```js
// Get CSRF token from cookie and set for non-GET Ajax
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
  return (/^(GET|HEAD|OPTIONS|TRACE)$/).test(method);
}

// jQuery global setup
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }
  }
});
```

## Send JSON via Ajax

```js
// Native fetch JSON POST
async function postJson(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

postJson('/api/user', { username: 'jason' })
  .then(console.log)
  .catch(console.error);
```

```python
from django.http import JsonResponse
import json

def parse_json_body(request):
    """
    Parse JSON body from a Django request.

    Args:
        request (HttpRequest): Incoming Django request.

    Returns:
        dict: Parsed JSON dict if present; otherwise empty dict.

    Purpose:
        Safely parse JSON payloads for Ajax endpoints.
    """
    try:
        return json.loads(request.body.decode('utf-8'))
    except Exception:
        return {}

def create_user_api(request):
    """
    Create a user via JSON Ajax request.

    Args:
        request (HttpRequest): POST request containing JSON with 'username'.

    Returns:
        JsonResponse: Status and data payload.

    Purpose:
        Demonstrate receiving JSON, validating, and responding.
    """
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    data = parse_json_body(request)
    username = data.get('username', '').strip()
    if not username:
        return JsonResponse({'error': 'username required'}, status=400)
    # Persist user or perform business logic here
    return JsonResponse({'ok': True, 'username': username})
```

## File Upload via Ajax (FormData)

```js
// jQuery example
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('note', 'avatar upload');

$.ajax({
  url: '/upload/avatar/',
  method: 'POST',
  data: formData,
  processData: false, // required for FormData
  contentType: false, // browser sets multipart boundary
  headers: { 'X-CSRFToken': csrftoken },
  success: console.log,
  error: console.error
});
```

```js
// Native XHR with progress
const xhr = new XMLHttpRequest();
xhr.open('POST', '/upload/avatar/');
xhr.setRequestHeader('X-CSRFToken', csrftoken);
xhr.upload.onprogress = (e) => {
  if (e.lengthComputable) {
    const pct = Math.round((e.loaded / e.total) * 100);
    console.log('Upload', pct + '%');
  }
};
xhr.onload = () => console.log('Done', xhr.status);
const fd = new FormData();
fd.append('file', fileInput.files[0]);
xhr.send(fd);
```

## SweetAlert Confirm, Bulk Insert, and Pagination

- Confirm deletion with SweetAlert before sending Ajax delete; ensure CSRF and method override if needed.
- Bulk insert with `bulk_create` for performance-sensitive batch writes.
- Pagination: slice the queryset and render HTML page links.

```python
from django.core.paginator import Paginator
from django.shortcuts import render

def list_articles(request):
    """
    List articles with server-side pagination.

    Args:
        request (HttpRequest): Incoming request with page query param.

    Returns:
        HttpResponse: Rendered HTML with page data.

    Purpose:
        Demonstrate safe pagination using Django's Paginator.
    """
    qs = Article.objects.order_by('-create_time')
    paginator = Paginator(qs, 10)
    page_number = request.GET.get('page', 1)
    page_obj = paginator.get_page(page_number)
    return render(request, 'article_list.html', {'page_obj': page_obj})
```

## Serialization (Built-in vs DRF)

- Django built-in serializers can produce JSON but are limited.
- Prefer Django REST Framework (DRF) for robust serialization, validation, and viewsets.

## Axios Quick Reference

```js
// axios get/post (ensure CSRF header for unsafe methods)
axios.get('/api/items').then(console.log);
axios.post('/api/items', { name: 'demo' }, {
  headers: { 'X-CSRFToken': csrftoken }
}).then(console.log);
```

## Notes

- Always consider CSRF for unsafe methods.
- Choose JSON for structured data; use FormData for uploads.
- For performance, batch writes via `bulk_create` and measure.
- Prefer server-side pagination to control memory and query costs.