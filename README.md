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

Endpoints:

- **/home** -> Main page.
- **/book_category** -> See categories
- **/book_category/<int:category_id>/** -> View and edit category
- **/book** -> See books
- **/book/<int:book_id>/** -> View and edit book
- **/reports/** -> Dashboard of most recent reports
- **/reports/books** -> Dashboard of books reports
- **/reports/books/<int:book_id>** -> Reports and stats of books
- **/reports/categories** -> Dashboard of categories reports
- **/reports/categories/<int:category_id>** -> Reports and stats of categories
- **/reports/publishers** -> Dashboard of publishers reports
- **/reports/publishers/<int:publisher_id>** -> Reports and stats of publishers
