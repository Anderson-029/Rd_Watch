-- Función de Trigger Genérica para Auditoría
-- Esta función se encargará de llenar las columnas de auditoría (usr_insert, fec_insert, usr_update, fec_update)
-- para cualquier tabla que tenga estas columnas y un trigger asociado.
CREATE OR REPLACE FUNCTION fun_audit_trail_generic() RETURNS TRIGGER AS
$$
    BEGIN
        -- Si la operación es una INSERCIÓN
        IF TG_OP = 'INSERT' THEN
            -- Asigna el usuario actual a la columna 'usr_insert' de la nueva fila
            NEW.usr_insert = CURRENT_USER;
            -- Asigna la fecha y hora actuales a la columna 'fec_insert' de la nueva fila
            NEW.fec_insert = CURRENT_TIMESTAMP;
        END IF;

        -- Si la operación es una ACTUALIZACIÓN
        IF TG_OP = 'UPDATE' THEN
            -- Asigna el usuario actual a la columna 'usr_update' de la fila que se está actualizando
            NEW.usr_update = CURRENT_USER;
            -- Asigna la fecha y hora actuales a la columna 'fec_update' de la fila que se está actualizando
            NEW.fec_update = CURRENT_TIMESTAMP;
        END IF;

        -- En funciones de trigger BEFORE, es necesario devolver NEW para que los cambios se apliquen.
        RETURN NEW;
    END;
$$
LANGUAGE PLPGSQL;


-- Triggers de Auditoría para las Tablas Seleccionadas

-- Trigger para tab_Usuarios
CREATE OR REPLACE TRIGGER tri_audit_usuarios
BEFORE INSERT OR UPDATE ON tab_Usuarios
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Proveedor
CREATE OR REPLACE TRIGGER tri_audit_proveedor
BEFORE INSERT OR UPDATE ON tab_Proveedor
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Metodos_Pago
CREATE OR REPLACE TRIGGER tri_audit_metodos_pago
BEFORE INSERT OR UPDATE ON tab_Metodos_Pago
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Usuario_Metodo_Pago
CREATE OR REPLACE TRIGGER tri_audit_usuario_metodo_pago
BEFORE INSERT OR UPDATE ON tab_Usuario_Metodo_Pago
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Promociones
CREATE OR REPLACE TRIGGER tri_audit_promociones
BEFORE INSERT OR UPDATE ON tab_Promociones
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Servicios
CREATE OR REPLACE TRIGGER tri_audit_servicios
BEFORE INSERT OR UPDATE ON tab_Servicios
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Empleados
CREATE OR REPLACE TRIGGER tri_audit_empleados
BEFORE INSERT OR UPDATE ON tab_Empleados
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Direcciones_Envio
CREATE OR REPLACE TRIGGER tri_audit_direcciones_envio
BEFORE INSERT OR UPDATE ON tab_Direcciones_Envio
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Productos
CREATE OR REPLACE TRIGGER tri_audit_productos
BEFORE INSERT OR UPDATE ON tab_Productos
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Orden
CREATE OR REPLACE TRIGGER tri_audit_orden
BEFORE INSERT OR UPDATE ON tab_Orden
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Detalle_Orden
CREATE OR REPLACE TRIGGER tri_audit_detalle_orden
BEFORE INSERT OR UPDATE ON tab_Detalle_Orden
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Orden_Servicios
CREATE OR REPLACE TRIGGER tri_audit_orden_servicios
BEFORE INSERT OR UPDATE ON tab_Orden_Servicios
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Facturas
CREATE OR REPLACE TRIGGER tri_audit_facturas
BEFORE INSERT OR UPDATE ON tab_Facturas
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Detalle_Factura
CREATE OR REPLACE TRIGGER tri_audit_detalle_factura
BEFORE INSERT OR UPDATE ON tab_Detalle_Factura
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Envios
CREATE OR REPLACE TRIGGER tri_audit_envios
BEFORE INSERT OR UPDATE ON tab_Envios
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Opiniones
CREATE OR REPLACE TRIGGER tri_audit_opiniones
BEFORE INSERT OR UPDATE ON tab_Opiniones
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Recepciones_Proveedor
CREATE OR REPLACE TRIGGER tri_audit_recepciones_proveedor
BEFORE INSERT OR UPDATE ON tab_Recepciones_Proveedor
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Pagos
CREATE OR REPLACE TRIGGER tri_audit_pagos
BEFORE INSERT OR UPDATE ON tab_Pagos
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Productos_Promociones
CREATE OR REPLACE TRIGGER tri_audit_productos_promociones
BEFORE INSERT OR UPDATE ON tab_Productos_Promociones
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();

-- Trigger para tab_Reservas
CREATE OR REPLACE TRIGGER tri_audit_reservas
BEFORE INSERT OR UPDATE ON tab_Reservas
FOR EACH ROW EXECUTE FUNCTION fun_audit_trail_generic();