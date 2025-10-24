SELECT CASE
		  WHEN s.tipo_proyecto = true THEN 'Interno'
		  WHEN s.tipo_proyecto = false THEN 'Externo'
	   END AS tipo_proyecto,
	   s.clase_proyecto,
	   s.nombre_proyecto,
	   s.beneficiarios,
	   s.fecha_inicio,
	   s.fecha_final,
	   e.nombre,
	   e.matricula,
	   CASE 
	      WHEN e.titulado = true THEN 'Titulado'
		  WHEN e.titulado = false THEN 'No Titulado'
	   END AS titulado,
	   CASE
	   	  WHEN e.sexo = true THEN 'Hombre'
		  WHEN e.sexo = false THEN 'Mujer'
	   END AS sexo,
	   pe.programa_educativo,
	   es.estado
FROM servicio_social s
INNER JOIN estudiante e ON e.id_estudiante = s.id_estudiante
INNER JOIN programa_educativo pe ON e.id_programa_educativo = pe.id_programa_educativo
INNER JOIN estado_servicio es ON es.id_estado = s.id_estado