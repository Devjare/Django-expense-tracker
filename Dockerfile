FROM python:3.12-slim-bullseye

# SET THE WORKING DIRECTORY
RUN mkdir /ExpenseTracker
WORKDIR /ExpenseTracker
COPY . /ExpenseTracker

RUN rm -rf /ExpenseTracker/frontend

# SETUP DEPENDENCIES
RUN python -m pip install -r requirements.txt

EXPOSE 5000

CMD [ "python", "manage.py", "runserver" ]
