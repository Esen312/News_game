from rest_framework import serializers
from .models import News, Tag, Article, ArticleTag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')


class NewsSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=Tag.objects.all(), many=True)

    class Meta:
        model = News
        fields = ('id', 'title', 'content', 'tags', 'photo', 'author', 'pub_date')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context.get('retrieve', False):  # Проверяем, это запрос для получения деталей новости
            tags_data = TagSerializer(instance.tags.all(), many=True).data
            representation['tags'] = tags_data
        return representation


class ArticleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleTag
        fields = ('id', 'name')


class ArticleSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(queryset=ArticleTag.objects.all(), many=True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'tags', 'photo', 'author', 'pub_date')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if self.context.get('retrieve', False):
            tags_data = ArticleTagSerializer(instance.tags.all(), many=True).data
            representation['tags'] = tags_data
        return representation


from rest_framework import serializers
from .models import Comment
from django.contrib.contenttypes.models import ContentType

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'pub_date', 'user', 'content_type', 'object_id']

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['content_object'] = str(instance.content_object)  # Добавление строкового представления объекта
        return ret
