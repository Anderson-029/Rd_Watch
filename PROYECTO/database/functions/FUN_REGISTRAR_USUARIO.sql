-- ============================================
-- Registrar nuevo usuario (con salt + hash)
-- ============================================
CREATE OR REPLACE FUNCTION fun_registrar_usuario(
    p_nombre     tab_Usuarios.nom_usuario%TYPE,
    p_email      tab_Usuarios.correo_usuario%TYPE,
    p_telefono   tab_Usuarios.num_telefono_usuario%TYPE,
    p_password   TEXT,
    p_direccion  tab_Usuarios.direccion_principal%TYPE DEFAULT NULL
) RETURNS TABLE (
    status       TEXT,
    message      TEXT,
    id_usuario   tab_Usuarios.id_usuario%TYPE,
    token        TEXT
) AS $$
DECLARE
    v_id_usuario      tab_Usuarios.id_usuario%TYPE;
    v_email_existente BOOLEAN;
    v_salt            tab_Usuarios.salt%TYPE;
    v_password_hash   tab_Usuarios.contra%TYPE;
    v_token           TEXT;
BEGIN
    -- Unicidad de correo (case-insensitive recomendado si tienes idx LOWER)
    SELECT EXISTS(
        SELECT 1 FROM tab_Usuarios WHERE LOWER(correo_usuario) = LOWER(p_email)
    ) INTO v_email_existente;

    IF v_email_existente THEN
        RETURN QUERY SELECT 'ERROR','El email ya está registrado',
                      NULL::tab_Usuarios.id_usuario%TYPE, NULL::TEXT;
        RETURN;
    END IF;

    IF LENGTH(p_password) < 8 THEN
        RETURN QUERY SELECT 'ERROR','La contraseña debe tener al menos 8 caracteres',
                      NULL::tab_Usuarios.id_usuario%TYPE, NULL::TEXT;
        RETURN;
    END IF;

    -- Generar nuevo id (si no usas secuencia/identity)
    SELECT COALESCE(MAX(id_usuario),0) + 1::BIGINT
      INTO v_id_usuario
      FROM tab_Usuarios;

    -- Salt + hash (MD5 para respetar tu diseño actual)
    v_salt := MD5(random()::text || clock_timestamp()::text);
    v_password_hash := MD5(p_password || v_salt);

    INSERT INTO tab_Usuarios (
        id_usuario, nom_usuario, correo_usuario, num_telefono_usuario,
        direccion_principal, fecha_registro, activo,
        contra, salt, intentos_fallidos, bloqueado,
        usr_insert, fec_insert
    ) VALUES (
        v_id_usuario, p_nombre, p_email, p_telefono,
        p_direccion, CURRENT_TIMESTAMP, TRUE,
        v_password_hash, v_salt, 0, FALSE,
        CURRENT_USER, CURRENT_TIMESTAMP
    );

    v_token := MD5(v_id_usuario::text || p_email || clock_timestamp()::text);

    RETURN QUERY SELECT 'SUCCESS','Usuario registrado correctamente', v_id_usuario, v_token;

EXCEPTION WHEN OTHERS THEN
    RETURN QUERY SELECT 'ERROR','Error al registrar: '||SQLERRM,
                  NULL::tab_Usuarios.id_usuario%TYPE, NULL::TEXT;
END;
$$ LANGUAGE plpgsql;
