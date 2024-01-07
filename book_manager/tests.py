from django.test import TestCase
from .models import *

import datetime


class AuthorTestCase(TestCase):

    def test_create_author(self):
        author_info = {
            "author_name": "lazy_weeb",
            "first_name": "Andres",
            "last_name": "Reyna",
        }
        
        Author(**author_info).save()

        author = Author.objects.filter(author_name=author_info['author_name'])[0]
        
        self.assertEqual(author_info['author_name'], author.author_name)
        self.assertEqual(author_info['first_name'], author.first_name)
        self.assertEqual(author_info['last_name'], author.last_name) 

class BookTestCase(TestCase):

    def setUp(self):
        author_info = {
            "author_name": "lazy_weeb",
            "first_name": "Andres",
            "last_name": "Reyna",
        }
        author = Author(**author_info)
        author.save()
        
        author_info = {
            "author_name": "Devjare",
            "first_name": "Jose Andres",
            "last_name": "Reyna Espinoza",
        }
        author = Author(**author_info)
        author.save()
        
        author_info = {
            "author_name": "JEspinoza",
            "first_name": "Jose",
            "last_name": "Espinoza",
        }
        author = Author(**author_info)
        author.save()
        
        publisher_info = {
            "name": "Lazyness Unlocked",
            "address": "Unfathomable Street #108",
        }
        publisher = Publisher(**publisher_info)
        publisher.save()
        
        category_info = {
            "name": "Sci-fi",
            "description": """Uninimaginable adventures, flashing lights, space, 
            sea depth, dangers everywhere. Everything is possible on this genre.""",
        }
        category = Category(**category_info)
        category.save()
    
    def test_book_create_single_author(self):
        category = Category.objects.filter(name="Sci-fi")[0]
        author = Author.objects.filter(author_name="lazy_weeb")[0]
        publisher = Publisher.objects.filter(name="Lazyness Unlocked")[0]

        book_info = {
            "title": "The Amazing Adventures of LazyWeeb.",
            "subtitle": "The tales of a guy who didn't know more than what he could see.",
            "category": category,
            "publisher": publisher,
            "distribution_expense": 3.5,
            "published_date": datetime.date.today()
        }
        
        book = Book(**book_info)
        book.save()
        book.authors.add(author) 

        self.assertEqual(book.title, book_info['title'])
        self.assertEqual(book.subtitle, book_info['subtitle'])
        self.assertEqual(book.category, book_info['category'])
        self.assertEqual(book.publisher, book_info['publisher'])
        self.assertEqual(book.published_date, book_info['published_date'])
        self.assertEqual(book.distribution_expense, book_info['distribution_expense'])
        self.assertEqual(book.authors.all()[0].author_name, author.author_name)
    
    def test_book_create_multiple_authors(self):
        category = Category.objects.filter(name="Sci-fi")[0]
        first_author = Author.objects.filter(author_name="lazy_weeb")[0]
        second_author = Author.objects.filter(author_name="Devjare")[0]
        third_author = Author.objects.filter(author_name="JEspinoza")[0]
        publisher = Publisher.objects.filter(name="Lazyness Unlocked")[0]

        book_info = {
            "title": "The Amazing Adventures of LazyWeeb: TWO.",
            "subtitle": "The return of LazyWeeb.",
            "category": category,
            "publisher": publisher,
            "distribution_expense": 3.5,
            "published_date": datetime.date.today() + datetime.timedelta(days=365)
        }
        
        book = Book(**book_info)
        book.save()
        book.authors.add(first_author) 
        book.authors.add(second_author) 
        book.authors.add(third_author) 

        self.assertEqual(book.title, book_info['title'])
        self.assertEqual(book.subtitle, book_info['subtitle'])
        self.assertEqual(book.category, book_info['category'])
        self.assertEqual(book.publisher, book_info['publisher'])
        self.assertEqual(book.published_date, book_info['published_date'])
        self.assertEqual(book.distribution_expense, book_info['distribution_expense'])
        self.assertEqual(book.authors.filter(author_name="lazy_weeb")[0].author_name, first_author.author_name)
        self.assertEqual(book.authors.filter(author_name="Devjare")[0].author_name, second_author.author_name)
        self.assertEqual(book.authors.filter(author_name="JEspinoza")[0].author_name, third_author.author_name)
    
