#!/bin/bash

# Build the project
echo "Building project"
python3.9 -m pip install -r requirements.txt

echo "Make Migration..."
python3.9 manage.py makemigrations --no-input

#echo "Migrate..."
#python manage.py migrate --no-input

echo "Collect static..."
python3.9 manage.py collectstatic --no-input --clear

