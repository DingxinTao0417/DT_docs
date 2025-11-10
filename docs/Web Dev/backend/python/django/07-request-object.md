# 7 Request Object Basics

Common ways to inspect the incoming request and read submitted data.

## Methods and Data
```python
request.method        # Uppercase string of the HTTP method, e.g., 'GET', 'POST'
request.POST          # Dict-like for POSTed form data (excluding files)
request.POST.get(...)     # Fetch the last value if multiple provided for a key
request.POST.getlist(...) # Fetch all values for a key as a list

request.GET           # Dict-like for query parameters
request.GET.get(...)
request.GET.getlist(...)

# Note: GET payload has practical size limits (~4KB range in many contexts),
# while POST is generally used for larger submissions.
```

## Example: Login View
```python
from django.http import HttpResponse
from django.shortcuts import render


def login(request):
    """
    Demonstrates different handling based on HTTP method.
    """
    if request.method == 'POST':
        return HttpResponse("Received your data.")
    return render(request, 'login.html')
```

[Back to Index](../README.md)