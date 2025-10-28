-- Encontrar claves foráneas sin índice (puede afectar rendimiento)
SELECT DISTINCT tc.table_name, kcu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
  ON tc.constraint_name = kcu.constraint_name
LEFT JOIN information_schema.statistics s
  ON s.table_name = tc.table_name AND s.column_name = kcu.column_name
WHERE tc.constraint_type = 'FOREIGN KEY' AND s.index_name IS NULL;