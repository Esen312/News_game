from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User

class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class News(models.Model):
    title = models.CharField(verbose_name='Название темы', max_length=255)
    content = models.TextField(verbose_name='Контент')
    tags = models.ManyToManyField(Tag, verbose_name='Теги')
    photo = models.ImageField(upload_to='news_photos/', null=True, blank=True)
    author = models.CharField(verbose_name='Автор', max_length=255)
    pub_date = models.DateTimeField(verbose_name='Дата публикации', default=timezone.now)

    def __str__(self):
        return self.title


class ArticleTag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(verbose_name='Название статьи', max_length=255)
    content = models.TextField(verbose_name='Содержание статьи')
    tags = models.ManyToManyField(ArticleTag, verbose_name='Теги статьи')
    photo = models.ImageField(upload_to='article_photos/', null=True, blank=True)
    author = models.CharField(verbose_name='Автор статьи', max_length=255)
    pub_date = models.DateTimeField(verbose_name='Дата публикации статьи', default=timezone.now)

    def __str__(self):
        return self.title


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    content = models.TextField(verbose_name='Комментарий', default='No content provided')
    pub_date = models.DateTimeField(verbose_name='Дата комментария', default=timezone.now)
    # Добавление обобщённых связей
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True)
    object_id = models.PositiveIntegerField(null=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f'Comment by {self.user.username} on {self.pub_date}'


