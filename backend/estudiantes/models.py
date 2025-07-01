from django.db import models
# Este archivo contiene todos los modelos (tablas de la base de datos) de los estudiantes
# Modificar con precaución y campos específicos de cada modelo

# MODELOS PARA LA CIUDAD, ESTADO Y PAÍS
class Pais(models.Model):
    id_pais = models.AutoField(primary_key=True)
    nombre_pais = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'pais'

class Estado(models.Model):
    id_estado = models.AutoField(primary_key=True)
    nombre_estado = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'estado'

class Ciudad(models.Model):
    id_ciudad = models.AutoField(primary_key=True)
    id_estado = models.ForeignKey(Estado, models.DO_NOTHING, db_column='id_estado')
    id_pais = models.ForeignKey(Pais, models.DO_NOTHING, db_column='id_pais')
    nombre_ciudad = models.CharField(max_length=50)

    class Meta:
        managed: True
        db_table = 'ciudad'


# MODELOS DE LOS DATOS PERSONALES DE LOS ESTUDIANTES
# Programa educativo
class ProgramaEducativo(models.Model):
    id_programa_educativo = models.AutoField(primary_key=True)
    programa_educativo = models.CharField(max_length=255)
    
    class Meta:
        managed: True
        db_table = 'programa_educativo'

# Estatus de los estudiantes
class Estatus(models.Model):
    id_estatus = models.AutoField(primary_key=True)
    estatus = models.CharField(max_length=30)

    class Meta:
        managed: True
        db_table = 'estatus'
# Situación de los estudiantes
class Situacion(models.Model):
    id_situacion = models.AutoField(primary_key=True)
    situacion = models.CharField(max_length=30)

    class Meta:
        managed: True
        db_table = 'situacion'

# Tipo de ingreso de los estudiantes
class TipoIngreso(models.Model):
    id_tipo_ingreso = models.AutoField(primary_key=True)
    ingreso = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'tipo_ingreso'
        

# MODELOS DE LOS ESTUDIANTES (TABLA ESTUDIANTE)
class Estudiante(models.Model):
    id_estudiante = models.AutoField(primary_key=True)
    matricula = models.CharField(unique=True, max_length=10)
    nombre = models.CharField(max_length=60)
    curp = models.CharField(max_length=20)
    direccion = models.CharField(max_length=60)
    email_personal = models.CharField(max_length=60)
    telefono = models.CharField(max_length=10)
    iems_procedencia = models.CharField(max_length=255)
    generacion = models.CharField(max_length=255)
    id_tipo_ingreso = models.ForeignKey(TipoIngreso, models.DO_NOTHING, db_column='id_tipo_ingreso')
    fecha_ingreso = models.DateField()
    discapacidad = models.BooleanField()
    nombre_discapacidad = models.CharField(max_length=255)
    id_pro_edu = models.ForeignKey(ProgramaEducativo, models.DO_NOTHING, db_column='id_programa_educativo')
    id_situacion = models.ForeignKey(Situacion, models.DO_NOTHING, db_column='id_situacion')
    motivo_situacion = models.CharField(max_length=255)
    id_estatus = models.ForeignKey(Estatus, models.DO_NOTHING, db_column='id_estatus')
    beca = models.BooleanField()
    tipo_beca = models.CharField(max_length=255)
    creditos = models.FloatField()
    derecho_servicio_social = models.BooleanField()
    fecha_nac = models.DateField()
    sexo = models.BooleanField()
    hablante_indigena = models.BooleanField()
    nombre_lengua = models.CharField(max_length=255)
    promedio = models.FloatField()
    titulado = models.BooleanField()

    class Meta:
        managed: True
        db_table = 'estudiante'

# MODELOS DEL HISTORIAL DE LOS ESTUDIANTES
# Historial del estatus del estudiante
class HistorialEstatus(models.Model):
    id_historial_estatus = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    id_estatus = models.ForeignKey(Estatus, models.DO_NOTHING, db_column='id_estatus')
    fecha_estatus = models.DateField()

    class Meta:
        managed: True
        db_table = 'historial_estatus'

# Historial de la situación del estudiante
class HistorialSituacion(models.Model):
    id_historial_situacion = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    id_situacion = models.ForeignKey(Situacion, models.DO_NOTHING, db_column='id_situacion')
    fecha_situacion = models.DateField()

    class Meta:
        managed: True
        db_table = 'historial_situacion'


# MODELO CON DATOS DE EGRESADOS
class Egresado(models.Model):
    id_egresado = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    email = models.CharField(max_length=50)
    telefono = models.CharField(max_length=10)
    telefono_casa = models.CharField(max_length=10)
    red_social = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'egresado'


# MODELO DEL DEPARTAMENTO DE IDIOMAS
class Idioma(models.Model):
    id_idioma = models.AutoField(primary_key=True)
    estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='estudiante')
    idioma = models.CharField(max_length=255)
    nivel = models.CharField(max_length=35)
    acreditado = models.BooleanField()
    certificacion = models.CharField(max_length=60)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()

    class Meta:
        managed: True
        db_table = 'idioma'


# MODELO DEL DEPARTAMENTO DE DESARROLLO ESTUDIANTIL
# Modelo con los nombres de los talleres
class NombreTaller(models.Model):
    id_nombre_taller = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40)
   
    class Meta:
        managed: True
        db_table = 'nombre_taller'

# Modelo con los datos de los talleres
class Taller(models.Model):
    id_taller = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    tipo_taller = models.BooleanField()
    id_nombre_taller = models.ForeignKey(NombreTaller, models.DO_NOTHING, db_column='id_nombre_taller')
    representante = models.BooleanField()
    selectivo = models.BooleanField()
    acreditado = models.BooleanField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    club = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'taller'


# MODELO DEL DEPARTAMENTO DE PRÁCTICAS PROFESIONALES
class PracticaProf(models.Model):
    id_practica_prof = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    num_practica = models.IntegerField()
    #practica_internacional = models.BooleanField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    empresa = models.CharField(max_length=255)
    telefon_empresa = models.CharField(max_length=15)
    contratado = models.BooleanField()

    class Meta:
        managed: True
        db_table = 'practica_prof'


# MODELO DEL DEPARTAMENTO DE SERVICIO SOCIAL
# Modelo con el estado del servicio social
class EstadoServicio(models.Model):
    id_estado = models.AutoField(primary_key=True)
    estado = models.CharField(max_length=15)

    class Meta:
        managed: True
        db_table = 'estado_servicio'

# Modelo con datos del servicio social 
class ServicioSocial(models.Model):
    id_servicio = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    id_estado = models.ForeignKey(EstadoServicio, models.DO_NOTHING, db_column='id_estado')
    tipo_proyecto = models.BooleanField()
    clase_proyecto = models.CharField(max_length=40)
    nombre_proyecto = models.CharField(max_length=255)
    beneficiarios = models.CharField(max_length=255)
    evidencias = models.BinaryField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    
    class Meta:
        managed: True
        db_table = 'servicio_social'

# MODELO DEL DEPARTAMENTO DE MOVILIDAD ACADÉMICA
class MovilidadAcad(models.Model):
    id_movilidad_acad = models.AutoField(primary_key=True)
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    institucion = models.CharField(max_length=255)
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()
    acreditado = models.BooleanField()
    beca = models.BooleanField()
    nombre_beca = models.CharField(max_length=255)
    tipo_vinculacion = models.BooleanField()
    huesped = models.BooleanField()
    id_ciudad = models.ForeignKey(Ciudad, models.DO_NOTHING, db_column='id_ciudad')

    class Meta:
        managed: True
        db_table = 'vinculacion_acad'

# MODELO DEL DEPARTAMENTO DE DESARROLLO ACADÉMICO (Tutorias tomadas por alumnos, realizada por profesores)
''' No mover la importación del modelo Profesor debido a que causa un error
por una importación circular'''

# Modelo en desarrollo // completar el registro de tutorias con archivos excel //
from profesores.models import Profesor
class DesarrolloAcademico(models.Model):
    id_desarrollo_academico = models.AutoField(primary_key=True)
    id_profesor = models.ForeignKey(Profesor, models.DO_NOTHING, db_column='id_profesor')
    id_estudiante = models.ForeignKey(Estudiante, models.DO_NOTHING, db_column='id_estudiante')
    motivo_tutoria = models.CharField()
    tipo_tutoria = models.BooleanField()
    fecha_inicio = models.DateField()
    fecha_final = models.DateField()