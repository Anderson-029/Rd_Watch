-- ===========================================
-- FUNCIÓN: Registrar petición de servicio (cita)
-- Autor: RDWATCH
-- ===========================================
CREATE OR REPLACE FUNCTION fun_registrar_peticion_servicio(
    p_id_usuario    tab_Usuarios.id_usuario%TYPE,
    p_id_servicio   tab_Servicios.id_servicio%TYPE,
    p_fecha_pref    DATE DEFAULT CURRENT_DATE,
    p_notas         TEXT DEFAULT NULL,
    p_prioridad     TEXT DEFAULT 'normal'  -- opcional: 'alta'|'normal'|'baja'
) RETURNS BIGINT AS
$$
DECLARE
    v_usr         RECORD;
    v_srv         RECORD;
    v_id_reserva  BIGINT;
    v_es_principal BOOLEAN;
BEGIN
    -- =======================================
    -- VALIDAR USUARIO ACTIVO
    -- =======================================
    SELECT id_usuario, nom_usuario, activo
      INTO v_usr
      FROM tab_Usuarios
     WHERE id_usuario = p_id_usuario;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Error: El usuario % no existe', p_id_usuario;
    END IF;

    IF v_usr.activo = FALSE THEN
        RAISE EXCEPTION 'Error: El usuario % está inactivo', v_usr.nom_usuario;
    END IF;

    -- =======================================
    -- VALIDAR SERVICIO
    -- =======================================
    SELECT id_servicio, nom_servicio
      INTO v_srv
      FROM tab_Servicios
     WHERE id_servicio = p_id_servicio;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Error: El servicio con ID % no existe', p_id_servicio;
    END IF;

    -- Validar que sea uno de los 3 servicios principales del sitio
    v_es_principal := LOWER(v_srv.nom_servicio) IN (
        LOWER('Reparación Premium'),
        LOWER('Mantenimiento Expert'),
        LOWER('Repuestos Originales')
    );

    IF NOT v_es_principal THEN
        RAISE EXCEPTION 'Error: Solo se aceptan peticiones para los servicios principales (Reparación Premium, Mantenimiento Expert, Repuestos Originales)';
    END IF;

    -- =======================================
    -- VALIDAR FECHA
    -- =======================================
    IF p_fecha_pref < CURRENT_DATE THEN
        RAISE EXCEPTION 'Error: La fecha preferida % no puede ser anterior a hoy', p_fecha_pref;
    END IF;

    -- Evitar duplicados: misma fecha/usuario/servicio con estado activo
    IF EXISTS (
        SELECT 1
          FROM tab_Reservas r
         WHERE r.id_usuario   = p_id_usuario
           AND r.id_servicio  = p_id_servicio
           AND r.fecha_preferida = p_fecha_pref
           AND r.estado_reserva IN ('pendiente','agendada')
    ) THEN
        RAISE EXCEPTION 'Error: Ya existe una petición activa para ese servicio y fecha';
    END IF;

    -- =======================================
    -- GENERAR ID Y REGISTRAR PETICIÓN
    -- =======================================
    SELECT COALESCE(MAX(id_reserva),0) + 1
      INTO v_id_reserva
      FROM tab_Reservas;

    INSERT INTO tab_Reservas (
        id_reserva,
        id_usuario,
        id_servicio,
        fecha_solicitada,
        fecha_preferida,
        notas_cliente,
        estado_reserva,
        prioridad,
        usr_insert, fec_insert  -- audit trail (también lo llenan tus triggers)
    ) VALUES (
        v_id_reserva,
        p_id_usuario,
        p_id_servicio,
        CURRENT_TIMESTAMP,
        p_fecha_pref,
        NULLIF(TRIM(p_notas),''),
        'pendiente',
        p_prioridad,
        CURRENT_USER, CURRENT_TIMESTAMP
    );

    RETURN v_id_reserva;

EXCEPTION
    WHEN OTHERS THEN
        -- Si prefieres devolver -1 en error (como en fun_recepcion_proveedor)
        RAISE NOTICE 'fun_registrar_peticion_servicio(): %', SQLERRM;
        RETURN -1;
END;
$$
LANGUAGE plpgsql;
