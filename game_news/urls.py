from django.urls import path
from .views import NewsPage, NewsDetailPage


urlpatterns = [
    path('news/', NewsPage.as_view(), name='news_page'),
    path('news/<int:pk>/', NewsDetailPage.as_view(), name='news_detail_page'),
]

