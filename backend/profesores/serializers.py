from rest_framework import serializers
from .models import * 

# SERIALIZADORES CON INFORMACIÓN PERSONAL DE LOS PROFESORES
# Serializador grado académico de los profesores
class GradoAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradoAcademico
        fields = ['grado_academico']

# Serializador tipo de profesor (Tiempo completo, Pago por asignatura, etc.))
class TipoProfesorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProfesor
        fields = ['tipo_profesor']

# Serializador para los profesores
class ProfesorSerializer(serializers.ModelSerializer):
    grado_academico = serializers.StringRelatedField(source='id_grado_academico.grado_academico')
    programa_educativo = serializers.StringRelatedField(source='id_programa_educativo.programa_educativo')
    tipo_profesor = serializers.StringRelatedField(source='id_tipo_profesor.tipo_profesor')
    departamento = serializers.StringRelatedField(source='id_departamento.nombre_departamento')

    class Meta:
        model = Profesor
        fields = ['departamento','nombre', 'apellido_pat', 'apellido_mat', 'correo', 'sexo',
                  'jefe_departamento', 'activo', 'grado_academico', 'programa_educativo',
                  'tipo_profesor']


# SERIALIZADORES DE LOS ESTUDIOS DE LOS PROFESORES
# Serializador para los estudios de grado de los profesores
class EstudiosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudios
        fields = ['grado_actual', 'grado_estudiando', 'fecha_inicio', 'fecha_final',
                  'nombre_institucion', 'id_profesor']

# Serializador del tipo de capacitación
class TipoCapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCapacitacion
        fields = ['tipo_capacitacion']

# Serializador de la capacitación de los profesores
class CapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capacitacion
        fields = '__all__'

# Serializador de las actividades de los profesores inactivos
class ActividadInactivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadInactivo
        fields = '__all__'

# SERIALIZADORES DE LOS PRODUCTOS DE INVESTIGACIÓN DE LOS PROFESORES
# Serializador de las estancias de los profesores
class TipoEstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        Model = TipoEstancia
        fields = '__all__'

# Serializador de la estancia
class EstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        Model = Estancia
        fields = '__all__'
        
# Serializador de la estancia del profesor
class ProfesorEstanciaSerializer(serializers.ModelSerializer):
    class Meta:
        Model = ProfesorEstancia
        fields = '__all__'


# Serilizadores para los eventos académicos que realizan los profesores
# Serializador del tipo de evento
class TipoEventoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoEvento
        fields = '__all__'

# Serializador de la subcategoría del evento
class EventoSubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoSubcategoria
        fields = '__all__'

# Serializador del evento académico
class EventoAcademicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventoAcademico
        fields = '__all__'


# Serializadores para las investigaciones de los profesores
# Serializador del tipo de producto de investigación
class TipoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProducto
        fields = '__all__'

# Serializador de la investigación
class InvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investigacion
        fields = '__all__'

# Serializador de la investigación del profesor
class ProfesorInvestigacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesorInvestigacion
        fields = '__all__'


# Serializadores para las asesorias que dan los profesores
# Serializador del grado de asesoría (Licenciatura, Maestría, Doctorado)
class GradoAsesoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradoAsesoria
        fields = '__all__'

# Serializador de las fases del proyecto (Iniciado, Desarrollo, Finalizado)
class FaseProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaseProyecto
        fields = '__all__'

# Serializador de las asesorías que dan los profesores
class AsesoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asesoria
        fields = '__all__'

# Serializador de las asesorías externas
class AsesoriaExternaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsesoriaExterna
        fields = '__all__'

# Serializador de las asesorías internas (Dentro de la Universidad del Caribe)
class AsesoriaInternaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsesoriaInterna
        fields = '__all__'


# Serializadores de los proyectos que realizan los profesores
# Serializador del tipo de proyecto
class TipoProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProyecto
        fields = '__all__'

# Serializador del proyecto
class ProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = '__all__'
    
# Serializador de los proyectos realizados por los profesores
class ProfesorProyectoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfesorProyecto
        fields = '__all__'


# Serializadores de las excursiones que realizan los profesores
# Serializador de la asignatura de la excursión
class AsignaturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignatura
        fields = '__all__'

# Serializador de la excursión
class ExcursionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Excursion
        fields = '__all__'


# SERIALIZADOR DEL DEPARTAMENTO DE DESARROLLO ACADÉMICO
# Serializador de la tutoría que los profesores realizan a los estudiantes
class TutoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutoria
        fields = '__all__'

# SERIALIZADORES PARA EL PERFIL DE INVESTIGADOR DE LOS PROFESORES
class PerfilProdepSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilProdep
        fields = ['pertenece_prodep', 'vigencia_prodep']

# Serializador de los niveles de investigadores del SNII y SEII
class NivelInvestigadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = NivelInvestigador
        fields = ['nivel_investigador']

class PerfilSniiSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilSnii
        fields = '__all__'

class PerfilSeiiSerializer(serializers.ModelSerializer):
    class Meta:
        model = PerfilSeii
        fields = '__all__'