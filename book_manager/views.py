from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Book, Category, Author, Publisher
from .serializers import BookSerializer, CategorySerializer, AuthorSerializer, PublisherSerializer

from .forms import CSVFileForm
from .util import create_from_csv

import csv

def home(request):
    return HttpResponse("<h5>Homepage!</h5>")

# Read only views. Handle retrieve tasks.
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
            
