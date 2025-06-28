from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(r'usuario', UsuarioViewSet)
router.register(r'tipo_usuario', TipoUsuarioViewSet)
router.register(r'departamento', DepartamentoViewSet)
router.register(r'registrar', RegistrarUsuarioViewSet, basename='registrar')


urlpatterns = [
    path('usuario/', include(router.urls)),
    path('obtener_usuario/', ObtenerUsuario),
    path('editar_usuario/', EditarUsuario),
    path('validar_usuario/', ValidarUsuario),
]