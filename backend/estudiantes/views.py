from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProgramaEducativoSerializer
from .models import ProgramaEducativo

# VIEWS CON LA INFORMACIÓN PERSONAL DE LOS PROFESORES
# View grado académico de los profesores
class ProgramaEducativoViewSet(viewsets.ModelViewSet):
    queryset = ProgramaEducativo.objects.all()
    serializer_class = ProgramaEducativoSerializer