# 22 BBS Project: Database Table Design

This module emphasizes that robust table design precedes smooth business logic. It outlines a classic blog/BBS schema with pragmatic optimizations.

## Overview and Principles

- Design relationships first: one-to-one, one-to-many, many-to-many.
- Avoid excessive cross-table computation for frequently displayed counters; denormalize selectively.
- Keep naming clear and consistent; index critical lookups.

## Tables and Relationships

1) UserInfo (extends `AbstractUser`)
- Fields: `phone`, `avatar`, `create_time`
- Relation: One-to-one with `Blog`

2) Blog
- Fields: `site_name`, `site_title`, `site_theme`
- Relation: One-to-many with `Category`, `Tag`, and `Article`

3) Category
- Fields: `name`
- Relation: Many categories per blog

4) Tag
- Fields: `name`
- Relation: Many tags per blog; `Article` M2M via through table

5) Article
- Fields: `title`, `desc`, `content`, `create_time`
- Denormalized counters: `up_num`, `down_num`, `comment_num`
- Relation: `blog` (FK), `category` (FK), `tags` (M2M via `Article2Tag`)

6) UpAndDown
- Tracks which user up/down-voted which article (`is_up` boolean)

7) Comment
- Fields: `content`, `comment_time`
- Relations: `user` (FK), `article` (FK), `parent` (self-FK for nested replies)

## Model Code Example

```python
from django.db import models
from django.contrib.auth.models import AbstractUser

class UserInfo(AbstractUser):
    phone = models.BigIntegerField(verbose_name='Phone', null=True)
    avatar = models.FileField(upload_to='avatar/', default='avatar/default.jpg', verbose_name='Avatar')
    create_time = models.DateField(auto_now_add=True)
    blog = models.OneToOneField(to='Blog', null=True, on_delete=models.SET_NULL)

class Blog(models.Model):
    site_name = models.CharField(max_length=32, verbose_name='Site Name')
    site_title = models.CharField(max_length=32, verbose_name='Site Title')
    site_theme = models.CharField(max_length=64, verbose_name='Site Theme')

class Category(models.Model):
    name = models.CharField(max_length=32, verbose_name='Category')
    blog = models.ForeignKey(to='Blog', null=True, on_delete=models.CASCADE)

class Tag(models.Model):
    name = models.CharField(max_length=32, verbose_name='Tag')
    blog = models.ForeignKey(to='Blog', null=True, on_delete=models.CASCADE)

class Article(models.Model):
    title = models.CharField(max_length=64, verbose_name='Title')
    desc = models.CharField(max_length=255, verbose_name='Description')
    content = models.TextField(verbose_name='Content')
    create_time = models.DateField(auto_now_add=True)

    up_num = models.BigIntegerField(default=0, verbose_name='Upvotes')
    down_num = models.BigIntegerField(default=0, verbose_name='Downvotes')
    comment_num = models.BigIntegerField(default=0, verbose_name='Comments')

    blog = models.ForeignKey(to='Blog', null=True, on_delete=models.SET_NULL)
    category = models.ForeignKey(to='Category', on_delete=models.SET_NULL, null=True)
    tags = models.ManyToManyField(to='Tag', through='Article2Tag', through_fields=('article', 'tag'))

class Article2Tag(models.Model):
    article = models.ForeignKey(to='Article', on_delete=models.CASCADE)
    tag = models.ForeignKey(to='Tag', on_delete=models.CASCADE)

class UpAndDown(models.Model):
    user = models.ForeignKey(to='UserInfo', on_delete=models.CASCADE)
    article = models.ForeignKey(to='Article', on_delete=models.CASCADE)
    is_up = models.BooleanField()

class Comment(models.Model):
    user = models.ForeignKey(to='UserInfo', on_delete=models.CASCADE)
    article = models.ForeignKey(to='Article', on_delete=models.CASCADE)
    content = models.CharField(max_length=255, verbose_name='Content')
    comment_time = models.DateTimeField(auto_now_add=True, verbose_name='Comment Time')
    parent = models.ForeignKey(to='self', null=True, blank=True, on_delete=models.SET_NULL)
```

## Design Notes

- Denormalized counters avoid costly cross-table aggregates on hot paths; keep them consistent via signals or transactional updates.
- Use `on_delete` appropriate to business rules (e.g., `CASCADE` for ownership, `SET_NULL` for optional associations).
- Self-referential comments enable hierarchical threads (root vs children).
- Add indexes on frequent filters: e.g., `Article.blog`, `Article.create_time`.