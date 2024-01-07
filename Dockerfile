FROM python:3.12.1-slim-bullseye

RUN mkdir /ExpenseTracker
WORKDIR /ExpenseTracker

COPY . /ExpenseTracker

RUN python -m pip install -r requirements.txt
