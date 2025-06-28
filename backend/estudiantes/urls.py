from django.urls import path, include
from rest_framework import routers
from .views import ProgramaEducativoViewSet

router = routers.DefaultRouter()
router.register(r'programa_educativo', ProgramaEducativoViewSet)

urlpatterns = [
    path('estudiante/', include(router.urls)),
]