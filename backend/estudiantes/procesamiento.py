from django.http import HttpResponse
import pandas as pd
import json
from django.views.decorators.csrf import csrf_exempt
from .models import *
from profesores.models import Profesor

'''Este archivo se realizó aparte de las views, debido a que es demasiado extenso y 
sirve para procesar los documentos de excel envíados desde el frontend'''

# Nombres de los archivo que el sistema acepta
Departamentos = ["ServiciosEscolares.xlsx", "PracticasProfesionales.xlsx",
                 "ServicioSocial.xlsx", "DesarrolloEstudiantil.xlsx",
                 "DesarrolloAdemico.xlsx", "VinculacionAcademica.xlsx",
                 "Idiomas.xlsx", "Tutoria.xlsx"]

@csrf_exempt
def RecibirArchivo(request):
    if request.method == 'POST':
        try:
            # Recibir el archivo del frontend
            Archivo = request.FILES['archivo']
            # Verifica sí el archivo es de tipo Excel, en caso contrario devuelve un mensaje
            if Archivo.content_type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                # Verifica si el nombre del archivo coincide con el nombre de los Departamentos
                # En caso contrario devuelve un mensaje
                if Archivo.name in Departamentos:
                    # Lee el archivo como objeto panda a partir de la fila nueve
                    #skiprows=0
                    Data = pd.read_excel(Archivo, skiprows=9, dtype={'matricula': str})
                    # Abrir la función de acuerdo al nombre del Archivo    
                    Matriculas = Menu(Archivo.name, Data)
                    
                    # En caso de que no haya matrículas erroneas y el procesamiento haya sido correcto,
                    # se le devuelve un mensaje informando al usuario
                    if Matriculas[0] == True:
                        return HttpResponse(
                            json.dumps({'status': 'success', 'message': 'Archivo recibido y procesado correctamente.'}),
                            content_type='application/json'
                        )
                    # En caso contrario, se le indica que matrículas son erroneas
                    else:
                        return HttpResponse(
                        json.dumps({'status': 'error', 'message': f'Revisar la siguientes matriculas inexistentes: {Matriculas[1]}'}),
                        content_type='application/json'
                        )
                # Si el nombre no es el correcto, se le informa al usuario
                else:
                    return HttpResponse(
                        json.dumps({'status': 'error', 'message': f'Nombre {Archivo.name} no es valido, se esperaba alguno de los siguientes nombres: {Departamentos}\n'}),
                        content_type='application/json',
                        status=400
                    )
            # En caso de se seleccione un archivo que no sea excel, se le informa al usuario
            else:
                return HttpResponse(
                    json.dumps({'status': 'error', 'message': 'Tipo de archivo no valido'}),
                    content_type='application/json',
                    status=400
                )
            
        except Exception as e:
            # En caso de haber un error al recibir o procesar el archivo, devuelve un mensaje indicandolo
            print(e)
            return HttpResponse(
                json.dumps({'status': 'error', 'message': f'Error al procesar el archivo en el siguiente campo: {str(e)}'}),
                content_type='application/json',
                status=400
            )
    # Si alguién consulta la API con un método diferente al POST, se le indica (Poco probable, pero mantenerlo así por razones de seguridad)
    else:
        return HttpResponse(
            json.dumps({'status': 'error', 'message': 'Método no permitido.'}),
            content_type='application/json',
            status=405
        )

"""Función que abre la función necesaria para procesar el archivo de acuerdo al nombre
INPUT: Nombre del archivo, Datos que se deben proceasr
OUTPUT: No returna ningún valor"""
def Menu(Nombre, Datos):
    Matriculas = []

    if Nombre == Departamentos[0]:
        ProcesarEstudiante(Datos)
        return True, Matriculas
    else:
        Matriculas = ComprobarEstudiante(Datos)
        if len(Matriculas) == 0:
            if Nombre == Departamentos[1]:
                ProcesarPracticas(Datos)
                return True, Matriculas
            elif Nombre == Departamentos[2]:
                ProcesarServicio(Datos)
                return True, Matriculas
            elif Nombre == Departamentos[3]:
                ProcesarTaller(Datos)
                return True, Matriculas
            elif Nombre == Departamentos[4]:
                return True, Matriculas
            elif Nombre == Departamentos[5]:
                ProcesarVinculacion(Datos)
                return True, Matriculas
            elif Nombre == Departamentos[6]:
                ProcesarIdioma(Datos)
                return True, Matriculas
            '''elif Nombre == Departamentos[7]:
                ProcesarTutoria(Datos)
                return True, Matriculas '''
        else:
            return False, Matriculas

"""Función que transforma variables categóricas a binarias
INPUT: Dato de una columna con valor categórico, Valor que se espera comparar
OUTPUT: Retorna veradero en caso de ser igual al valor esperado, en caso contrario falso"""
def TransformarBool(Variable, Valor):
    if Variable == Valor:
        return True
    return False

"""Función que comprueba que existe un estudiante registrado en la tabla de estudiantes
INPUT: Datos del archivo excel
OUTPUT: Una lista con las mátriculas que no están registradas """
def ComprobarEstudiante(Datos):
    MatriculasErroneas = []

    for index, row in Datos.iterrows():
        try:
            Estudiante.objects.get(matricula = row['matricula'])
            pass
        except Estudiante.DoesNotExist:
            MatriculasErroneas.append(row['matricula'])
    
    return MatriculasErroneas

"""Función que procesa el archivo de Servicios Escolares y añade estudiantes a la base de datos
o actualiza toda su información en caso de estar registrado
INPUT: Dataframe que contiene todos los datos del archivo de Servicios Escoalres
OUTPUT: Ningun valor, solo añade nuevos estudiantes"""
def ProcesarEstudiante(Datos):
    for index, row in Datos.iterrows():
        try:
            estudiante = Estudiante.objects.get(matricula = row['matricula'])
            estudiante.nombre = row['estudiante']
            estudiante.curp = row['curp']
            estudiante.direccion = row['direccion']
            estudiante.email_personal = row['email_personal']
            estudiante.telefono = str(int(row['telefono']))
            estudiante.iems_procedencia = row['bach_nombre']
            estudiante.generacion = row['generacion']
            estudiante.id_tipo_ingreso = TipoIngreso.objects.get(ingreso = row['tipo_ingreso'])
            estudiante.fecha_ingreso = row['fecha_ingreso']
            estudiante.discapacidad = TransformarBool(row['discapacidad'], "Si")
            estudiante.nombre_discapacidad = row['nombre_discapacidad']
            estudiante.id_pro_edu = ProgramaEducativo.objects.get(programa_educativo = row['programa'])
            estudiante.id_situacion = Situacion.objects.get(situacion = row['situacion'])
            estudiante.motivo_situacion = row['motivo_situacion']
            estudiante.id_estatus = Estatus.objects.get(estatus = row['estado'])
            estudiante.beca = TransformarBool(row['beca'], "Si")
            estudiante.tipo_beca = row['tipo_beca']
            estudiante.creditos = row['creditos']
            estudiante.derecho_servicio_social = TransformarBool(row['derecho_servicio'], "Si")
            estudiante.fecha_nac = row['fecha_nacimiento']
            estudiante.sexo = TransformarBool(row['sexo'], "M")
            estudiante.hablante_indigena = TransformarBool(row['hablante_lengua'], "Si")
            estudiante.nombre_lengua = row['lengua']
            estudiante.promedio = row['promedio']
            estudiante.titulado = TransformarBool(row['titulado'], "Si")
 
        except Estudiante.DoesNotExist:
            estudiante = Estudiante(
                matricula = row['matricula'],
                nombre = row['estudiante'],
                curp = row['curp'],
                direccion = row['direccion'],
                email_personal = row['email_personal'],
                telefono = row['telefono'],
                iems_procedencia = row['bach_nombre'],
                generacion = row['generacion'],
                id_tipo_ingreso = TipoIngreso.objects.get(ingreso = row['tipo_ingreso']),
                fecha_ingreso = row['fecha_ingreso'],
                discapacidad = TransformarBool(row['discapacidad'], "Si"),
                nombre_discapacidad = row['nombre_discapacidad'],
                id_pro_edu = ProgramaEducativo.objects.get(programa_educativo = row['programa']),
                id_situacion = Situacion.objects.get(situacion = row['situacion']),
                motivo_situacion = row['motivo_situacion'],
                id_estatus = Estatus.objects.get(estatus = row['estado']),
                beca = TransformarBool(row['beca'], "Si"),
                tipo_beca = row['tipo_beca'],
                creditos = row['creditos'],
                derecho_servicio_social = TransformarBool(row['derecho_servicio'], "Si"),
                fecha_nac = row['fecha_nacimiento'],
                sexo = TransformarBool(row['sexo'], "M"),
                hablante_indigena = TransformarBool(row['hablante_lengua'], "Si"),
                nombre_lengua = row['lengua'],
                promedio = row['promedio'],
                titulado = TransformarBool(row['titulado'], "Si")
            )
    
        estudiante.save()
        HistorialSituacion.objects.get_or_create(
            id_estudiante = Estudiante.objects.get(id_estudiante = estudiante.id_estudiante),
            id_situacion = Situacion.objects.get(situacion = row['situacion']),
            fecha_situacion = row['fecha_situacion']
        )

        HistorialEstatus.objects.get_or_create(
            id_estudiante = Estudiante.objects.get(id_estudiante = estudiante.id_estudiante),
            id_estatus = Estatus.objects.get(estatus = row['estado']),
            fecha_estatus = row['fecha_estado']                
        )

            

"""Función que procesa el archivo de Desarrollo Estudiantil y añade los talleres que cursa cada 
estudiante a lo largo de su estancia en la universidad.
INPUT: Dataframe que contiene todos los datos del archivo de Desarrollo Estudiantil
OUTPUT: Ningun valor, solo añade los talleres"""        
def ProcesarTaller(Datos):
    for index, row in Datos.iterrows():
        print(row['nombre_taller'])
        tallerComprobacion = Taller.objects.filter(
            id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
            tipo_taller = TransformarBool(row['tipo_taller'], "Artístico y Cultural"),
            id_nombre_taller = NombreTaller.objects.get(nombre = row['nombre_taller']),
            representante = TransformarBool(row['representativo'], "Si"),
            selectivo = TransformarBool(row['selectivo'], "Si"),
            acreditado = TransformarBool(row['acreditado'], "Si"),
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final'],
            club = row['club']
        ).exists()

        if not tallerComprobacion:
            taller = Taller(
            id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
            tipo_taller = TransformarBool(row['tipo_taller'], "Artístico y Cultural"),
            id_nombre_taller = NombreTaller.objects.get(nombre = row['nombre_taller']),
            representante = TransformarBool(row['representativo'], "Si"),
            selectivo = TransformarBool(row['selectivo'], "Si"),
            acreditado = TransformarBool(row['acreditado'], "Si"),
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final'],
            club = row['club']
            )
            taller.save()


"""Función que procesa el archivo de Idiomas y añade el idioma que cursa el estudiante a lo largo
de su trayectoria universitaria.
INPUT: Dataframe que contiene todos los datos del archivo de Idiomas
OUTPUT: Ningun valor, solo añade los idiomas"""        
def ProcesarIdioma(Datos):
    for index, row in Datos.iterrows():

        idiomaComprobacion = Idioma.objects.filter(
            estudiante = Estudiante.objects.get(matricula = row['matricula']),
            idioma = row['idioma'],
            nivel = row['nivel'],
            acreditado = TransformarBool(row['acreditado'], "Si"),
            certificacion = row['certificacion'],
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final']
        ).exists()

        if not idiomaComprobacion:
            idioma = Idioma(
                estudiante = Estudiante.objects.get(matricula = row['matricula']),
                idioma = row['idioma'],
                nivel = row['nivel'],
                acreditado = TransformarBool(row['acreditado'], "Si"),
                certificacion = row['certificacion'],
                fecha_inicio = row['fecha_inicio'],
                fecha_final = row['fecha_final']
            )
            idioma.save()


def ProcesarServicio(Datos):
    for index, row in Datos.iterrows():

        servicioSocialComprobacion = ServicioSocial.objects.filter(
            id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
            id_estado = EstadoServicio.objects.get(estado = row['estado']),
            tipo_proyecto = TransformarBool(row['tipo_proyecto'], "Interno"),
            clase_proyecto = row['clase_proyecto'],
            nombre_proyecto = row['nombre_proyecto'],
            beneficiarios = row['beneficiarios'],
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final']
        ).exists()
        
        if not servicioSocialComprobacion:
            servicioSocial = ServicioSocial(
            id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
            id_estado = EstadoServicio.objects.get(estado = row['estado']),
            tipo_proyecto = TransformarBool(row['tipo_proyecto'], "Interno"),
            clase_proyecto = row['clase_proyecto'],
            nombre_proyecto = row['nombre_proyecto'],
            beneficiarios = row['beneficiarios'],
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final']
        )
            servicioSocial.save()
        

def ProcesarPracticas(Datos):
    for index, row in Datos.iterrows():
        
        PracticaProf.objects.get_or_create(
            id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
            num_practica = row['numero_practica'],
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final'],
            empresa = row['empresa'],
            telefon_empresa = row['telefono_empresa'],
            contratado = TransformarBool(row['contratado'], "Si")
        )

def ProcesarVinculacion(Datos):
    for index, row in Datos.iterrows():

        vinculacionComprobacion = MovilidadAcad.objects.filter(
            id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
            institucion = row['institucion'],
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final'],
            acreditado = TransformarBool(row['acreditado'], "Si"),
            beca = TransformarBool(row['beca'], "Si"),
            nombre_beca = row['nombre_beca'],
            tipo_vinculacion = TransformarBool(row['tipo_vinculacion'], "Nacional"),
            huesped = TransformarBool(row['huesped'], "Si"),
            id_ciudad = comprobarCiudad(row['ciudad'], row['estado'], row['pais'])
        ).exists()

        if not vinculacionComprobacion:
            vinculacion = MovilidadAcad(
                id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
                institucion = row['institucion'],
                fecha_inicio = row['fecha_inicio'],
                fecha_final = row['fecha_final'],
                acreditado = TransformarBool(row['acreditado'], "Si"),
                beca = TransformarBool(row['beca'], "Si"),
                nombre_beca = row['nombre_beca'],
                tipo_vinculacion = TransformarBool(row['tipo_vinculacion'], "Nacional"),
                huesped = TransformarBool(row['huesped'], "Si"),
                id_ciudad = comprobarCiudad(row['ciudad'], row['estado'], row['pais'])
            ) 

            vinculacion.save()

def comprobarCiudad(city, estate, country):

    try:
        ciudad = Ciudad.objects.get(nombre_ciudad = city)
        
    except Ciudad.DoesNotExist:
        
        try:
            estado = Estado.objects.get(nombre_estado = estate)
            pais = Pais.objects.get(nombre_pais = country)
            
            ciudad = Ciudad(
                id_estado = estado,
                id_pais = pais,
                nombre_ciudad = city
            )

            ciudad.save()
        
        except Estado.DoesNotExist:
            
            try:
                pais = Pais.objects.get(nombre_pais = country)

                estado = Estado(
                    nombre_estado = estate
                )

                estado.save()

                ciudad = Ciudad(
                    id_estado = estado,
                    id_pais = pais,
                    nombre_ciudad = city
                )

                ciudad.save()

            except:
                
                pais = Pais(
                    nombre_pais = country
                )

                pais.save()

                estado = Estado(
                    nombre_estado = estate
                )

                estado.save()

                ciudad = Ciudad(
                    id_estado = estado,
                    id_pais = pais,
                    nombre_ciudad = city
                )

                ciudad.save()                

    return ciudad

# El procesamiento de tutorias queda pendiente debido al desarrollo
# del formulario de profesores y su conexión con la tabla de tutorias
'''
def ProcesarTutoria(Datos):
    for index, row in Datos.iterrows():

        print(row['profesor'])        
        tutoriaComprobacion = Tutoria.objects.filter(
            tipo_tutoria = TransformarBool(row['tipo_tutoria'], "Individual"),
            id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
            motivo_tutoria = row['motivo'],
            fecha_inicio = row['fecha_inicio'],
            fecha_final = row['fecha_final']
        ).exists()

        if not tutoriaComprobacion:
            tutoria = Tutoria(
                tipo_tutoria = TransformarBool(row['tipo_tutoria'], "Individual"),
                id_profesor = Profesor.objects.get(id_profesor = row['profesor']),
                id_estudiante = Estudiante.objects.get(matricula = row['matricula']),
                motivo_tutoria = row['motivo'],
                fecha_inicio = row['fecha_inicio'],
                fecha_final = row['fecha_final']
            )
            
            tutoria.save()
'''