import csv
from datetime import datetime

from .models import Book, Category

def create_from_csv(csvfile): 
    csv_reader = csv.DictReader(csvfile)
    for row in csv_reader:

        date = datetime.strptime(row['published_date'], "%m/%d/%Y")

        book = Book.objects.create(title=row['title'],
                                   subtitle=row['subtitle'],
                                   published_date=date,
                                   distribution_expense=row['distribution_expense'],
                                   publisher=row['publisher'],
                                   category=row['category'],
                                   authors=row['authors']) 
