-- ============================================
-- Iniciar sesión (login) - VERSIÓN FINAL CON VARIABLES INTERMEDIAS
-- ============================================
DROP FUNCTION IF EXISTS fun_login_usuario(character varying, text);

CREATE OR REPLACE FUNCTION fun_login_usuario(
    p_email     tab_Usuarios.correo_usuario%TYPE,
    p_password  TEXT
) RETURNS TABLE (
    status     TEXT,
    message    TEXT,
    ret_id_usuario tab_Usuarios.id_usuario%TYPE,
    ret_nombre     tab_Usuarios.nom_usuario%TYPE,
    ret_email      tab_Usuarios.correo_usuario%TYPE,
    ret_telefono   tab_Usuarios.num_telefono_usuario%TYPE,
    ret_direccion  tab_Usuarios.direccion_principal%TYPE,
    ret_token      TEXT
) AS $$
DECLARE
    v_usuario        RECORD;
    v_hash           tab_Usuarios.contra%TYPE;
    v_token          TEXT;
    v_intentos       tab_Usuarios.intentos_fallidos%TYPE;
    -- Variables de retorno con tipos de la tabla
    v_ret_id         tab_Usuarios.id_usuario%TYPE;
    v_ret_nombre     tab_Usuarios.nom_usuario%TYPE;
    v_ret_email      tab_Usuarios.correo_usuario%TYPE;
    v_ret_telefono   tab_Usuarios.num_telefono_usuario%TYPE;
    v_ret_direccion  tab_Usuarios.direccion_principal%TYPE;
BEGIN
    -- Buscar por correo (case-insensitive)
    SELECT u.* INTO v_usuario
      FROM tab_Usuarios u
     WHERE LOWER(u.correo_usuario) = LOWER(p_email);

    IF NOT FOUND THEN
        status := 'ERROR';
        message := 'Credenciales inválidas';
        ret_id_usuario := NULL;
        ret_nombre := NULL;
        ret_email := NULL;
        ret_telefono := NULL;
        ret_direccion := NULL;
        ret_token := NULL;
        RETURN NEXT;
        RETURN;
    END IF;

    IF NOT v_usuario.activo THEN
        status := 'ERROR';
        message := 'Usuario inactivo. Contacte al administrador';
        ret_id_usuario := NULL;
        ret_nombre := NULL;
        ret_email := NULL;
        ret_telefono := NULL;
        ret_direccion := NULL;
        ret_token := NULL;
        RETURN NEXT;
        RETURN;
    END IF;

    IF v_usuario.bloqueado THEN
        status := 'ERROR';
        message := 'Usuario bloqueado por múltiples intentos fallidos';
        ret_id_usuario := NULL;
        ret_nombre := NULL;
        ret_email := NULL;
        ret_telefono := NULL;
        ret_direccion := NULL;
        ret_token := NULL;
        RETURN NEXT;
        RETURN;
    END IF;

    -- Verificar contraseña
    v_hash := MD5(p_password || v_usuario.salt);

    IF v_hash = v_usuario.contra THEN
        -- Éxito: reset intentos y marcar último acceso
        UPDATE tab_Usuarios u
           SET intentos_fallidos = 0,
               ultimo_acceso    = CURRENT_TIMESTAMP,
               usr_update       = CURRENT_USER,
               fec_update       = CURRENT_TIMESTAMP
         WHERE u.id_usuario = v_usuario.id_usuario;

        -- Asignar valores a variables de retorno
        v_ret_id := v_usuario.id_usuario;
        v_ret_nombre := v_usuario.nom_usuario;
        v_ret_email := v_usuario.correo_usuario;
        v_ret_telefono := v_usuario.num_telefono_usuario;
        v_ret_direccion := COALESCE(v_usuario.direccion_principal, '');
        v_token := MD5(v_usuario.id_usuario::text || v_usuario.correo_usuario || clock_timestamp()::text);

        -- Retornar valores
        status := 'SUCCESS';
        message := 'Login exitoso';
        ret_id_usuario := v_ret_id;
        ret_nombre := v_ret_nombre;
        ret_email := v_ret_email;
        ret_telefono := v_ret_telefono;
        ret_direccion := v_ret_direccion;
        ret_token := v_token;
        RETURN NEXT;
    ELSE
        -- Fallo: incrementar intentos y bloquear a partir de 5
        v_intentos := COALESCE(v_usuario.intentos_fallidos, 0) + 1;

        IF v_intentos >= 5 THEN
            UPDATE tab_Usuarios u
               SET intentos_fallidos = v_intentos,
                   bloqueado         = TRUE,
                   fecha_bloqueo     = CURRENT_TIMESTAMP,
                   usr_update        = CURRENT_USER,
                   fec_update        = CURRENT_TIMESTAMP
             WHERE u.id_usuario = v_usuario.id_usuario;

            status := 'ERROR';
            message := 'Usuario bloqueado por múltiples intentos fallidos';
        ELSE
            UPDATE tab_Usuarios u
               SET intentos_fallidos = v_intentos,
                   usr_update        = CURRENT_USER,
                   fec_update        = CURRENT_TIMESTAMP
             WHERE u.id_usuario = v_usuario.id_usuario;

            status := 'ERROR';
            message := 'Credenciales inválidas';
        END IF;
        
        ret_id_usuario := NULL;
        ret_nombre := NULL;
        ret_email := NULL;
        ret_telefono := NULL;
        ret_direccion := NULL;
        ret_token := NULL;
        RETURN NEXT;
    END IF;
END;
$$ LANGUAGE plpgsql;