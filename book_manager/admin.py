from django.contrib import admin

from .models import Book, Author, Category, Publisher

admin.site.register(Book)
admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Publisher)
