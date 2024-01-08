import csv
from datetime import datetime

from .models import Book, Category, Author, Publisher

def create_from_csv(csvfile): 
    csv_reader = csv.DictReader(csvfile)
    for row in csv_reader:

        date = datetime.strptime(row['published_date'], "%m/%d/%Y")
        
        publisher_queryset = Publisher.objects.filter(name=row['publisher'])
        if publisher_queryset.exists():
            publisher = publisher_queryset[0]
        else:
            publisher = Publisher(name=row['publisher'])
            publisher.save()
        
        category_queryset = Category.objects.filter(name=row['category'])
        if category_queryset.exists():
            category = category_queryset[0]
        else:
            category = Category(name=row['category'])
            category.save()

        book = Book.objects.create(title=row['title'],
                                   subtitle=row['subtitle'],
                                   published_date=date,
                                   distribution_expense=row['distribution_expense'],
                                   publisher=publisher,
                                   category=category) 

        authors = []
        for author_name in row['authors'].split(","):
            author_queryset = Author.objects.filter(name=author_name)
            if author_queryset.exists():
                author = author_queryset[0]
            else:
                author = Author(name=author_name)
                author.save()
            
            authors.append(author)
        
        book.authors.add(*authors)
        book.save()
