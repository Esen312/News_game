from rest_framework import generics


from .models import News
from .serializers import NewsSerializer


class NewsPage(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class NewsDetailPage(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer



