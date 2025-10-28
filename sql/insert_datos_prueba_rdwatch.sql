-- =============================================================================
-- SEED COHERENTE RDWATCH (POSTGRESQL)
-- NOTA: No usa TRUNCATE ni CASCADE. Idempotente via ON CONFLICT DO NOTHING.
-- =============================================================================
BEGIN;

-- =========================================================================
-- 1) USUARIOS (no depende de otras tablas)
-- =========================================================================
INSERT INTO tab_Usuarios (
    id_usuario, nom_usuario, correo_usuario, num_telefono_usuario, direccion_principal,
    -- auditoría
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
(10001, 'Laura Gómez',   'laura.gomez@example.com',   573001112233, 'Cra 7 #12-34, Bogotá',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(10002, 'Carlos Pérez',  'carlos.perez@example.com',  573002223344, 'Cll 45 #67-89, Medellín',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(10003, 'Ana Martínez',  'ana.martinez@example.com',  573003334455, 'Av. 3N #45-67, Cali',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 2) MÉTODOS DE PAGO (no depende de otras tablas)
-- =========================================================================
INSERT INTO tab_Metodos_Pago (
    id_metodo_pago, nombre_metodo, descripcion,
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
(1, 'Tarjeta de crédito', 'Pago con tarjeta de crédito/débito.',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(2, 'PayPal', 'Pago seguro a través de PayPal.',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(3, 'Transferencia bancaria', 'Transferencia bancaria nacional.',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 3) CATEGORÍAS
-- =========================================================================
INSERT INTO tab_Categorias (
    id_categoria, nom_categoria, descripcion_categoria, -- estado tiene DEFAULT TRUE
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
(1, 'Relojes',      'Relojes inteligentes y análogos.',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(2, 'Accesorios',   'Correas, herramientas y repuestos.',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(3, 'Mantenimiento','Baterías, limpieza y servicio técnico.',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 4) SUBCATEGORÍAS (depende de Categorías)
--    PK compuesta (id_categoria, id_subcategoria)
-- =========================================================================
INSERT INTO tab_Subcategorias (
    id_categoria, id_subcategoria, nom_subcategoria,
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
-- Cat 1: Relojes
(1, 1, 'Smartwatch',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(1, 2, 'Reloj clásico',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
-- Cat 2: Accesorios
(2, 1, 'Correas',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(2, 2, 'Herramientas',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
-- Cat 3: Mantenimiento
(3, 1, 'Baterías',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 5) MARCAS (no depende de otras tablas)
-- =========================================================================
INSERT INTO tab_Marcas (
    id_marca, nom_marca,
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
(1001, 'RDWatch',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(1002, 'Omega',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(1003, 'Casio',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 6) CIUDADES (no depende de otras tablas)
-- =========================================================================
INSERT INTO tab_Ciudades (
    id_ciudad, nombre_ciudad, codigo_postal, nombre_estado_provincia,
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
(101, 'Bogotá D.C.', '110111', 'Bogotá',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(102, 'Medellín',    '050001', 'Antioquia',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(103, 'Cali',        '760001', 'Valle del Cauca',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 7) DIRECCIONES DE ENVÍO (depende de Usuarios y Ciudades)
-- =========================================================================
INSERT INTO tab_Direcciones_Envio (
    id_direccion, id_usuario, direccion_completa, id_ciudad, codigo_postal, es_predeterminada,
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
(900000001, 10001, 'Cra 7 #12-34 Apto 502', 101, '110111', TRUE,
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(900000002, 10002, 'Cll 45 #67-89 Casa 3',  102, '050001', TRUE,
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),
(900000003, 10003, 'Av. 3N #45-67 Torre B', 103, '760001', TRUE,
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- =========================================================================
-- 8) PRODUCTOS (depende de Marca y de (Categoría, Subcategoría))
-- =========================================================================
INSERT INTO tab_Productos (
    id_producto, id_marca, nom_producto, descripcion, precio,
    id_categoria, id_subcategoria, stock, url_imagen,
    usr_insert, fec_insert, usr_update, fec_update, usr_delete, fec_delete
) VALUES
(500000001, 1001, 'RDWatch Pro X', 'Smartwatch con GPS y NFC.', 899.90,
 1, 1, 120, 'https://example.com/img/rdwatch-pro-x.jpg',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),

(500000002, 1002, 'Omega Seamaster 300', 'Reloj clásico de alta gama.', 5200.00,
 1, 2, 15, 'https://example.com/img/omega-seamaster-300.jpg',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP),

(500000003, 1001, 'Correa de cuero 22mm', 'Correa premium compatible con múltiples modelos.', 39.99,
 2, 1, 350, 'https://example.com/img/correa-cuero-22mm.jpg',
 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP, 'seed', CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

COMMIT;
