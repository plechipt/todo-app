from django.shortcuts import render, HttpResponse


def home(request): # new
    return HttpResponse('APP IS RUNNING')