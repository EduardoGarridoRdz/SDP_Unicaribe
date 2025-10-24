SELECT e.matricula,
	   e.nombre,
	   e.curp,
	   e.direccion,
	   e.email_personal,
	   e.telefono,
	   e.iems_procedencia,
	   e.generacion,
	   e.fecha_ingreso,
	   CASE 
	      WHEN e.sexo = true THEN 'Hombre'
		  WHEN e.sexo = false THEN 'Mujer'
	   END AS sexo,
	   CASE 
	   	  WHEN e.discapacidad = true THEN 'Con Discapacidad'
	   	  WHEN e.discapacidad = false THEN 'Sin Discapacidad'
	   END AS discapacidad,
	   CASE
	   	  WHEN e.nombre_discapacidad = ' ' THEN 'Sin Discapacidad'
		  ELSE e.nombre_discapacidad
	   END AS nombre_discapacidad,
	   e.motivo_situacion,
	   CASE
	   	  WHEN e.beca = true THEN 'Becado'
		  WHEN e.beca = false THEN 'No Becado'
	   END AS beca,
	   CASE 
	   	   WHEN e.tipo_beca = ' ' THEN 'Sin Beca'
	   	   ELSE e.tipo_beca
	   END AS tipo_beca,
	   CASE 
	      WHEN e.derecho_servicio_social = true THEN 'Si'
		  WHEN e.derecho_servicio_social = false THEN 'No'
	   END AS derecho_servicio_social,
	   e.fecha_nac,
	   CASE 
	   	  WHEN e.hablante_indigena = true THEN 'Es Hablante'
		  WHEN e.hablante_indigena = false THEN 'No Hablante'
	   END AS hablante_indigena,
	   CASE
	      WHEN e.nombre_lengua = ' ' THEN 'Sin Lengua Indigena'
		  ELSE e.nombre_lengua
	   END AS nombre_lengua,
	   e.promedio,
	   CASE 
	      WHEN e.titulado = true THEN 'Si'
		  WHEN e.titulado = false THEN 'No'
	   END AS titulado,
	   s.situacion, 
	   es.estatus, 
	   ti.ingreso, 
	   pe.programa_educativo, 
	   he.fecha_estatus, 
	   hs.fecha_situacion
FROM estudiante e
INNER JOIN situacion s ON e.id_situacion = s.id_situacion
INNER JOIN estatus es ON e.id_estatus = es.id_estatus
INNER JOIN tipo_ingreso ti ON e.id_tipo_ingreso = ti.id_tipo_ingreso
INNER JOIN programa_educativo pe ON e.id_programa_educativo = pe.id_programa_educativo
INNER JOIN historial_estatus he ON e.id_estudiante = he.id_estudiante
INNER JOIN historial_situacion hs ON e.id_estudiante = hs.id_estudiante;