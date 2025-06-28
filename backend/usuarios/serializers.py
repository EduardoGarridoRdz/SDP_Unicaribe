from rest_framework import serializers
from .models import Usuario, Contrasena, TipoUsuario, Departamento

class UsuarioSerializer(serializers.ModelSerializer):
    contrasena = serializers.StringRelatedField(source='id_contrasena.contrasena')
    tipo_usuario = serializers.StringRelatedField(source='id_tipo_usuario.tipo')
    departamento = serializers.StringRelatedField(source='id_departamento.nombre_departamento')

    class Meta:
        model = Usuario
        fields = ['id_usuario','nombre', 'apellido_pat', 'apellido_mat', 'correo', 'contrasena', 'tipo_usuario', 'departamento']


class TipoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = ['tipo']

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departamento
        fields = ['nombre_departamento']   