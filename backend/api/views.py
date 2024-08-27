from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] # only authenticated users can create a note
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) # only the notes of the authenticated user
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user) # save the note with the authenticated user
        else:
            print(serializer.errors)
            
            
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] # only authenticated users can delete a note
    
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) # only the notes of the authenticated user
    
    def perform_destroy(self, instance):
        instance.delete() # delete the note


# Create your views here.
# Use chatgpt as a reference to understand the code here
# Describe in comments :
# What is the purpose of the CreateUserView class?
# What does the CreateUserView class inherit from?
# What does the CreateUserView class define?
# What is the purpose of the queryset attribute?
# What is the purpose of the serializer_class attribute?
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny] # anyone to create a user