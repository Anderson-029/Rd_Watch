-- ============================================
-- Iniciar sesión (login)
-- ============================================
CREATE OR REPLACE FUNCTION fun_login_usuario(
    p_email     tab_Usuarios.correo_usuario%TYPE,
    p_password  TEXT
) RETURNS TABLE (
    status     TEXT,
    message    TEXT,
    id_usuario tab_Usuarios.id_usuario%TYPE,
    nombre     tab_Usuarios.nom_usuario%TYPE,
    email      tab_Usuarios.correo_usuario%TYPE,
    telefono   tab_Usuarios.num_telefono_usuario%TYPE,
    direccion  tab_Usuarios.direccion_principal%TYPE,
    token      TEXT
) AS $$
DECLARE
    v_u        RECORD;
    v_hash     tab_Usuarios.contra%TYPE;
    v_token    TEXT;
    v_intentos tab_Usuarios.intentos_fallidos%TYPE;
BEGIN
    -- Buscar por correo (recomendado almacenar/consultar en LOWER)
    SELECT * INTO v_u
      FROM tab_Usuarios
     WHERE LOWER(correo_usuario) = LOWER(p_email);

    IF NOT FOUND THEN
        RETURN QUERY SELECT 'ERROR','Credenciales inválidas',
                             NULL::tab_Usuarios.id_usuario%TYPE,
                             NULL::tab_Usuarios.nom_usuario%TYPE,
                             NULL::tab_Usuarios.correo_usuario%TYPE,
                             NULL::tab_Usuarios.num_telefono_usuario%TYPE,
                             NULL::tab_Usuarios.direccion_principal%TYPE,
                             NULL::TEXT;
        RETURN;
    END IF;

    IF NOT v_u.activo THEN
        RETURN QUERY SELECT 'ERROR','Usuario inactivo. Contacte al administrador',
                             NULL::tab_Usuarios.id_usuario%TYPE,
                             NULL::tab_Usuarios.nom_usuario%TYPE,
                             NULL::tab_Usuarios.correo_usuario%TYPE,
                             NULL::tab_Usuarios.num_telefono_usuario%TYPE,
                             NULL::tab_Usuarios.direccion_principal%TYPE,
                             NULL::TEXT;
        RETURN;
    END IF;

    IF v_u.bloqueado THEN
        RETURN QUERY SELECT 'ERROR','Usuario bloqueado por múltiples intentos fallidos',
                             NULL::tab_Usuarios.id_usuario%TYPE,
                             NULL::tab_Usuarios.nom_usuario%TYPE,
                             NULL::tab_Usuarios.correo_usuario%TYPE,
                             NULL::tab_Usuarios.num_telefono_usuario%TYPE,
                             NULL::tab_Usuarios.direccion_principal%TYPE,
                             NULL::TEXT;
        RETURN;
    END IF;

    -- Verificar contraseña
    v_hash := MD5(p_password || v_u.salt);

    IF v_hash = v_u.contra THEN
        -- Éxito: reset intentos y marcar último acceso
        UPDATE tab_Usuarios
           SET intentos_fallidos = 0,
               ultimo_acceso    = CURRENT_TIMESTAMP,
               usr_update       = CURRENT_USER,
               fec_update       = CURRENT_TIMESTAMP
         WHERE id_usuario = v_u.id_usuario;

        v_token := MD5(v_u.id_usuario::text || v_u.correo_usuario || clock_timestamp()::text);

        RETURN QUERY
        SELECT 'SUCCESS','Login exitoso',
               v_u.id_usuario::tab_Usuarios.id_usuario%TYPE,
               v_u.nom_usuario::tab_Usuarios.nom_usuario%TYPE,
               v_u.correo_usuario::tab_Usuarios.correo_usuario%TYPE,
               v_u.num_telefono_usuario::tab_Usuarios.num_telefono_usuario%TYPE,
               COALESCE(v_u.direccion_principal,'')::tab_Usuarios.direccion_principal%TYPE,
               v_token;
    ELSE
        -- Fallo: incrementar intentos y bloquear a partir de 5
        v_intentos := COALESCE(v_u.intentos_fallidos,0) + 1;

        IF v_intentos >= 5 THEN
            UPDATE tab_Usuarios
               SET intentos_fallidos = v_intentos,
                   bloqueado         = TRUE,
                   fecha_bloqueo     = CURRENT_TIMESTAMP,
                   usr_update        = CURRENT_USER,
                   fec_update        = CURRENT_TIMESTAMP
             WHERE id_usuario = v_u.id_usuario;

            RETURN QUERY SELECT 'ERROR','Usuario bloqueado por múltiples intentos fallidos',
                                 NULL::tab_Usuarios.id_usuario%TYPE,
                                 NULL::tab_Usuarios.nom_usuario%TYPE,
                                 NULL::tab_Usuarios.correo_usuario%TYPE,
                                 NULL::tab_Usuarios.num_telefono_usuario%TYPE,
                                 NULL::tab_Usuarios.direccion_principal%TYPE,
                                 NULL::TEXT;
        ELSE
            UPDATE tab_Usuarios
               SET intentos_fallidos = v_intentos,
                   usr_update        = CURRENT_USER,
                   fec_update        = CURRENT_TIMESTAMP
             WHERE id_usuario = v_u.id_usuario;

            RETURN QUERY SELECT 'ERROR','Credenciales inválidas',
                                 NULL::tab_Usuarios.id_usuario%TYPE,
                                 NULL::tab_Usuarios.nom_usuario%TYPE,
                                 NULL::tab_Usuarios.correo_usuario%TYPE,
                                 NULL::tab_Usuarios.num_telefono_usuario%TYPE,
                                 NULL::tab_Usuarios.direccion_principal%TYPE,
                                 NULL::TEXT;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
