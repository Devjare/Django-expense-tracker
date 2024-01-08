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

    def to_representation(self, instance):
        """
        Replace authors list, publisher and category from
        ids, to strings of the corresponding name.
        """
        book = super().to_representation(instance)
        if len(book['authors']) > 0:
            book['authors'] = [ Author.objects.get(id=author_id).name  for author_id in book['authors'] ]
        book['category'] = Category.objects.get(id=book['category']).name
        book['publisher'] = Publisher.objects.get(id=book['publisher']).name

        return book
        
