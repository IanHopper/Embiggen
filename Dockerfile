# Pull base image
FROM python:3.8-slim

# Set environment variables (pseudo SECRET_KEY)
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV SECRET_KEY=opb&dzzbui0hpinot&xvj5e94q=01y43w_dg=3*13sewx2&nop

# Set work directory
WORKDIR /Todo_App

# Install dependencies
COPY Pipfile Pipfile.lock /Todo_App/
RUN pip install pipenv && pipenv install --system

# Copy project
COPY . /Todo_App/

RUN python manage.py collectstatic --noinput