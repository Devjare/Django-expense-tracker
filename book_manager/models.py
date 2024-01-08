from django.db import models

class Category(models.Model):
    name: models.CharField = models.CharField(max_length=50, default="")

    def __str__(self):
        return f"{self.name}"

class Author(models.Model):
    name: models.CharField = models.CharField(max_length=50, default="")
     
    def __str__(self):
        return f"{self.name}"

class Publisher(models.Model):
    name: models.CharField = models.CharField(max_length=50, default="")
    
    def __str__(self):
        return f"{self.name}"

class Book(models.Model):
    title: models.CharField = models.CharField(max_length=100, default="")
    subtitle: models.CharField = models.CharField(max_length=100, default="")
    published_date: models.DateField = models.DateField()
    distribution_expense: models.FloatField = models.FloatField() 
     
    publisher: models.ForeignKey = models.ForeignKey(to=Publisher, on_delete=models.PROTECT)
    category: models.ForeignKey = models.ForeignKey(to=Category, on_delete=models.PROTECT)
    authors: models.ManyToManyField = models.ManyToManyField(Author)
    
    def __str__(self):
        return f"{self.title}"
