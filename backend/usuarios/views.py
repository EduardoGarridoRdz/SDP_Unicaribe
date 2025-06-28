from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import *
from profesores.models import Profesor, GradoAcademico, TipoProfesor
from estudiantes.models import ProgramaEducativo
from .serializers import UsuarioSerializer, TipoUsuarioSerializer, DepartamentoSerializer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import datetime
from django.conf import settings
import jwt

# Este archivo contiene todas las vistas de los modelos de usuarios.
class UsuarioViewSet(viewsets.ModelViewSet):
      queryset = Usuario.objects.all()
      serializer_class = UsuarioSerializer

class TipoUsuarioViewSet(viewsets.ModelViewSet):
      queryset = TipoUsuario.objects.all()
      serializer_class = TipoUsuarioSerializer

class DepartamentoViewSet(viewsets.ModelViewSet):
      queryset = Departamento.objects.all()
      serializer_class = DepartamentoSerializer

# Modelo para registrar un usuario
class RegistrarUsuarioViewSet(viewsets.ViewSet):
     def create(self, request):
      # Este método solo maneja peticiones tipo POST
      try:
            data = request.data
            # Comprueba que el correo no esté registrado
            if Usuario.objects.filter(correo=data['correo']).exists():
                 return Response(
                      {'status': 'error', 'message': 'El correo ya está registrado'},
                      status=status.HTTP_400_BAD_REQUEST
                )
            # Obtiene el usuario con los datos proporcionados sí ya existe
            usuario = Usuario.objects.filter(
                 nombre=data['nombre'],
                 apellido_pat=data['apellido_pat'],
                 apellido_mat=data['apellido_mat'],
                 correo=data['correo'],
                 id_tipo_usuario=TipoUsuario.objects.get(tipo=data['tipo_usuario']),
                 id_departamento=Departamento.objects.get(nombre_departamento=data['departamento'])
            ).exists()

            # Comprueba si el usuario existe
            if usuario:
                  return Response(
                       {'status': 'error', 'message': 'El usuario ya existe'},
                       status=status.HTTP_400_BAD_REQUEST
                  )
            # Sí no existe, registra la contraseña y posteriormente el usuario
            else:
                  contraseña = Contrasena.objects.create(
                        contrasena=data['contrasena']
                  )
                  
                  Usuario.objects.create(
                        nombre=data['nombre'],
                        apellido_pat=data['apellido_pat'],
                        apellido_mat=data['apellido_mat'],
                        correo=data['correo'],
                        id_contrasena=contraseña,
                        id_tipo_usuario=TipoUsuario.objects.get(tipo=data['tipo_usuario']),
                        id_departamento=Departamento.objects.get(nombre_departamento=data['departamento'])
                  )
                
                  usuario = Usuario.objects.get(
                        nombre=data['nombre'],
                        apellido_pat=data['apellido_pat'],
                        apellido_mat=data['apellido_mat'],
                        correo=data['correo'],
                        id_contrasena=contraseña,
                        id_tipo_usuario=TipoUsuario.objects.get(tipo=data['tipo_usuario']),
                        id_departamento=Departamento.objects.get(nombre_departamento=data['departamento'])
                  )

                  if(usuario.id_tipo_usuario.tipo == "Profesor"):
                        Profesor.objects.create(
                              id_usuario=usuario,
                              nombre=usuario.nombre,
                              apellido_pat=usuario.apellido_pat,
                              apellido_mat=usuario.apellido_mat,
                              correo=usuario.correo,
                              id_grado_academico=GradoAcademico.objects.get(grado_academico="Licenciatura"),
                              id_programa_educativo=ProgramaEducativo.objects.get(id_programa_educativo=1),
                              id_departamento=usuario.id_departamento,
                              jefe_departamento=False,
                              id_tipo_profesor = TipoProfesor.objects.get(id_tipo_profesor=1),
                              activo=True,
                              sexo=True
                        )

                  return Response(
                        {'status': 'success', 'message': 'Usuario registrado correctamente'},
                        status=status.HTTP_201_CREATED
                  )
      # Devuelve un error sí ocurrió una excepción durante el proceso
      except Exception as e:
            print(e)
            return Response(
                {'status': 'error', 'message': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Función para obtener los datos de un usuario a partir de su correo
@csrf_exempt
@api_view(['POST'])
def ObtenerUsuario(request): 
      try:
            datos = request.data            
            usuario = Usuario.objects.get(correo=datos['correo'])

            datos_usuario = {
                'nombre': usuario.nombre,
                'apellido_pat': usuario.apellido_pat,
                'apellido_mat': usuario.apellido_mat,
                'correo': usuario.correo,
                'contrasena': usuario.id_contrasena.contrasena,
                'tipo_usuario': usuario.id_tipo_usuario.tipo,
                'departamento': usuario.id_departamento.nombre_departamento,
                'activo': usuario.activo
            }

            return Response(
                {'status': 'success', 'data': datos_usuario, 'message': 'Usuario encontrado'},
                status=status.HTTP_200_OK
            )
        
      except Usuario.DoesNotExist:
            return Response(
                {'status': 'error', 'message': 'Usuario no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )
      except Exception as e:
            return Response(
                {'status': 'error', 'message': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
      
# Función para actualizar los datos del usuario
@csrf_exempt
@api_view(['POST'])
def EditarUsuario(request):
      try:
            datos = request.data
            
            usuario = Usuario.objects.get(
                 correo=datos['correo']
            )

            usuario.nombre = datos['nombre']
            usuario.apellido_pat = datos['apellido_pat']
            usuario.apellido_mat = datos['apellido_mat']
            contrasena = Contrasena.objects.get(id_contrasena = usuario.id_contrasena.id_contrasena)
            contrasena.contrasena = datos['contrasena']
            usuario.id_departamento = Departamento.objects.get(nombre_departamento = datos['departamento'])
            usuario.id_tipo_usuario = TipoUsuario.objects.get(tipo = datos['tipo_usuario'])

            contrasena.save()
            usuario.save()
      
            return Response(
                 {'status': 'success', 'message': 'Actualizado exitosamente'},
                 status=status.HTTP_200_OK
            )
      
      except Usuario.DoesNotExist:
            return Response(
                {'status': 'error', 'message': 'Usuario no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )
      except Exception as e:
          print(e)
          return Response(
               {'status': 'error', 'message': str(e)},
               status=status.HTTP_400_BAD_REQUEST
          )


@csrf_exempt
@api_view(['POST'])
def ValidarUsuario(request):
      try:

            datos = request.data
            
            usuario = Usuario.objects.get(correo=datos['correo'])            
            Contrasena.objects.get(
                 id_contrasena = usuario.id_contrasena.id_contrasena, 
                 contrasena = datos['contrasena'])
            
            rol = usuario.id_tipo_usuario.tipo

            if (datos['userToken'] == None):
                  token_payload = {
                       'user_id': usuario.id_usuario,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=3),
                        'iat': datetime.datetime.utcnow()  
                  }
                  
                  token = jwt.encode(token_payload, settings.SECRET_KEY, algorithm='HS256')
                  usuario.token = token
                  usuario.save()

            elif(usuario.token != datos['userToken']):
                  return Response(
                  {'status': 'error', 'message': 'Error inesperado'},
                  status=status.HTTP_404_NOT_FOUND
            )


            return Response(
                  {'status': 'success', 'sdp_userRole': rol, 'sdp_userToken': usuario.token, 'sdp_userId': usuario.id_usuario},
                  status=status.HTTP_200_OK
            )

      except Contrasena.DoesNotExist:
            return Response(
                {'status': 'error', 'message': 'Contraseña incorrecta'},
                status=status.HTTP_404_NOT_FOUND
            )


      except Usuario.DoesNotExist:
            return Response(
                {'status': 'error', 'message': 'Usuario incorrecto'},
                status=status.HTTP_404_NOT_FOUND
            )

      except Exception as e:
          return Response(
               {'status': 'error', 'message': str(e)},
               status=status.HTTP_400_BAD_REQUEST
          )