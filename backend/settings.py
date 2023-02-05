
import os
import dj_database_url
from pathlib import Path

# Dotenv
from dotenv import load_dotenv
load_dotenv()

from decouple import config

DEBUG = os.getenv('DEBUG')
SECRET_KEY = 'i6-+5%&cy7i-py74)-cjkyo=3l4ru+@3fs7u(#kq&fz4c%x4#%'
BASE_DIR = Path(__file__).resolve().parent.parent

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Connect postgres 
DB_URL = os.getenv("DATABASE_URL")
DATABASES['default'] = dj_database_url.config(
    default=DB_URL,
    conn_max_age=600, 
    ssl_require=True
)


'''
Connect frontend to backend
'''

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles_build' / 'static'


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'users',
    'todolist',

    # Pip packages
    'stripe',
    'corsheaders',
    "graphene_django",
    'graphql_jwt',
    'graphql_jwt.refresh_token.apps.RefreshTokenConfig',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    #'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware', # Corsheaders
    'whitenoise.middleware.WhiteNoiseMiddleware', # Whitenoise
    #"django_graphql_ratelimit.middleware.ParseClientIpMiddleware", # Django graphql ratelimit
]

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Server is running in production
if DEBUG == False:
    # HTTPS settings
    CSRF_COOKIE_HTTPONLY = False
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True

    # HSTS settings
    SECURE_HSTS_SECONDS = 31536000 # 1 year
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True

# Corsheaders
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'https://my-todo-app-frontend-site.netlify.app'
]

ALLOWED_HOSTS = [
    '127.0.0.1',
    '.vercel.app',
    'www.my-todo-app-frontend-site.netlify.app'
]

# Whitenoise
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

ROOT_URLCONF = 'backend.urls'
WSGI_APPLICATION = 'backend.wsgi.application'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

from datetime import timedelta

HOST_URL = os.getenv('HOST_URL')

GRAPHENE = {
    "SCHEMA": "backend.schema.schema",
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

GRAPHQL_JWT = {
    'JWT_COOKIE_DOMAIN': HOST_URL,
    'JWT_VERIFY_EXPIRATION': False,
    'JWT_LONG_RUNNING_REFRESH_TOKEN': True,
    'JWT_EXPIRATION_DELTA': timedelta(minutes=15),
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
    
    # Rename JWT cookie tokens
    'JWT_COOKIE_NAME': 'accessToken',
    'JWT_REFRESH_TOKEN_COOKIE_NAME': 'refreshToken',
}

AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]