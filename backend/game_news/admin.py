from django.contrib import admin
from .models import News, Tag, Article, ArticleTag

admin.site.register(Tag)
admin.site.register(News)
admin.site.register(Article)
admin.site.register(ArticleTag)
