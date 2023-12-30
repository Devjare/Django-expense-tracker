from django.shortcuts import render, get_object_or_404
from django.views.generic.list import ListView
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response

from .models import Book, Category
from .serializers import BookSerializer, CategorySerializer
from .forms import CSVFileForm

import csv

def home(request):
    return HttpResponse("<h5>Homepage!</h5>")

# Read only views. Handle retrieve tasks.
class BookCategoryView(viewsets.ViewSet):
    """
    Book category viewset.
    """ 
    def list(self, request):
        queryset = Category.objects.all()
        serializer = CategorySerializer(queryset, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Category.objects.all()
        category = get_object_or_404(queryset, pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

class BookListView(viewsets.ViewSet):
    """
    Book category viewset.
    """ 
    def retrieve(self, request, pk=None):
        queryset = Book.objects.all()
        category = get_object_or_404(queryset, pk=pk)
        serializer = BookSerializer(category)
        return Response(serializer.data)
    
    def list(self, request):
        queryset = Book.objects.all()
        serializer = BookSerializer(queryset, many=True)
        return Response(serializer.data)
    

@csrf_exempt
def batch_upload_view(request):
    """
    View to enable upload books and books category from a csv file.
    """
    if request.method == "POST":
        form = CSVFileForm(request.POST, request.FILES)
        if form.is_valid():
            csv_file = request.FILES['csv_file'].read().decode('utf-8').splitlines()
            csv_reader = csv.DictReader(csv_file)

            return redirect("success_page")
        else:
            print("Invalid form errors: ", form.errors.as_json())
            return HttpResponse("<h5>Failed to upload form...</h5>")
            