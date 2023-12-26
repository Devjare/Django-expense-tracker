from django.urls import path
from django.http import HttpResponse

from .views import BookListView, home

urlpatterns = [
    path("", home, name="home"),
    path("books/", BookListView.as_view(), name="book_list"),
]
