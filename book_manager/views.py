from django.shortcuts import render
from django.views.generic.list import ListView
from django.http import HttpResponse
from rest_framework.views import APIView

from .models import Book, Category

def home(request):
    return HttpResponse("<h5>Homepage!</h5>")

class BookListView(APIView):

    def get(request, format=None):
        queryset = Book.objects.all()
        if queryset.exists():

            return HttpResponse(f"{','.join([book.title for book in queryset])}")
        
        return HttpResponse("Failed to retrieve book list.")
