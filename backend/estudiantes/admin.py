from django.contrib import admin
from .models import ProgramaEducativo, TipoIngreso, EstadoServicio, Situacion, Estatus, NombreTaller

''' Este apartado es para el super administrador de Django,
los modelos que se registren aquí se visualizaran en:

http://localhost:8000/admin/ *accede con usuario y contraseña *

Ahí se puede modificar el contenido de los modelos registrados
'''
# Register your models here.
admin.site.register(ProgramaEducativo)
admin.site.register(TipoIngreso)
admin.site.register(EstadoServicio)
admin.site.register(Situacion)
admin.site.register(Estatus)
admin.site.register(NombreTaller)