from django.db import models
from usuarios.models import Usuario, Departamento
from estudiantes.models import ProgramaEducativo, Ciudad, Estudiante

# Este archivo contiene todos los modelos de los profesores

# MODELOS CON INFORMACIÓN PERSONAL DE LOS PROFESORES
# Modelo del grado académico de los profesores
class GradoAcademico(models.Model):
    id_grado_academico = models.AutoField(primary_key=True)
    grado_academico = models.CharField(max_length=50)

    class Meta:
        managed = True
        db_table = "grado_academico"

# Modelo del tipo de profesor (Tiempo completo, Pago por asignatura, etc.)
class TipoProfesor(models.Model):
    id_tipo_profesor = models.AutoField(primary_key=True)
    tipo_profesor = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'tipo_profesor'

# Modelo para los profesores
class Profesor(models.Model):
    id_profesor = models.AutoField(primary_key=True)
    id_usuario = models.ForeignKey(Usuario, models.DO_NOTHING, db_column='id_usuario')
    nombre = models.CharField(max_length=40)
    apellido_pat = models.CharField(max_length=40)
    apellido_mat = models.CharField(max_length=40)
    correo = models.CharField(max_length=50)
    sexo = models.BooleanField()
    id_grado_academico = models.ForeignKey(GradoAcademico, models.DO_NOTHING,db_column='id_grado_academico')
    id_programa_educativo = models.ForeignKey(ProgramaEducativo, models.DO_NOTHING, db_column='id_programa_educativo')
    id_departamento = models.ForeignKey(Departamento, models.DO_NOTHING, db_column='id_departamento')
    jefe_departamento = models.BooleanField()
    id_tipo_profesor = models.ForeignKey(TipoProfesor, models.DO_NOTHING, db_column='id_tipo_profesor')
    activo = models.BooleanField()
    
    class Meta:
        managed = True
        db_table = 'profesor'


# MODELOS DE LOS ESTUDIOS DE LOS PROFESORES
# Modelo para los estudios de grado de los profesores
class Estudios(models.Model):
    id_estudios = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    grado_actual = models.CharField(max_length=50)
    grado_estudiando = models.CharField(max_length=50)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    nombre_institucion = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'estudios'

# Modelo del tipo de capacitación
class TipoCapacitacion(models.Model):
    id_tipo_capacitacion = models.AutoField(primary_key=True)
    tipo_capacitacion = models.CharField(max_length=50)

# Modelo para la capacitación de los profesores
class Capacitacion(models.Model):
     id_capacitacion = models.AutoField(primary_key=True)
     id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
     id_tipo_capacitacion = models.ForeignKey(TipoCapacitacion, models.DO_NOTHING, db_column='id_tipo_capacitacion')
     evento = models.CharField(max_length=255)
     sede = models.CharField(max_length=255)
     organizador = models.CharField(max_length=255)
     fecha_inicio = models.DateField()
     fecha_final = models.DateField()

     class Meta:
         managed = True
         db_table = 'capacitacion'

# Modelo de las actividades realizadas por los profesores inactivos
class ActividadInactivo(models.Model):
    id_actividad_inactivo = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    carta_autorizacion = models.CharField(max_length=255)
    institucion = models.CharField(max_length=255)
    carta_aceptacion = models.CharField(max_length=255)
    nombre_proyecto = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    carta_incorporacion = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'actividad_inactivo'

    
# MODELOS DE LOS PRODUCTOS DE INVESTIGACIÓN DE LOS PROFESORES (Investigaciones, Libros, Estancias, etc.)
# Modelos de las estancias de los profesores
# Modelo del tipo de estancia
class TipoEstancia(models.Model):
    id_tipo_estancia = models.AutoField(primary_key=True)
    tipo_estancia = models.CharField(max_length=50)

    class Meta:
        managed = True
        db_table = 'tipo_estancia'

# Modelo de la estancia
class Estancia(models.Model):
    id_estancia = models.AutoField(primary_key=True)
    id_tipo_estancia = models.ForeignKey(TipoEstancia, models.DO_NOTHING, db_column='id_tipo_estancia')
    id_ciudad = models.ForeignKey(Ciudad, models.DO_NOTHING, db_column='id_ciudad')

    class Meta:
        managed = True
        db_table = 'estancia'

# Modelo de la estancia del profesor
class ProfesorEstancia(models.Model):
    id_profesor_estancia = models.AutoField(primary_key=True)
    id_estancia = models.ForeignKey(Estancia, models.DO_NOTHING, db_column='id_estancia')
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    motivo = models.TextField()
    objetivo = models.TextField()
    resultados = models.TextField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'profesor_estancia'

# Modelos para los eventos académicos que realizan los profesores
# Modelo del tipo de evento
class TipoEvento(models.Model):
    id_tipo_evento = models.AutoField(primary_key=True)
    tipo_evento = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'tipo_evento'

# Modelo de la subcategoría del evento
class EventoSubcategoria(models.Model):
    id_evento_subcategoria = models.AutoField(primary_key=True)
    subcategoria = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'evento_subcategoria'

# Modelo del evento académico
class EventoAcademico(models.Model):
    id_evento_academico = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    id_tipo_evento = models.ForeignKey(TipoEvento, models.DO_NOTHING, db_column='id_tipo_evento')
    id_evento_subcategoria = models.ForeignKey(EventoSubcategoria, models.DO_NOTHING, db_column='id_evento_subcategoria')
    nombre_evento = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'evento_acad'


# Modelos para las investigaciones de los profesores
# Modelo del tipo de producto de investigación
class TipoProducto(models.Model):
    id_tipo_producto = models.AutoField(primary_key=True)
    tipo_producto = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'tipo_producto'

# Modelo de la investigación
class Investigacion(models.Model):
    id_investigacion = models.AutoField(primary_key=True)
    nombre_producto = models.CharField(max_length=255)
    tipo_producto = models.ForeignKey(TipoProducto, models.DO_NOTHING, db_column='id_tipo_producto')
    isbn = models.CharField(max_length=255)
    objeto_estudio = models.CharField(max_length=255)
    fecha_publicacion = models.DateField()
    numero_edicion = models.CharField(max_length=255)
    lugar_publicacion = models.CharField(max_length=255)
    nombre_institucion = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'investigacion'

# Modelo de la investigación del profesor
class ProfesorInvestigacion(models.Model):
    id_profesor_investigacion = models.AutoField(primary_key=True)
    id_investigacion = models.ForeignKey(Investigacion, models.DO_NOTHING, db_column='id_investigacion')
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'profesor_investigacion'


# Modelos para las asesorias que dan los profesores
# Modelo del grado de asesoría (Licenciatura, Maestría, Doctorado)
class GradoAsesoria(models.Model):
    id_grado_asesoria = models.AutoField(primary_key=True)
    grado = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'grado_asesoria'

# Modelo de las fases del proyecto (Iniciado, Desarrollo, Finalizado)
class FaseProyecto(models.Model):
    id_fase_proyecto = models.AutoField(primary_key=True)
    fase = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'fase_proyecto'

# Modelo de las asesorías que dan los profesores
class Asesoria(models.Model):
    id_asesoria = models.IntegerField(primary_key=True)
    tipo_asesoria = models.BooleanField()
    id_grado_asesoria = models.ForeignKey(GradoAsesoria, models.DO_NOTHING, db_column='id_grado_asesoria')
    id_fases_proyecto = models.ForeignKey(FaseProyecto, models.DO_NOTHING, db_column='id_fase_proyecto')
    institucion = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    recursos = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'asesoria'

# Modelo de las asesorías externas
class AsesoriaExterna(models.Model):
    id_asesoria_externa = models.AutoField(primary_key=True)
    id_asesoria = models.ForeignKey(Asesoria, models.DO_NOTHING, db_column='id_asesoria')
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    nombre_asesorado = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'asesoria_externa'

# Modelo de las asesorías internas (Dentro de la Universidad del Caribe)
class AsesoriaInterna(models.Model):
    id_asesoria_interna = models.AutoField(primary_key=True)
    id_asesoria = models.ForeignKey(Asesoria, models.DO_NOTHING, db_column='id_asesoria')
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')

    class Meta:
        managed = True
        db_table = 'asesoria_interna'


# Modelos de los proyectos que realizan los profesores
# Modelo del tipo de proyecto
class TipoProyecto(models.Model):
    id_tipo_proyecto = models.AutoField(primary_key=True)
    tipo_proyecto = models.CharField(max_length=30)

    class Meta:
        managed = True
        db_table = 'tipo_proyecto'

# Modelo del proyecto
class Proyecto(models.Model):
    id_proyecto = models.AutoField(primary_key=True)
    nombre_proyecto = models.CharField(max_length=255)
    tipo_proyecto = models.ForeignKey(TipoProyecto, models.DO_NOTHING, db_column='id_tipo_proyecto')
    objetivo = models.TextField()
    etapa = models.CharField(max_length=30)
    financiamiento = models.BooleanField()
    resultados = models.TextField()

    class Meta:
        managed = True
        db_table = 'proyecto'
    
# Modelo de los proyectos realizados por los profesores
class ProfesorProyecto(models.Model):
    id_profesor_proyecto = models.AutoField(primary_key=True)
    id_proyecto = models.ForeignKey(Proyecto, models.DO_NOTHING, db_column='id_proyecto')
    id_profesor =models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'profesor_proyecto'


# Modelos de las excursiones que realizan los profesores
# Modelo de la asignatura de la excursión
class Asignatura(models.Model):
    id_asignatura = models.AutoField(primary_key=True)
    nombre_asignatura = models.CharField(max_length=255)
    clave = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'asignatura'

# Modelo de la excursión
class Excursion(models.Model):
    id_excursion = models.AutoField(primary_key=True)
    tipo_excursion = models.BooleanField()
    id_asignatura = models.ForeignKey(Asignatura, models.DO_NOTHING, db_column='id_asignatura')
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    destino = models.CharField(max_length=255)
    objetivo = models.CharField(max_length=255)
    evidencias = models.CharField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'excursion'


# MODELO DEL DEPARTAMENTO DE DESARROLLO ACADÉMICO
# Modelo de la tutoría que los profesores realizan a los estudiantes
class Tutoria(models.Model):
    id_tutoria = models.AutoField(primary_key=True)
    tipo_tutoria = models.BooleanField()
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    carta_asignacion = models.TextField()
    motivo_tutoria = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed = True
        db_table = 'tutoria'

# MODELOS DE LOS PERFILES DE INVESTIGACIÓN DE LOS PROFESORES
class PerfilProdep(models.Model):
    id_perfil_prodep = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    pertenece_prodep = models.BooleanField()
    vigencia_prodep = models.CharField()

    class Meta:
        managed = True
        db_table = 'perfil_prodep'

# Modelo de los niveles de investigadores del SNII y SEII
class NivelInvestigador(models.Model):
    id_nivel_investigador = models.AutoField(primary_key=True)
    nivel_investigador = models.CharField()

class PerfilSnii(models.Model):
    id_perfil_snii = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    pertenece_snii = models.BooleanField()
    id_nivel = models.ForeignKey(NivelInvestigador, models.DO_NOTHING, db_column='id_nivel_investigador')
    vigencia_snii = models.CharField()

    class Meta:
        managed = True
        db_table = 'perfil_snii'

class PerfilSeii(models.Model):
    id_perfil_seii = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    pertenece_seii = models.BooleanField()
    id_nivel = models.ForeignKey(NivelInvestigador, models.DO_NOTHING, db_column='id_nivel_investigador')
    vigencia_seii = models.CharField()

    class Meta:
        managed = True
        db_table = 'perfil_Seii'