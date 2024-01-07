from rest_framework import serializers

from .models import Category, Author, Publisher, Book

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
