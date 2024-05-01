from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
    
from django.db.models import Sum

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Book, Category, Author, Publisher
from .serializers import BookSerializer, CategorySerializer, AuthorSerializer, PublisherSerializer

from .forms import CSVFileForm
from .util import create_from_csv

import csv

def home(request):
    return HttpResponse("<h5>Homepage!</h5>")

class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PublishersViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

class AuthorsViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BooksViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by('-id')
    serializer_class = BookSerializer


def get_top_n_books_sold(request, qty):
    # Return the top n, books sold
    
    # -distribution_expense is desc order, while distribution_expense without the '-' is asc order.
    queryset = Book.objects.all().order_by("-distribution_expense")[:qty]
    top_n_books_sold = { 
        book.id: { 
            "title": book.title, 
            "de": book.distribution_expense  
        } for book in queryset }

    return JsonResponse(top_n_books_sold)

def get_top_n_books_by_author_sold(request, qty):
    """
    Get the top `qty` authors given the *amount* of books sold.
    """
    
    queryset = Author.objects.annotate(de=Sum('book__distribution_expense')).order_by('-de')[:qty]

    top_qty_authors = {}
    for author in queryset:
        top_qty_authors[author.id] = {
            'name': author.name,
            'de': author.de
        }

    return JsonResponse(top_qty_authors)

def get_top_n_books_by_publisher_sold(request, qty):
    """
    Get the top `qty` authors given the *amount* of books sold.
    """
    
    queryset = Publisher.objects.annotate(de=Sum('book__distribution_expense')).order_by('-de')[:qty]

    top_qty_publishers = {}
    for publisher in queryset:
        top_qty_publishers[publisher.id] = {
            'name': publisher.name,
            'de': publisher.de
        }

    return JsonResponse(top_qty_publishers)

def get_authors_expenses(request):
    # Aggregate distribution expenses per book and group by author and category
    author_expenses = (
        Book.objects
        .values('authors__name', 'category__name')
        .annotate(total_expense=Sum('distribution_expense'))
    )
    
    # Now, aggregate the total distribution expense per author_name
    result = {}
    for expense in author_expenses:
        author_name = expense['authors__name']
        category_name = expense['category__name']
        total_expense = expense['total_expense']
    
        if author_name not in result:
            result[author_name] = {'total_expense': 0, 'categories': {}}
    
        result[author_name]['total_expense'] += total_expense
        result[author_name]['categories'][category_name] = total_expense
    
    # This will give you a dictionary with author_name names, total expense, and expenses per category
    return JsonResponse(result)

def get_publishers_expenses(request):
    # Aggregate distribution expenses per book and group by publisher and category
    publisher_expenses = (
        Book.objects
        .values('publisher__name', 'category__name')
        .annotate(total_expense=Sum('distribution_expense'))
    )
    
    # Now, aggregate the total distribution expense per publisher
    result = {}
    for expense in publisher_expenses:
        publisher_name = expense['publisher__name']
        category_name = expense['category__name']
        total_expense = expense['total_expense']
    
        if publisher_name not in result:
            result[publisher_name] = {'total_expense': 0, 'categories': {}}
    
        result[publisher_name]['total_expense'] += total_expense
        result[publisher_name]['categories'][category_name] = total_expense
    
    # This will give you a dictionary with publisher names, total expense, and expenses per category
    return JsonResponse(result)

@csrf_exempt
def batch_upload_view(request):
    """
    View to enable upload books and books category from a csv file.
    """
    if request.method == "POST":
        form = CSVFileForm(request.POST, request.FILES)
        if form.is_valid():
            print("Valid form")
            csv_file = request.FILES['file'].read().decode('utf-8').splitlines()
            create_from_csv(csv_file)


            return JsonResponse({ "success": "Successfully uploaded file." })
        else:
            return JsonResponse(form.errors.as_json(), safe=False)
            
