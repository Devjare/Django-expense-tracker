from django.db import models

class Category(models.Model):
    name: models.CharField = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"

class Author(models.Model):
    name: models.CharField = models.CharField(max_length=100)
     
    def __str__(self):
        return f"{self.name}"

class Publisher(models.Model):
    name: models.CharField = models.CharField(max_length=50)
    location: models.CharField = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.name}"

class Book(models.Model):
    title: models.CharField = models.CharField(max_length=100)
    subtitle: models.CharField = models.CharField(max_length=100)
    published_date: models.DateField = models.DateField()
    distribution_expense: models.FloatField = models.FloatField() 
    publisher: models.CharField = models.CharField(max_length=100, default="")
    authors: models.CharField = models.CharField(max_length=200, default="")
    category: models.CharField = models.CharField(max_length=100, default="")

    
    # publisher: models.ForeignKey = models.ForeignKey(to=Publisher, on_delete=models.PROTECT)
    # authors: models.ManyToManyField = models.ManyToManyField(Author)
    # categories: models.ManyToManyField = models.ManyToManyField(Category)
    
    def __str__(self):
        return f"{self.title}"
