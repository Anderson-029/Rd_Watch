-- Buscar tablas con posibles campos multivaluados (violación 1NF)
SELECT table_name, column_name 
FROM information_schema.columns 
WHERE data_type LIKE '%,%' OR data_type LIKE '%|%' OR data_type LIKE '%;%';