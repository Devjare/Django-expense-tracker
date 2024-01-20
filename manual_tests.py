from book_manager.models import Book, Publisher
from django.db.models import Sum

# Assuming you have models named Book, Publisher, and Category
# and Book has ForeignKey for both Publisher and Category

# Aggregate distribution expenses per book and group by publisher and category
publisher_expenses = (
    Book.objects
    .values('publisher__name', 'category__name')  # Assuming 'name' is the field representing the publisher's and category's name
    .annotate(total_expense=Sum('distribution_expense'))
)

# Now, aggregate the total distribution expense per publisher
result = {}
for expense in publisher_expenses:
    publisher_name = expense['publisher__name']
    category_name = expense['category__name']
    total_expense = expense['total_expense']

    if publisher_name not in result:
        result[publisher_name] = {'total_expense': 0, 'categories': {}}

    result[publisher_name]['total_expense'] += total_expense
    result[publisher_name]['categories'][category_name] = total_expense

# This will give you a dictionary with publisher names, total expense, and expenses per category
for publisher_name, data in result.items():
    print(f"Publisher: {publisher_name}, Total Distribution Expense: {data['total_expense']}")
    for category_name, category_expense in data['categories'].items():
        print(f"  Category: {category_name}, Category Expense: {category_expense}")

