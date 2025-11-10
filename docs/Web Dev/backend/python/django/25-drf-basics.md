# 25 Django REST Framework (DRF) Basics

This module introduces Django REST Framework (DRF): serializers, API views, viewsets, routers, authentication, permissions, and common settings for pagination and filtering. All functions include function-level comments describing purpose, parameters, and return values.

## 1) Install and Enable DRF

- Install: `pip install djangorestframework`
- Add to `INSTALLED_APPS`: `"rest_framework"`
- Optional for token auth: add `"rest_framework.authtoken"` and run migrations.

```python
# settings.py
INSTALLED_APPS = [
    # ...
    "rest_framework",
    # optional for TokenAuthentication
    # "rest_framework.authtoken",
]

# Common global DRF settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        # Session for browser clients; add Token for API clients
        "rest_framework.authentication.SessionAuthentication",
        # "rest_framework.authentication.TokenAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_FILTER_BACKENDS": [
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
}
```

## 2) Serializers

```python
from rest_framework import serializers
from blog.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    """
    Serialize and validate Article model instances for API I/O.

    Fields:
    - id: int
    - title: str
    - desc: str
    - content: str
    - author: Related user (may represent by username or id)

    Purpose:
    - Convert model instances to JSON-friendly dicts and validate input
      for create/update operations.
    """

    author = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Article
        fields = ("id", "title", "desc", "content", "author")
```

## 3) API Views (APIView)

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.http import HttpRequest
from blog.models import Article


class ArticleListCreateAPIView(APIView):
    """
    List articles (GET) and create new articles (POST).

    Permissions:
    - Read: allowed for all (by IsAuthenticatedOrReadOnly)
    - Write: requires authentication

    Methods:
    - get(request): Return paginated list of articles
    - post(request): Validate payload and create an article owned by current user
    """

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request: HttpRequest) -> Response:
        """
        Retrieve a list of articles.

        Parameters:
        - request: HttpRequest carrying user and query params

        Returns:
        - Response: Serialized list of articles
        """
        qs = Article.objects.all().order_by("-id")
        serializer = ArticleSerializer(qs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request: HttpRequest) -> Response:
        """
        Create a new article for the authenticated user.

        Parameters:
        - request: HttpRequest containing JSON payload in `request.data`

        Returns:
        - Response: Serialized article on success, or validation errors
        """
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            # Example: you might pass extra fields; adapt to your model
            article = Article.objects.create(
                title=serializer.validated_data.get("title"),
                desc=serializer.validated_data.get("desc", ""),
                content=serializer.validated_data.get("content", ""),
                author=request.user,
            )
            return Response(ArticleSerializer(article).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

## 4) ViewSets and Routers

```python
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated


class ArticleViewSet(ModelViewSet):
    """
    Full CRUD for Article via a ViewSet mapped by a router.

    Endpoints (typical):
    - /api/articles/ [GET, POST]
    - /api/articles/{id}/ [GET, PUT, PATCH, DELETE]

    Permissions:
    - Authenticated users can create/update/delete
    - All users can read (customize via permission_classes).
    """

    queryset = Article.objects.all().order_by("-id")
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer: ArticleSerializer) -> None:
        """
        Attach current user as author during creation.

        Parameters:
        - serializer: ArticleSerializer prepared with input data

        Returns:
        - None
        """
        serializer.save(author=self.request.user)
```

```python
# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, ArticleListCreateAPIView

router = DefaultRouter()
router.register(r"articles", ArticleViewSet, basename="article")

urlpatterns = [
    # ViewSet routes under /api/
    path("api/", include(router.urls)),
    # Alternatively keep custom APIView endpoints
    path("api/articles-basic/", ArticleListCreateAPIView.as_view()),
]
```

## 5) Permissions (Built-in and Custom)

```python
from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.http import HttpRequest


class IsOwnerOrReadOnly(BasePermission):
    """
    Allow read-only access for anyone; write access only for object owners.

    Methods:
    - has_object_permission(request, view, obj): return True if
      (safe method) or obj.author == request.user
    """

    def has_object_permission(self, request: HttpRequest, view, obj) -> bool:
        """
        Check object-level write permissions.

        Parameters:
        - request: HttpRequest, contains authenticated user
        - view: The view or viewset being accessed
        - obj: The Article (or similar) instance

        Returns:
        - bool: True if read-only or current user owns the object
        """
        if request.method in SAFE_METHODS:
            return True
        return getattr(obj, "author", None) == request.user
```

Usage with ViewSet:

```python
class ArticleViewSet(ModelViewSet):
    # ...
    permission_classes = [IsOwnerOrReadOnly]
```

## 6) Authentication Options

- SessionAuthentication: works with Django login sessions (browser forms/cookies).
- TokenAuthentication: issue tokens for API clients (mobile/spa).

```python
# Enable token auth (optional):
INSTALLED_APPS += ["rest_framework.authtoken"]

# After installing, create tokens for users (example mgmt command or admin UI)
# from rest_framework.authtoken.models import Token
# token = Token.objects.create(user=request.user)
# return Response({"token": token.key})
```

## 7) Pagination, Filtering, Ordering

- Global settings already include `PageNumberPagination`, `SearchFilter`, `OrderingFilter`.
- Per-view customization:

```python
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.viewsets import ModelViewSet


class SmallPagePagination(PageNumberPagination):
    """
    Small page size pagination for specific endpoints.

    Attributes:
    - page_size: Default items per page.
    """
    page_size = 5


class SearchableArticleViewSet(ModelViewSet):
    """
    ViewSet supporting search and ordering with custom pagination.

    Features:
    - search_fields: Partial matches across defined fields
    - ordering_fields: Columns allowed for ordering
    """

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pagination_class = SmallPagePagination
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["title", "desc", "author__username"]
    ordering_fields = ["id", "title", "author__username"]
```

## 8) Responses and Error Handling

```python
from rest_framework.exceptions import NotFound, ValidationError


def safe_get_article(article_id: int) -> Article:
    """
    Retrieve an Article or raise a NotFound error.

    Parameters:
    - article_id: int, the Article primary key

    Returns:
    - Article: The found instance
    """
    try:
        return Article.objects.get(pk=article_id)
    except Article.DoesNotExist:
        raise NotFound(detail="Article not found")


def validate_title_non_empty(title: str) -> None:
    """
    Validate that a title is not empty.

    Parameters:
    - title: str, proposed title content

    Returns:
    - None
    """
    if not title:
        raise ValidationError({"title": "Title cannot be empty"})
```

## 9) Quick Reference

- Add `rest_framework` to `INSTALLED_APPS` and configure `REST_FRAMEWORK`.
- Use `Serializer`/`ModelSerializer` for input/output validation.
- `APIView` for custom control; `ViewSet` + `DefaultRouter` for quick CRUD.
- Apply authentication and permissions globally and per-view.
- Use pagination, filtering, and ordering for scalable list endpoints.
- Prefer structured responses via `Response` and DRF exceptions.