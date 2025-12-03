-- 1. ACTUALIZAR DATOS BÁSICOS DEL PERFIL
CREATE OR REPLACE FUNCTION fun_actualizar_perfil(
    p_id_usuario BIGINT,
    p_nombre     VARCHAR,
    p_telefono   BIGINT
) RETURNS TABLE (status TEXT, message TEXT) AS $$
BEGIN
    UPDATE tab_Usuarios
    SET nom_usuario = p_nombre,
        num_telefono_usuario = p_telefono,
        usr_update = CURRENT_USER,
        fec_update = CURRENT_TIMESTAMP
    WHERE id_usuario = p_id_usuario;

    RETURN QUERY SELECT 'SUCCESS', 'Perfil actualizado correctamente'::TEXT;
END;
$$ LANGUAGE plpgsql;

-- 2. GESTIONAR DIRECCIONES (Agregar o Actualizar)
CREATE OR REPLACE FUNCTION fun_gestionar_direccion(
    p_id_usuario BIGINT,
    p_direccion  VARCHAR,
    p_ciudad_id  SMALLINT, -- Asumimos que envías ID ciudad
    p_postal     VARCHAR
) RETURNS TABLE (status TEXT, message TEXT) AS $$
DECLARE
    v_existe BIGINT;
BEGIN
    -- Verificar si el usuario ya tiene esa dirección exacta o una principal
    SELECT id_direccion INTO v_existe FROM tab_Direcciones_Envio 
    WHERE id_usuario = p_id_usuario LIMIT 1;

    IF v_existe IS NOT NULL THEN
        UPDATE tab_Direcciones_Envio
        SET direccion_completa = p_direccion,
            id_ciudad = p_ciudad_id,
            codigo_postal = p_postal
        WHERE id_direccion = v_existe;
        RETURN QUERY SELECT 'SUCCESS', 'Dirección actualizada'::TEXT;
    ELSE
        INSERT INTO tab_Direcciones_Envio (id_usuario, direccion_completa, id_ciudad, codigo_postal, es_predeterminada)
        VALUES (p_id_usuario, p_direccion, p_ciudad_id, p_postal, TRUE);
        RETURN QUERY SELECT 'SUCCESS', 'Dirección guardada'::TEXT;
    END IF;
END;
$$ LANGUAGE plpgsql;