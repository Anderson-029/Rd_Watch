-- Posibles datos duplicados (ejemplo para tabla de clientes)
SELECT first_name, last_name, email, COUNT(*) as duplicates
FROM customers
GROUP BY first_name, last_name, email
HAVING COUNT(*) > 1;