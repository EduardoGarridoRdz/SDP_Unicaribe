SELECT 
	   CASE
	      WHEN p.num_practica = 1 THEN 'Prácticas 1'
		  WHEN p.num_practica = 2 THEN 'Prácticas 2'
		  WHEN p.num_practica = 3 THEN 'Prácticas Pre-Especialidad'
	   END AS num_practica,
	   p.fecha_inicio,
	   p.fecha_final,
	   p.empresa,
	   p.telefon_empresa,
	   CASE 
	      WHEN p.contratado = true THEN 'Contratado'
		  WHEN p.contratado = false THEN 'No Contratado'
	   END AS contratado,
	   e.matricula,
	   e.nombre,
	   CASE 
	      WHEN e.sexo = true THEN 'Hombre'
		  WHEN e.sexo = false THEN 'Mujer'
	   END AS sexo,
	   pe.programa_educativo
FROM practica_prof p
INNER JOIN estudiante e ON e.id_estudiante = p.id_estudiante
INNER JOIN programa_educativo pe ON e.id_programa_educativo = pe.id_programa_educativo