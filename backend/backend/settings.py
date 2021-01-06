
import os
from pathlib import Path

from backend.settings_files.basic import *
from backend.settings_files.development import *
from backend.settings_files.graphene import *

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('TODO_APP_SECRET_KEY')
DEBUG = True
ALLOWED_HOSTS = []

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}