from django.urls import path, include
from rest_framework import routers
from .views import ProgramaEducativoViewSet
from .procesamiento import RecibirArchivo

'''Este archivo define las rutas para acceder a las views,
cada ves que se crea una, se debe añadir aquí para acceder a ella.'''
router = routers.DefaultRouter()
'''Si la vista es un ViewSet, solo añadela como aparece abajo'''
router.register(r'programa_educativo', ProgramaEducativoViewSet)

'''Si no es un ViewSet, añadela siguiendo el patrón estudiante/view'''
urlpatterns = [
    path('estudiante/', include(router.urls)),
    path('estudiante/procesar_archivo/', RecibirArchivo)
]