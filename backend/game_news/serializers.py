from rest_framework import serializers
from .models import News, Tag


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



