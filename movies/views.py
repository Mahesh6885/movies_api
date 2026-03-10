from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Movie
from . serializers import Movieserializer

class MovieList(APIView):
    def get(self,request):
        movies=Movie.objects.all()
        serializers=Movieserializer(movies,many=True)
        return Response(serializers.data)
    
    def post(self,request):
        serializer=Movieserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)
class MovieDetail(APIView):
    def get(self,request,pk):
        movie=Movie.objects.get(id=pk)
        serializer=Movieserializer(movie)
        return Response(serializer.data)
    
    def put(self,request,pk):
        movie=Movie.objects.get(id=pk)
        serializer=Movieserializer(movie)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    def delete(self,request,pk):
        movie=Movie.objects.get(id=pk)
        movie.delete()
        return Response({'message':"Movie Deleted"})