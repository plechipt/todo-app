import os
from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.middleware.csrf import get_token
from django.conf import settings
from django.conf.urls.static import static

ADMIN_PATH = os.environ.get('TODO_APP_ADMIN_PATH')

urlpatterns = [
    path("", include("todolist.urls")),
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('graphql/', jwt_cookie(GraphQLView.as_view(graphiql=False))),
    path('robots.txt', TemplateView.as_view(template_name='static/text/robots.txt')),
    #re_path('.*', TemplateView.as_view(template_name='index.html')),
] 
