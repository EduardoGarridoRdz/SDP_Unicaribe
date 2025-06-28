from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from datetime import datetime

# VIEWS CON LA INFORMACIÓN PERSONAL DE LOS PROFESORES
# View grado académico de los profesores
class GradoAcademicoViewSet(viewsets.ModelViewSet):
    queryset = GradoAcademico.objects.all()
    serializer_class = GradoAcademicoSerializer

# View tipo de profesor (Tiempo completo, Pago por asignatura, etc.))
class TipoProfesorViewSet(viewsets.ModelViewSet):
    queryset = TipoProfesor.objects.all()
    serializer_class = TipoProfesorSerializer

# View para los profesores
class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer

    # Esta función devuelve los datos personales del profesor
    @action(detail=False, methods=['GET', 'POST'])
    def DevolverProfesor(self, request):
        try:
            # Obtiene los datos del profesor de la base de datos mediante el correo
            profesor = Profesor.objects.get(id_usuario=request.data)
            # Devuelve los datos de acuerdo al serializador del profesor
            serializer = self.get_serializer(profesor)
            # Se responde al frontend con los datos obtenidos
            return Response({
                'status': 'success', 
                'data': serializer.data
            })
        
        # Si el profesor no existe, se le indica que verifique los datos
        # Es poco posible que suceda, debido a que el dato central es el correo
        except Profesor.DoesNotExist:
            return Response({'status': 'error', 'message': 'Error al obtener profesor'})
        
        # Ante cualquier error se devuelve un mensaje al frontend indicandolo
        except Exception as e:
            return Response(
                {'status': 'error', 'message': 'Error al cargar los datos'},
            )

# VIEWS DE LOS ESTUDIOS DE LOS PROFESORES
# View para los estudios de grado de los profesores
class EstudiosViewSet(viewsets.ModelViewSet):    
    queryset = Estudios.objects.all()
    serializer_class = EstudiosSerializer

    @action(detail=False, methods=['POST'])
    def DevolverEstudios(self, request):
        try:
            profesor = Profesor.objects.get(id_usuario=request.data)
            estudios = Estudios.objects.get(id_profesor=profesor.id_profesor)
            serializer = self.get_serializer(estudios)
            return Response({'status': 'success', 'data': serializer.data})

        except Estudios.DoesNotExist:
            return Response({
                'status': 'success', 
                'data': False
                })
        
        except Exception as e:
            return Response({
                'status': 'error', 
                'message': f'Error al cargar los datos {str(e)}' 
                }, status=500)
    
    @action(detail=False, methods=['POST'])
    def AñadirEstudios(self, request):
        try:
            print(request.data)
            profesor = Profesor.objects.get(id_usuario=request.data['id_usuario'])
            estudios = Estudios.objects.get(id_profesor=profesor.id_profesor)
            
            estudios.grado_actual = request.data['grado_actual']
            estudios.grado_estudiando = request.data['grado_estudiando']
            estudios.fecha_inicio = datetime.strptime(request.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%S.%fZ").date()
            estudios.fecha_final = datetime.strptime(request.data['fecha_finalizacion'], "%Y-%m-%dT%H:%M:%S.%fZ").date()
            estudios.nombre_institucion = request.data['nombre_institucion']
            estudios.save()

            return Response({'status': 'success', 'message': 'Estudios actualizados exitosamente'})


        except Estudios.DoesNotExist:
            Estudios.objects.create(
                id_profesor=profesor,
                grado_actual=request.data['grado_actual'],
                grado_estudiando=request.data['grado_estudiando'],
                fecha_inicio=datetime.strptime(request.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%S.%fZ").date(),
                fecha_final=datetime.strptime(request.data['fecha_finalizacion'], "%Y-%m-%dT%H:%M:%S.%fZ").date(),
                nombre_institucion=request.data['nombre_institucion']
            )

            return Response({'status': 'success', 'message': 'Estudios añadidos exitosamente'})

        except Exception as e:
            return Response({
                'status': 'error', 
                'message': f'Error al añadir los datos {str(e)}' 
                }, status=500)


# View del tipo de capacitación
class TipoCapacitacionViewSet(viewsets.ModelViewSet):    
    queryset = TipoCapacitacion.objects.all()
    serializer_class = TipoCapacitacionSerializer

# View de la capacitación de los profesores
class CapacitacionViewSet(viewsets.ModelViewSet):    
    queryset = Capacitacion.objects.all()
    serializer_class = CapacitacionSerializer

    @action(detail=False, methods=['POST'])
    def RegistrarCapacitacion(self, request):
        try:
            profesor = Profesor.objects.get(id_usuario=request.data['id_usuario'])
            Capacitacion.objects.create(
                id_profesor = profesor,
                id_tipo_capacitacion = TipoCapacitacion.objects.get(tipo_capacitacion=request.data['tipo_capacitacion']), 
                evento = request.data['nombre_evento'],
                sede = request.data['sede'],
                organizador = request.data['organizador'],
                fecha_inicio = datetime.strptime(request.data['fecha_inicio'], "%Y-%m-%dT%H:%M:%S.%fZ").date(),
                fecha_final = datetime.strptime(request.data['fecha_finalizacion'], "%Y-%m-%dT%H:%M:%S.%fZ").date()
            )

            return Response({'status': 'success', 'message': 'Capacitación registrada exitosamente'}) 
        
        except Exception as e:
            print(e)
            return Response({
                'status': 'error', 
                'message': f'Error al registrar capacitación {str(e)}' 
                }, status=500)

# View de las actividades de los profesores inactivos
class ActividadInactivoViewSet(viewsets.ModelViewSet):    
    queryset = ActividadInactivo.objects.all()
    serializer_class = ActividadInactivoSerializer


# VIEWS DE LOS PRODUCTOS DE INVESTIGACIÓN DE LOS PROFESORES
# View de las estancias de los profesores
class TipoEstanciaViewSet(viewsets.ModelViewSet):
    queryset = TipoEstancia.objects.all()
    serializer_class = TipoEstanciaSerializer

# View de la estancia
class EstanciaViewSet(viewsets.ModelViewSet):
    queryset = Estancia.objects.all()
    serializer_class = EstanciaSerializer
        
# View de la estancia del profesor
class ProfesorEstanciaViewSet(viewsets.ModelViewSet):
    queryset = ProfesorEstancia.objects.all()
    serializer_class = ProfesorEstanciaSerializer


# Views para los eventos académicos que realizan los profesores
# View del tipo de evento
class TipoEventoViewSet(viewsets.ModelViewSet):
        queryset = TipoEvento.objects.all()
        serializer_class = TipoEventoSerializer

# View de la subcategoría del evento
class EventoSubcategoriaViewSet(viewsets.ModelViewSet):
        queryset = EventoSubcategoria.objects.all()
        serializer_class = EventoSubcategoriaSerializer

# View del evento académico
class EventoAcademicoViewSet(viewsets.ModelViewSet):
        queryset = EventoAcademico.objects.all()
        serializer_class = EventoAcademicoSerializer


# Views para las investigaciones de los profesores
# View del tipo de producto de investigación
class TipoProductoViewSet(viewsets.ModelViewSet):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer

# View de la investigación
class InvestigacionViewSet(viewsets.ModelViewSet):
    queryset = Investigacion.objects.all()
    serializer_class = InvestigacionSerializer

# View de la investigación del profesor
class ProfesorInvestigacionViewSet(viewsets.ModelViewSet):
    queryset = ProfesorInvestigacion.objects.all()
    serializer_class = ProfesorInvestigacionSerializer


# Views para las asesorias que dan los profesores
# View del grado de asesoría (Licenciatura, Maestría, Doctorado)
class GradoAsesoriaViewSet(viewsets.ModelViewSet):
    queryset = GradoAsesoria.objects.all()
    serializer_class = GradoAsesoriaSerializer

# View de las fases del proyecto (Iniciado, Desarrollo, Finalizado)
class FaseProyectoViewSet(viewsets.ModelViewSet):
    queryset = FaseProyecto.objects.all()
    serializer_class = FaseProyectoSerializer

# View de las asesorías que dan los profesores
class AsesoriaViewSet(viewsets.ModelViewSet):
    queryset = Asesoria.objects.all()
    serializer_class = AsesoriaExterna

# View de las asesorías externas
class AsesoriaExternaViewSet(viewsets.ModelViewSet):
    queryset = AsesoriaExterna.objects.all()
    serializer_class = AsesoriaExternaSerializer

# View de las asesorías internas (Dentro de la Universidad del Caribe)
class AsesoriaInternaViewSet(viewsets.ModelViewSet):
    queryset = AsesoriaInterna.objects.all()
    serializer_class = AsesoriaInternaSerializer


# Views de los proyectos que realizan los profesores
# View del tipo de proyecto
class TipoProyectoViewSet(viewsets.ModelViewSet):
    queryset = TipoProyecto.objects.all()
    serializer_class = TipoProyectoSerializer

# View del proyecto
class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer
    
# View de los proyectos realizados por los profesores
class ProfesorProyectoViewSet(viewsets.ModelViewSet):
    queryset = ProfesorProyecto.objects.all()
    serializer_class = ProfesorProyectoSerializer


# Views de las excursiones que realizan los profesores
# View de la asignatura de la excursión
class AsignaturaViewSet(viewsets.ModelViewSet):
    queryset = Asignatura.objects.all()
    serializer_class = AsignaturaSerializer

# View de la excursión
class ExcursionViewSet(viewsets.ModelViewSet):
    queryset = Excursion.objects.all()
    serializer_class = ExcursionSerializer


# VIEW DEL DEPARTAMENTO DE DESARROLLO ACADÉMICO
# View de la tutoría que los profesores realizan a los estudiantes
class TutoriaViewSet(viewsets.ModelViewSet):
    queryset = Tutoria.objects.all()
    serializer_class = TutoriaSerializer


# VIEWS PARA EL PERFIL DE INVESTIGADOR DE LOS PROFESORES
class PerfilProdepViewSet(viewsets.ModelViewSet):
    queryset = PerfilProdep.objects.all()
    serializer_class = PerfilProdepSerializer

    @action(detail=False, methods=['POST'])
    def DevolverPerfilProdep(self, request):
        try:
            profesor = Profesor.objects.get(id_usuario=request.data)
            perfilProdep = PerfilProdep.objects.get(id_profesor=profesor.id_profesor)
            serializer = self.get_serializer(perfilProdep)

            return Response({'status': 'success', 'data': serializer.data})

        except PerfilProdep.DoesNotExist:
            return Response({
                'status': 'success', 
                'data': False
                })
        
        except Exception as e:
            return Response({
                'status': 'error', 
                'message': f'Error al cargar los datos {str(e)}' 
                }, status=500)
        
    @action(detail=False, methods=['POST'])
    def ActualizarPerfilProdep(self, request):
        print(request.data)
        try:
            profesor = Profesor.objects.get(id_usuario=request.data['id_usuario'])
            # Sí ya existe un perfil PRODEP asociado a un profesor lo actualiza
            perfilProdep = PerfilProdep.objects.get(id_profesor=profesor.id_profesor)

            perfilProdep.pertenece_prodep = request.data['pertenece_prodep']

            perfilProdep.vigencia_prodep = request.data['vigencia_prodep']
            perfilProdep.save()     

            return Response({'status': 'success', 'message': 'Perfil actualizado exitosamente'})

        # En caso de que no exista un perfil, lo crea
        except PerfilProdep.DoesNotExist:
            PerfilProdep.objects.create(
                id_profesor = profesor,
                pertenece_prodep = request.data['pertenece_prodep'],
                vigencia_prodep = request.data['vigencia_prodep']
            )

            return Response({'status': 'success', 'message': 'Perfil añadido exitosamente'})

        except Exception as e:
            return Response({
                'status': 'error', 
                'message': f'Error al cargar los datos {str(e)}' 
                }, status=500)
            

class NivelInvestigadorViewSet(viewsets.ModelViewSet):
    queryset = NivelInvestigador.objects.all()
    serializer_class = NivelInvestigadorSerializer

class PerfilSniiViewSet(viewsets.ModelViewSet):
    queryset = PerfilSnii.objects.all()
    serializer_class = PerfilSniiSerializer

    @action(detail=False, methods=['POST'])
    def DevolverPerfilSnii(self, request):
        try:
            profesor = Profesor.objects.get(id_usuario=request.data)
            perfilSnii = PerfilSnii.objects.get(id_profesor=profesor.id_profesor)
            serializer = self.get_serializer(perfilSnii)

            return Response({'status': 'success', 'data': serializer.data})

        except PerfilSnii.DoesNotExist:
            return Response({
                'status': 'success', 
                'data': False
                })
        
        except Exception as e:
            print(e)
            return Response({
                'status': 'error', 
                'message': f'Error al cargar los datos' 
                }, status=500)
        
    @action(detail=False, methods=['POST'])
    def ActualizarPerfilSnii(self, request):
        print(request.data)
        try:
            profesor = Profesor.objects.get(id_usuario=request.data['id_usuario'])
            # Sí ya existe un perfil PRODEP asociado a un profesor lo actualiza
            perfilSnii = PerfilSnii.objects.get(id_profesor=profesor.id_profesor)

            perfilSnii.pertenece_snii = request.data['pertenece_snii']
            perfilSnii.id_nivel = NivelInvestigador.objects.get(nivel_investigador=request.data['id_nivel'])
            perfilSnii.vigencia_snii = request.data['vigencia_snii']
            perfilSnii.save()     

            return Response({'status': 'success', 'message': 'Perfil actualizado exitosamente'})

        # En caso de que no exista un perfil, lo crea
        except PerfilSnii.DoesNotExist:
            PerfilSnii.objects.create(
                id_profesor = profesor,
                pertenece_snii = request.data['pertenece_snii'],
                vigencia_snii = request.data['vigencia_snii'],
                id_nivel = NivelInvestigador.objects.get(nivel_investigador=request.data['id_nivel'])
            )

            return Response({'status': 'success', 'message': 'Perfil añadido exitosamente'})

        except Exception as e:
            return Response({
                'status': 'error', 
                'message': f'Error al cargar los datos {str(e)}' 
                }, status=500)

    
class PerfilSeiiViewSet(viewsets.ModelViewSet):
    queryset = PerfilSeii.objects.all()
    serializer_class = PerfilSeiiSerializer

    @action(detail=False, methods=['POST'])
    def DevolverPerfilSeii(self, request):
        try:
            profesor = Profesor.objects.get(id_usuario=request.data)
            perfilSeii = PerfilSeii.objects.get(id_profesor=profesor.id_profesor)
            serializer = self.get_serializer(perfilSeii)

            return Response({'status': 'success', 'data': serializer.data})

        except PerfilSeii.DoesNotExist:
            return Response({
                'status': 'success', 
                'data': False
                })
        
        except Exception as e:
            return Response({
                'status': 'error', 
                'message': f'Error al cargar los datos {str(e)}' 
                }, status=500)
        
    @action(detail=False, methods=['POST'])
    def ActualizarPerfilSeii(self, request):
        print(request.data)
        try:
            profesor = Profesor.objects.get(id_usuario=request.data['id_usuario'])
            # Sí ya existe un perfil PRODEP asociado a un profesor lo actualiza
            perfilSeii = PerfilSeii.objects.get(id_profesor=profesor.id_profesor)

            perfilSeii.pertenece_seii = request.data['pertenece_seii']
            perfilSeii.id_nivel = NivelInvestigador.objects.get(nivel_investigador=request.data['id_nivel'])
            perfilSeii.vigencia_seii = request.data['vigencia_seii']
            perfilSeii.save()     

            return Response({'status': 'success', 'message': 'Perfil actualizado exitosamente'})

        # En caso de que no exista un perfil, lo crea
        except PerfilSeii.DoesNotExist:
            PerfilSeii.objects.create(
                id_profesor = profesor,
                pertenece_seii = request.data['pertenece_seii'],
                vigencia_seii = request.data['vigencia_seii'],
                id_nivel = NivelInvestigador.objects.get(nivel_investigador=request.data['id_nivel'])
            )

            return Response({'status': 'success', 'message': 'Perfil añadido exitosamente'})

        except Exception as e:
            return Response({
                'status': 'error', 
                'message': f'Error al cargar los datos' 
                }, status=500)


# VIEW PARA ACTUALIZAR INFORMACIÓN DEL PROFESOR
@csrf_exempt
@api_view(['POST'])
def ActualizarProfesor(request):
    try:
        # Se reciben los datos del frontend
        datos = request.data
        # Se busca al profesor asociado al correo
        profesor = Profesor.objects.get(
            correo=datos['correo'] 
        )
        # Se actualizan los datos del profesor
        # Campos String
        profesor.nombre = datos['nombre']
        profesor.apellido_pat = datos['apellido_pat']
        profesor.apellido_mat = datos['apellido_mat']
        # Campos booleanos
        if datos['sexo'] == 'false':
            profesor.sexo = False
        else:
            profesor.sexo = True
        # Llaves foráneas
        profesor.id_grado_academico = GradoAcademico.objects.get(grado_academico=datos['grado_academico'])
        profesor.id_tipo_profesor = TipoProfesor.objects.get(tipo_profesor=datos['tipo_profesor'])
        profesor.id_departamento = Departamento.objects.get(nombre_departamento = datos['departamento'])
        profesor.id_programa_educativo = ProgramaEducativo.objects.get(programa_educativo = datos['programa_educativo'])
        profesor.save()

        # Se actualiza también la información a su usuario
        usuario = Usuario.objects.get(
            correo=datos['correo']
        )
        # Campos string
        usuario.nombre = datos['nombre']
        usuario.apellido_pat = datos['apellido_pat']
        usuario.apellido_mat = datos['apellido_mat']
        # Llaves foráneas
        usuario.id_departamento =  Departamento.objects.get(nombre_departamento = datos['departamento'])
        usuario.save()
        # Se devuelve la respuesta indicando que se actualizaron los datos
        return Response(
                 {'status': 'success', 'message': 'Tus datos han sido actualizados'},
                 status=status.HTTP_200_OK
        )
    
    # Si el profesor no existe, se le indica que verifique los datos
    # Es poco posible que suceda, debido a que el dato central es el correo
    except Profesor.DoesNotExist:
        return Response(
            {'status': 'error', 'message': 'Verifique los datos'},
            status=status.HTTP_400_BAD_REQUEST
        )
    # Ante cualquier error se devuelve un mensaje al frontend indicandolo
    except Exception as e:
        return Response(
            {'status': 'error', 'message': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )