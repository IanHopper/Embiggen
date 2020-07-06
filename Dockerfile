# Pull base image
FROM python:3.8-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /Todo_App

# Install dependencies
COPY Pipfile Pipfile.lock /Todo_App/
RUN pip install pipenv && pipenv install --system

# Copy project
COPY . /Todo_App/

RUN python manage.py collectstatic