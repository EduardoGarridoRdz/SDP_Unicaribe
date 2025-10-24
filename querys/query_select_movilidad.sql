SELECT 	v.institucion,
		v.fecha_inicio,
		v.fecha_final,
		CASE 
			WHEN v.acreditado = true THEN 'Acreditado'
			WHEN v.acreditado = false THEN 'No acreditado' 
		END AS acreditado,
		CASE 
			WHEN v.beca = true THEN 'Becado'
			WHEN v.beca = false THEN 'No becado'
		END AS beca,
		v.nombre_beca,
		CASE 
			WHEN v.tipo_vinculacion = true THEN 'Interna'
			WHEN v.tipo_vinculacion = false THEN 'Externa'
		END AS tipo_vinculacion,
		CASE 
			WHEN v.huesped = true THEN 'Huésped'
			WHEN v.huesped = false THEN 'No huésped'
		END AS huesped,
		e.nombre,
		e.matricula,
		CASE 
			WHEN e.sexo = true THEN 'Hombre'
			WHEN e.sexo = false THEN 'Mujer'
		END AS sexo,
		pe.programa_educativo,
		c.nombre_ciudad,
		p.nombre_pais,
		es.nombre_estado
FROM vinculacion_acad v
INNER JOIN ciudad c ON v.id_ciudad = c.id_ciudad
INNER JOIN estudiante e ON v.id_estudiante = e.id_estudiante
INNER JOIN programa_educativo pe ON e.id_programa_educativo = pe.id_programa_educativo
INNER JOIN pais p ON c.id_pais = p.id_pais
INNER JOIN estado es ON c.id_estado = es.id_estado