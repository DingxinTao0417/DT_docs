# 18 Django Forms: Rendering, Validation, and Hooks

This module modernizes Django Forms usage: rendering HTML, validating inputs, showing errors, and customizing hooks. It emphasizes server-side validation while enabling clean templates.

## Core APIs

- Fields: `CharField`, `EmailField`, etc., with parameters like `label`, `required`, `min_length`, `max_length`, `initial`, `error_messages`, `widget`.
- Validation: `form.is_valid()`, `form.cleaned_data`, `form.errors`.
- Rendering: `form.as_p()`, `form.as_ul()`, `form.as_table()`, or manual iteration.

## Example Form and View

```python
from django import forms
from django.core.validators import RegexValidator
from django.http import HttpRequest, HttpResponse
from django.shortcuts import render

class RegisterForm(forms.Form):
    """
    Registration form with built-in and custom validations.

    Fields:
        username (CharField): User name with length and regex checks.
        email (EmailField): Valid email address.
        password (CharField): Password with min length.
        confirm_password (CharField): Confirmation password.

    Purpose:
        Demonstrate Django Forms setup and validation hooks.
    """
    username = forms.CharField(
        label='Username',
        min_length=2,
        max_length=20,
        validators=[RegexValidator(r'^[a-zA-Z0-9_]+$', 'Only letters, numbers, underscore')],
        error_messages={'required': 'Username is required'}
    )
    email = forms.EmailField(label='Email', error_messages={'invalid': 'Invalid email'})
    password = forms.CharField(label='Password', min_length=6, widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='Confirm', min_length=6, widget=forms.PasswordInput)

    def clean_username(self):
        """
        Local hook to validate username business rules.

        Returns:
            str: Sanitized username.

        Purpose:
            Enforce local constraints such as reserved names.
        """
        name = self.cleaned_data.get('username', '').strip()
        if name.lower() in {'admin', 'root'}:
            raise forms.ValidationError('Username not allowed')
        return name

    def clean(self):
        """
        Global hook coordinating inter-field validation.

        Returns:
            dict: Cleaned data after global checks.

        Purpose:
            Ensure password and confirm_password match.
        """
        cleaned = super().clean()
        pwd = cleaned.get('password')
        confirm = cleaned.get('confirm_password')
        if pwd and confirm and pwd != confirm:
            self.add_error('confirm_password', 'Passwords do not match')
        return cleaned

def register(request: HttpRequest) -> HttpResponse:
    """
    Render registration page and process submission via Forms.

    Args:
        request (HttpRequest): GET to render, POST to validate/process.

    Returns:
        HttpResponse: HTML page with form and errors or success message.

    Purpose:
        Show Forms usage in a typical registration scenario.
    """
    if request.method == 'GET':
        form = RegisterForm()
        return render(request, 'register.html', {'form': form})
    form = RegisterForm(request.POST)
    if form.is_valid():
        # Save user, send emails, etc.
        return render(request, 'register.html', {'form': RegisterForm(), 'msg': 'Registered'})
    return render(request, 'register.html', {'form': form})
```

```html
<!-- register.html: flexible manual rendering -->
<form method="post">
  {% csrf_token %}
  <p>
    {{ form.username.label_tag }}
    {{ form.username }}
    {% for e in form.username.errors %}<span class="error">{{ e }}</span>{% endfor %}
  </p>
  <p>{{ form.email.label_tag }} {{ form.email }}</p>
  <p>{{ form.password.label_tag }} {{ form.password }}</p>
  <p>{{ form.confirm_password.label_tag }} {{ form.confirm_password }}</p>
  <button type="submit">Register</button>
  {% if msg %}<div class="ok">{{ msg }}</div>{% endif %}
  {% if form.non_field_errors %}
    {% for e in form.non_field_errors %}<div class="error">{{ e }}</div>{% endfor %}
  {% endif %}
  <style>.error{color:#d32f2f}.ok{color:#2e7d32}</style>
  <script>document.querySelector('form').setAttribute('novalidate','');</script>
  <!-- Disable browser native validation to show backend messages consistently -->
</form>
```

## Widgets and Choices

- Use `widget=forms.RadioSelect`, `Select`, `SelectMultiple`, `CheckboxInput`, `CheckboxSelectMultiple` for various UI inputs.
- Provide `choices` at the field level or via `ModelChoiceField` for model-backed selections.

## Source Flow Insight

- `is_valid()` triggers `full_clean()` -> field cleaning -> local hooks -> global `clean()`.
- `errors` collects field-specific and non-field errors; access with `form.errors`.

## Notes

- Prefer server-side validation; client-side is a UX enhancement only.
- Customize `error_messages` for clarity and localization.
- Use `RegexValidator` for pattern checks where appropriate.