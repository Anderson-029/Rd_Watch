select *
from tab_Inventario
limit 5;
----
select id_producto, cantidad_disponible, fecha_ingreso
from tab_Inventario;
----
select *
from tab_Inventario
where cantidad_disponible > 20;
----
select * 
from tab_Inventario
where id_proveedor = 5;
----
select *
from tab_inventario
order by fecha_ingreso desc;
----
select *
from tab_Inventario
where extract(year from fecha_ingreso) = 2022
order by fecha_ingreso asc;
----
select *
from tab_Inventario
where extract(year from fecha_ingreso) = 2023 and extract(month from fecha_ingreso) = 5
order by fecha_ingreso desc;
----
select inv.*, prod.nombre_producto
from tab_Inventario as inv
join tab_Productos as prod on inv.id_producto = prod.id_producto
where inv.cantidad_disponible < inv.stock_min;
---
select p.nom_proveedor, i.id_proveedor, count(*) as total_productos
from tab_Inventario as i
join tab_Proveedor as p on i.id_proveedor = p.id_proveedor
group by i.id_proveedor, p.nom_proveedor
order by total_productos desc;
----
select * from tab_Inventario
order by fecha_ingreso desc
limit 1;
----
select p.nombre_producto, pr.nom_proveedor, i.cantidad_disponible
from tab_Inventario as i 
join tab_Productos as p on i.id_producto = p.id_producto
join tab_Proveedor as pr on i.id_proveedor = pr.id_proveedor
order by i.cantidad_disponible desc;
