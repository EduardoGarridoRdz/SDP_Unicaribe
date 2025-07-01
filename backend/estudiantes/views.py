from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProgramaEducativoSerializer
from .models import *

# VIEWS PARA EL PROCESAMIENTO DE ARCHIVOS EXCEL
# View con el programa educativo de los estudiantes
class ProgramaEducativoViewSet(viewsets.ModelViewSet):
    queryset = ProgramaEducativo.objects.all()
    serializer_class = ProgramaEducativoSerializer


