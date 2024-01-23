from django.urls import path, include
from django.http import HttpResponse

from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'books', views.BooksViewSet, basename="book")
router.register(r'authors', views.AuthorsViewSet, basename="author")
router.register(r'publishers', views.PublishersViewSet, basename="publisher")
router.register(r'categories', views.CategoriesViewSet, basename="category")

urlpatterns = [
    path("", views.home, name="home"),
    path("batch-upload/", views.batch_upload_view, name="batch-upload"),
    path("reports/publishers/expenses/", views.get_publishers_expenses),
    path("reports/authors/expenses/", views.get_authors_expenses),
    path("reports/books/<int:qty>/", views.get_top_n_books_sold),
    path("reports/authors/<int:qty>/", views.get_top_n_books_by_author_sold),
    path("reports/publishers/<int:qty>/", views.get_top_n_books_by_publisher_sold),
    path("", include(router.urls))
    # path("reports/publisher/<int:publisher_id>/", include(router.urls))
    # path("books/", BookView.as_view({ 'get': 'list' }), name="book_list"),
    # path("books/<int:pk>", BookView.as_view({ 'get': 'retrieve' }), name="get_book"),
    # path("books/create", BookView.as_view({ 'post': 'create' }), name="create_book"),
    # path("category/", BookCategoryView.as_view({ 'get': 'list' }), name="category_list"),
    # path("category/<int:pk>", BookCategoryView.as_view({ 'get': 'retrieve' }), name="get_category"),
]
