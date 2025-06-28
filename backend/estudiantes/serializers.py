from rest_framework import serializers
from .models import ProgramaEducativo

# SERIALIZADORES CON INFORMACIÓN PERSONAL DE LOS PROFESORES
# Serializador grado académico de los profesores
class ProgramaEducativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramaEducativo
        fields = ['programa_educativo']