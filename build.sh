#!/bin/bash

# Build the project
echo "Building project"
python -m pip install -r requirements.txt

echo "Make Migration..."
python manage.py makemigrations --no-input

echo "Collect static..."
python manage.py collectstatic --no-input --clear

