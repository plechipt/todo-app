import os
from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from users import views
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.conf import settings
from django.conf.urls.static import static

GRAPHIQL_VALUE = ''

ADMIN_PATH = os.getenv('ADMIN_PATH')
DEBUG = os.getenv('DEBUG')

if DEBUG == 'False':
    GRAPHIQL_VALUE = False
else:
    GRAPHIQL_VALUE = True
    

urlpatterns = [
    path("", include("todolist.urls")),
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('delete_cookies/', views.delete_cookies),
    path('graphql/', GraphQLView.as_view(graphiql=GRAPHIQL_VALUE)),
    path('robots.txt', TemplateView.as_view(template_name='static/text/robots.txt')),
    #re_path('.*', TemplateView.as_view(template_name='index.html')),
] 
