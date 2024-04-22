from django.contrib.contenttypes.models import ContentType
from rest_framework import generics
from .serializers import NewsSerializer, TagSerializer, ArticleSerializer, ArticleTagSerializer
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import News, Tag, ArticleTag, Article
from django.shortcuts import get_object_or_404


class NewsPage(generics.ListAPIView):
    queryset = News.objects.all().order_by('-pub_date')
    serializer_class = NewsSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['tags__name']
    search_fields = ['title', 'tags__name']


class NewsDetailPage(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['retrieve'] = True  # Помечаем, что это запрос для получения деталей новости
        return context


class NewsCreate(generics.CreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['tags'] = TagSerializer(Tag.objects.all(), many=True).data  # Передаем сериализованные данные по тегам в контекст
        return context


class NewsUpdate(generics.RetrieveUpdateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_url_kwarg = 'pk'


class NewsDelete(generics.DestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer


class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class NewsByTag(generics.ListAPIView):
    serializer_class = NewsSerializer

    def get_queryset(self):
        tag_id = self.kwargs.get('pk')
        tag = get_object_or_404(Tag, pk=tag_id)
        return News.objects.filter(tags=tag)



class ArticleList(generics.ListAPIView):
    queryset = Article.objects.all().order_by('-pub_date')
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['tags__name']
    search_fields = ['title', 'tags__name']

    def get_queryset(self):
        """
        Optionally restricts the returned articles to a given tag,
        by filtering against a `tags__name` query parameter in the URL.
        """
        queryset = Article.objects.all().order_by('-pub_date')
        tag_name = self.request.query_params.get('article_tags__name', None)
        if tag_name is not None:
            queryset = queryset.filter(tags__name=tag_name)
        return queryset



class ArticleDetail(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['retrieve'] = True
        return context


class ArticleCreate(generics.CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['tags'] = ArticleTagSerializer(ArticleTag.objects.all(), many=True).data
        return context


class ArticleUpdate(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    lookup_url_kwarg = 'pk'


class ArticleDelete(generics.DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleTagList(generics.ListAPIView):
    queryset = ArticleTag.objects.all()
    serializer_class = ArticleTagSerializer


class ArticlesByTag(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        tag_id = self.kwargs.get('pk')
        tag = get_object_or_404(ArticleTag, pk=tag_id)
        return Article.objects.filter(tags=tag)


from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Comment
from .serializers import CommentSerializer

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        content_type = ContentType.objects.get_for_id(self.kwargs['content_type_id'])
        serializer.save(user=self.request.user, content_type=content_type, object_id=self.kwargs['object_id'])
