from django.urls import path
from .views import NewsPage, NewsDetailPage, NewsCreate, NewsUpdate, NewsDelete, TagList, NewsByTag
from .views import ArticleList, ArticleDetail, ArticleCreate, ArticleUpdate, ArticleDelete, ArticleTagList, ArticlesByTag
from .views import CommentListCreateView

urlpatterns = [
    path('news/', NewsPage.as_view(), name='news_page'),
    path('news/<int:pk>/', NewsDetailPage.as_view(), name='news_detail_page'),
    path('news/create/', NewsCreate.as_view(), name='news_create'),
    path('news/<int:pk>/update/', NewsUpdate.as_view(), name='news_update'),
    path('news/<int:pk>/delete/', NewsDelete.as_view(), name='news_delete'),
    path('tags/', TagList.as_view(), name='tag-list'),
    path('tags/<int:pk>/', NewsByTag.as_view(), name='news-by-tag'),

    path('articles/', ArticleList.as_view(), name='article_list'),
    path('articles/<int:pk>/', ArticleDetail.as_view(), name='article_detail'),
    path('articles/create/', ArticleCreate.as_view(), name='article_create'),
    path('articles/<int:pk>/update/', ArticleUpdate.as_view(), name='article_update'),
    path('articles/<int:pk>/delete/', ArticleDelete.as_view(), name='article_delete'),
    path('article-tags/', ArticleTagList.as_view(), name='article_tag_list'),
    path('article-tags/<int:pk>/', ArticlesByTag.as_view(), name='articles_by_tag'),

    path('comments/<int:content_type_id>/<int:object_id>/', CommentListCreateView.as_view(), name='generic_comments'),
]
