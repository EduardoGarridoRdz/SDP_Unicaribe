SELECT  
		CASE 
			WHEN d.tipo_taller = true THEN 'Cultural y Artístico'
			WHEN d.tipo_taller = false THEN 'Deportivo'
		END AS tipo_taller,
		CASE
			WHEN d.representante = true THEN 'Representante'
			WHEN d.representante = false THEN 'No representante'
		END AS representante,
		CASE 
			WHEN d.selectivo = true THEN 'Selectivo'
			WHEN d.selectivo = false THEN 'No selectivo'
		END AS selectivo,
		CASE
			WHEN d.acreditado = true THEN 'Acreditado'
			WHEN d.acreditado = false THEN 'No acreditado'
		END AS acreditado,
		d.fecha_inicio,
		d.fecha_final,
		d.club,
		nt.nombre AS nombre_taller,
		e.nombre,
		e.matricula,
		CASE 
			WHEN e.sexo = true THEN 'Hombre'
			WHEN e.sexo = false THEN 'Mujer'
		END AS sexo,
		pe.programa_educativo
FROM taller d
INNER JOIN estudiante e ON e.id_estudiante = d.id_estudiante
INNER JOIN programa_educativo pe ON e.id_programa_educativo = pe.id_programa_educativo
INNER JOIN nombre_taller nt ON d.id_nombre_taller = nt.id_nombre_taller
