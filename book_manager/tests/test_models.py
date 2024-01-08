from django.test import TestCase
from book_manager.models import *

import datetime


class AuthorTestCase(TestCase):

    def test_create_author(self):
        author_info = {
            "name": "lazy_weeb",
        }
        
        Author(**author_info).save()

        author = Author.objects.filter(name=author_info['name'])[0]
        
        self.assertEqual(author_info['name'], author.name)

class BookTestCase(TestCase):

    def setUp(self):
        author_info = {
            "name": "lazy_weeb",
        }
        author = Author(**author_info)
        author.save()
        
        author_info = {
            "name": "Devjare",
        }
        author = Author(**author_info)
        author.save()
        
        author_info = {
            "name": "JEspinoza",
        }
        author = Author(**author_info)
        author.save()
        
        publisher_info = {
            "name": "Lazyness Unlocked",
        }
        publisher = Publisher(**publisher_info)
        publisher.save()
        
        category_info = {
            "name": "Sci-fi"
        }
        category = Category(**category_info)
        category.save()
    
    def test_book_create_single_author(self):
        category = Category.objects.filter(name="Sci-fi")[0]
        author = Author.objects.filter(name="lazy_weeb")[0]
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
        self.assertEqual(book.authors.all()[0].name, author.name)
    
    def test_book_create_multiple_authors(self):
        category = Category.objects.filter(name="Sci-fi")[0]
        first_author = Author.objects.filter(name="lazy_weeb")[0]
        second_author = Author.objects.filter(name="Devjare")[0]
        third_author = Author.objects.filter(name="JEspinoza")[0]
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
        self.assertEqual(book.authors.filter(name="lazy_weeb")[0].name, first_author.name)
        self.assertEqual(book.authors.filter(name="Devjare")[0].name, second_author.name)
        self.assertEqual(book.authors.filter(name="JEspinoza")[0].name, third_author.name)
    
