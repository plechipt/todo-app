import os

DEBUG_VALUE = os.getenv('DEBUG')
SECRET_KEY = os.getenv('SECRET_KEY') 
HOST_URL = os.getenv('HOST_URL') 

# CSRF
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_HTTPONLY = False
CSRF_COOKIE_NAME = "csrftoken"
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'https://my-todo-app-frontend-site.netlify.app'
]

# Server is running in production
'''
if DEBUG_VALUE == 'False':
    # HTTPS settings
    CSRF_COOKIE_HTTPONLY = False
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_SSL_REDIRECT = True

    # HSTS settings
    SECURE_HSTS_SECONDS = 31536000 # 1 year
    SECURE_HSTS_PRELOAD = True
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
'''
    
# Corsheaders
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://127.0.0.1:8000',
    'http://localhost:3000',
    'https://my-todo-app-frontend-site.netlify.app'
]

ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
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