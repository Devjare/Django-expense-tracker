from django.test import TestCase, Client
from book_manager.views import BooksViewSet
from book_manager.models import Author, Publisher, Category, Book

import datetime
import random

class BooksViewSetTest(TestCase):
    
    def setUp(self):
        # Add some test books.
        authors = [
            Author.objects.create(name="lazy_weeb"),
            Author.objects.create(name="Devjare"),
            Author.objects.create(name="JEspinoza")
                   ]
        publishers = [
            Publisher.objects.create(name="Lazyness Unlocked"),
            Publisher.objects.create(name="Lazyness Unfolded"),
            Publisher.objects.create(name="Lazyness Unloaded")
        ]
        categories = [
            Category.objects.create(name="Sci-fi"),
            Category.objects.create(name="Romance"),
            Category.objects.create(name="Horror")
        ]
        
        title = "Title {id}"
        subtitle = "Subtitle {id}"
        books = [ 
        {
            "title": title.format(id=idx),
            "subtitle": subtitle.format(id=idx),
            "category": categories[idx],
            "publisher": publishers[idx],
            "distribution_expense": random.uniform(1, 10),
            "published_date": datetime.date.today() + datetime.timedelta(days=(idx * 10 / 2))
        } for idx in range(3) ]
        
        for i in range(len(books)):
            book = books[i]
            book = Book(**book)
            book.save()
            
            book.authors.add(authors[i]) 

    def test_get_book_list(self):
        response = Client().get("/books/")
        self.assertEqual(response.status_code, 200)
    
    def test_get_existing_book(self):
        response = Client().get("/books/1/")
        self.assertEqual(response.status_code, 200)
        # self.assertEqual(type(response.response), dict)
    
    def test_get_inexisting_book(self):
        response = Client().get("/books/10/")
        self.assertEqual(response.status_code, 404)

    def test_create_single_author_book(self):
        response = Client().post("/books/", {
            "title": "Post TestCase Book Title",
            "subtitle": "Post TestCase Book SubTitle",
            "category": 1,
            "publisher": 2,
            "distribution_expense": random.uniform(1, 10),
            "published_date": datetime.date.today() - datetime.timedelta(days=1234),
            "authors": [1]
        })
        self.assertEqual(response.status_code, 201)

    def test_get_created_single_author_book(self):
        response = Client().get("/books/4/")
        self.assertEqual(response.status_code, 200)

    def test_create_single_author_book(self):
        response = Client().post("/books/", {
            "title": "Multiauthor Book Title",
            "subtitle": "Multiauthor Book SubTitle",
            "category": 1,
            "publisher": 2,
            "distribution_expense": random.uniform(1, 10),
            "published_date": datetime.date.today() - datetime.timedelta(days=100),
            "authors": [1, 2, 3]
        })
        self.assertEqual(response.status_code, 201)

    def test_get_created_multi_author_book(self):
        response = Client().get("/books/5/")
        self.assertEqual(response.status_code, 200)

class ReportsViewsTest(TestCase):
    
    def test_get_publishers_expenses(self):
        response = Client().get("/reports/publishers/expenses")
        self.assertEqual(response.status_code, 200)
    
    def test_get_authors_expenses(self):
        response = Client().get("/reports/authors/expenses")
        self.assertEqual(response.status_code, 200)

