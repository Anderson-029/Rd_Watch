-- Identificar tablas con claves compuestas que podrían tener dependencias parciales
SELECT tc.table_name, tc.constraint_name, kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
WHERE tc.constraint_type = 'PRIMARY KEY'
GROUP BY tc.table_name, tc.constraint_name
HAVING COUNT(*) > 1;