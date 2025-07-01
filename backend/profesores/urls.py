from django.urls import path, include
from rest_framework import routers
from .views import *
from .models import *

'''Este archivo define las rutas para acceder a las views,
cada ves que se crea una, se debe añadir aquí para acceder a ella.'''
router = routers.DefaultRouter()
'''Si la vista es un ViewSet, solo añadela como aparece abajo'''
router.register(r'grado_academico', GradoAcademicoViewSet)
router.register(r'tipo_profesor', TipoProfesorViewSet )
router.register(r'profesor', ProfesorViewSet)
router.register(r'estudios', EstudiosViewSet)
router.register(r'tipo_capacitacion', TipoCapacitacionViewSet)
router.register(r'capacitacion', CapacitacionViewSet)
router.register(r'actividad_inactivo', ActividadInactivoViewSet)
router.register(r'tipo_estancia', TipoEstanciaViewSet)
router.register(r'estancia', EstanciaViewSet)
router.register(r'profesor_estancia', ProfesorEstanciaViewSet)
router.register(r'tipo_evento', TipoEventoViewSet)
router.register(r'evento_subcategoria', EventoSubcategoriaViewSet)
router.register(r'evento_academico', EventoAcademicoViewSet)
router.register(r'tipo_producto', TipoProductoViewSet)
router.register(r'investigacion', InvestigacionViewSet)
router.register(r'profesor_investigacion', ProfesorInvestigacionViewSet)
router.register(r'grado_asesoria', GradoAsesoriaViewSet)
router.register(r'fase_proyecto', FaseProyectoViewSet)
router.register(r'asesoriaa', AsesoriaViewSet)
router.register(r'asesoria_externa', AsesoriaExternaViewSet)
router.register(r'asesoria_interna', AsesoriaInternaViewSet)
router.register(r'tipo_proyecto', TipoProyectoViewSet)
router.register(r'proyecto', ProyectoViewSet)
router.register(r'profesor_proyecto', ProfesorProyectoViewSet)
router.register(r'asignatura', AsignaturaViewSet)
router.register(r'excursion', ExcursionViewSet)
router.register(r'tutoria', TutoriaViewSet)
router.register(r'perfil_prodep', PerfilProdepViewSet)
router.register(r'nivel_investigador', NivelInvestigadorViewSet)
router.register(r'perfil_snii', PerfilSniiViewSet)
router.register(r'perfil_seii', PerfilSeiiViewSet)

'''Si no es un ViewSet, añadela siguiendo el patrón profesor/view'''
urlpatterns = [
    path('profesor/', include(router.urls)),
    path('actualizar_profesor/', ActualizarProfesor)
]