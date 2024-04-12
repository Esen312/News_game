from django.urls import path
from .views import NewsPage, NewsDetailPage, NewsCreate, NewsUpdate, NewsDelete, TagList, NewsByTag

urlpatterns = [
    path('news/', NewsPage.as_view(), name='news_page'),
    path('news/<int:pk>/', NewsDetailPage.as_view(), name='news_detail_page'),
    path('news/create/', NewsCreate.as_view(), name='news_create'),
    path('news/<int:pk>/update/', NewsUpdate.as_view(), name='news_update'),
    path('news/<int:pk>/delete/', NewsDelete.as_view(), name='news_delete'),
    path('tags/', TagList.as_view(), name='tag-list'),
    path('tags/<int:pk>/', NewsByTag.as_view(), name='news-by-tag'),
]
