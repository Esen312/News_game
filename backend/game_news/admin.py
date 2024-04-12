from django.contrib import admin

from game_news.models import News, Tag

admin.site.register(Tag)
admin.site.register(News)


