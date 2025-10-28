-- Buscar posibles dependencias transitivas (columnas que podrían derivarse de otras)
-- Esta es una consulta conceptual que requiere adaptación según esquema
SELECT t1.table_name, t1.column_name as posible_dependiente, 
       t2.column_name as posible_determinante
FROM information_schema.columns t1
JOIN information_schema.columns t2 
  ON t1.table_name = t2.table_name
WHERE t1.column_name LIKE '%total%' 
  AND (t2.column_name LIKE '%quantity%' OR t2.column_name LIKE '%price%');