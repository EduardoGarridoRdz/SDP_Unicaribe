SELECT  i.idioma,
		CASE 
			WHEN i.nivel = '1' THEN 'Nivel 1'
			WHEN i.nivel = '2' THEN 'Nivel 2'
			WHEN i.nivel = '3' THEN 'Nivel 3'
			WHEN i.nivel = '4' THEN 'Nivel 4'
		ELSE i.nivel
		END AS nivel,
		CASE 
			WHEN i.acreditado = true THEN 'Acreditado'
			WHEN i.acreditado = false THEN 'No acreditado'
		END AS acreditado,
		i.certificacion,
		i.fecha_inicio,
		i.fecha_final,
		e.nombre,
		e.matricula,
		CASE 
			WHEN e.sexo = true THEN 'Hombre'
			WHEN e.sexo = false THEN 'Mujer'
		END AS sexo,
		pe.programa_educativo
	FROM idioma i
INNER JOIN estudiante e ON e.id_estudiante = i.estudiante
INNER JOIN programa_educativo pe ON pe.id_programa_educativo = e.id_programa_educativo