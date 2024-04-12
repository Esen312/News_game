from rest_framework import generics
from .serializers import NewsSerializer, TagSerializer
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import News, Tag
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