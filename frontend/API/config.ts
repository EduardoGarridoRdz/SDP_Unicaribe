// Este archivo contiene la configuración de la API 
// Se reserva la dirección debido a reglas de suguridad
export const API_CONFIG = {
    BASE_URL: 'http://127.0.0.1:8000/api/',

    // RUTAS DE USUARIOS
    USUARIO_URL: 'usuario/usuario/',
    TIPO_USUARIO_URL: 'usuario/tipo_usuario/',
    DEPARTAMENTO_URL: 'usuario/departamento/',
    REGISTRAR_URL: 'usuario/registrar/',
    OBTENER_USUARIO: 'obtener_usuario/',
    EDITAR_USUARIO: 'editar_usuario/',
    VALIDAR_USUARIO_URL: 'validar_usuario/',

    // RUTAS DE PROFESORES
    PROFESOR_URL: 'profesor/profesor/DevolverProfesor/',
    GRADO_ACADEMICO_URL: 'profesor/grado_academico/',
    TIPO_PROFESOR_URL: 'profesor/tipo_profesor/',
    ESTUDIOS_PROFESOR_URL: 'profesor/estudios/DevolverEstudios/',
    ESTUDIOS_AÑADIR_URL: 'profesor/estudios/AñadirEstudios/',
    ACTUALIZAR_PROFESOR_URL: 'actualizar_profesor/',
    TIPO_CAPACITACION_URL: 'profesor/tipo_capacitacion/',
    PROFESOR_CAPACITACION_URL: 'profesor/capacitacion/RegistrarCapacitacion/',
    NIVEL_INVESTIGADOR_URL: 'profesor/nivel_investigador/',
    PERFIL_PRODEP_URL: 'profesor/perfil_prodep/',
    PERFIL_SEII_URL: 'profesor/perfil_seii/',
    PERFIL_SNII_URL: 'profesor/perfil_snii/',

    // RUTAS DE ESTUDIANTES
    PROGRAMA_EDUCATIVO: "estudiante/programa_educativo/",

}