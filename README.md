# Expense tracker with reporting data.

![RepoLabels](https://img.shields.io/badge/python-django-green?style=social&logo=django)

Expense tracker for coursera portfolio project.

E-R Relations:

Tables:
- Book
- Category
- Author
- Publisher

Relation Tables:
- BookAuthor
- BookCategory

Cardinality:
- Book M-M Author = BookAuthor
- Book 1-M Category = BookCategory
- Book 1-1 Publisher
