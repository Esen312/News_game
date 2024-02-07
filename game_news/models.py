from django.db import models
from django.utils import timezone


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


