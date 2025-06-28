from django.db import models

# Este archivo contiene todos los modelos de los usuarios

# MODELOS PARA LA CONTRASEÑA, TIPO DE USUARIO Y DEPARTAMENTO
# Modelo para la tabla de contraseñas
class Contrasena(models.Model):
    id_contrasena = models.AutoField(primary_key=True)
    contrasena = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'contrasena'

# Modelo para los tres tipos de usuario
class TipoUsuario(models.Model):
    id_tipo_usuario = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'tipo_usuario'

# Modelos para los diferentes departamentos de la universidad
class Departamento(models.Model):
    id_departamento = models.AutoField(primary_key=True)
    nombre_departamento = models.CharField(max_length=255)

    class Meta:
        managed: True
        db_table = 'departamento'

# MODELO PARA LOS USUARIOS
class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    apellido_pat = models.CharField(max_length=30)
    apellido_mat = models.CharField(max_length=30)
    correo = models.CharField(max_length=40)
    id_contrasena = models.ForeignKey(Contrasena, models.DO_NOTHING, db_column='id_contrasena')
    id_tipo_usuario = models.ForeignKey(TipoUsuario, models.DO_NOTHING, db_column='id_tipo_usuario')
    id_departamento = models.ForeignKey(Departamento, models.DO_NOTHING, db_column='id_departamento')
    activo = models.BooleanField(default=True)
    token = models.TextField()

    class Meta:
        managed: True
        db_table = 'usuario'