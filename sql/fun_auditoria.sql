-- =====================================================
-- FUNCIÓN DE AUDITORÍA PARA RDWATCH
-- =====================================================

CREATE OR REPLACE FUNCTION fun_audit_rdwatch() RETURNS TRIGGER AS
$$
    BEGIN
        -- Los campos de update siempre se actualizan (INSERT y UPDATE)
        NEW.usr_update = CURRENT_USER;  -- Usuario que realiza la actualización
        NEW.fec_update = CURRENT_TIMESTAMP;  -- Fecha y hora de la actualización
        
        -- Los campos de insert solo se llenan en INSERT
        IF TG_OP = 'INSERT' THEN
            NEW.usr_insert = CURRENT_USER;  -- Usuario que realiza la inserción
            NEW.fec_insert = CURRENT_TIMESTAMP;  -- Fecha y hora de la inserción
        END IF;
        
        RETURN NEW;  -- Retorna la fila modificada
    END;
$$
LANGUAGE PLPGSQL;
