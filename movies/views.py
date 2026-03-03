from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import responses
from rest_framework import status
from .models import Movie
from . serializers import Movieserializer

