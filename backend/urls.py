import os
from django.contrib import admin
from django.urls import path, re_path
from graphene_django.views import GraphQLView
from graphql_jwt.decorators import jwt_cookie
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from django.middleware.csrf import rotate_token

ADMIN_PATH = os.environ.get('TODO_APP_ADMIN_PATH')

urlpatterns = [
    path(f'{ADMIN_PATH}/', admin.site.urls),
    path('graphql/', jwt_cookie(GraphQLView.as_view(graphiql=False))),
    re_path('.*', TemplateView.as_view(template_name='index.html'))
]
