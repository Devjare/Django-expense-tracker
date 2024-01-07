from django.urls import path
from django.http import HttpResponse

from .views import BookListView, BookCategoryView, home, batch_upload_view

urlpatterns = [
    path("", home, name="home"),
    path("books/", BookListView.as_view({ 'get': 'list' }), name="book_list"),
    path("books/<int:pk>", BookListView.as_view({ 'get': 'retrieve' }), name="get_book"),
    path("books/create", BookListView.as_view({ 'post': 'create' }), name="create_book"),
    path("category/", BookCategoryView.as_view({ 'get': 'list' }), name="category_list"),
    path("category/<int:pk>", BookCategoryView.as_view({ 'get': 'retrieve' }), name="get_category"),
    path("batch-upload/", batch_upload_view, name="batch-upload"),
]
