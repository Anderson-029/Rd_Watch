
-- tabla usuarios
INSERT INTO tab_Usuarios (
    id_usuario, nom_usuario, correo_usuario, num_telefono_usuario, direccion_principal,
    fecha_registro, activo, usr_insert, fec_insert, usr_update, fec_update,
    password_usuario, rol_usuario
) VALUES
(1, 'Camila Ríos', 'camila.rios01@example.com', 3124567890, 'Cra 45 #12-30, Bogotá', '2022-03-15 09:23:11', TRUE, 'admin_sysmho', '2022-03-15 09:23:11', 'admin_sysmho', '2022-03-15 09:23:11', 
 '12345', 'admin'),
(2, 'Juan Morales', 'juan.morales02@example.com', 3109876543, 'Calle 80 #65-12, Medellín', '2021-07-22 14:45:55', TRUE, 'admin_sysmho', '2021-07-22 14:45:55', 'admin_sysmho', '2021-07-22 14:45:55', 
 '123456', 'user'),
(3, 'Laura Peña', 'laura.pena03@example.com', 3007891234, 'Av. 33 #45-09, Cali', '2023-01-05 08:12:03', FALSE, 'admin_sysmho', '2023-01-05 08:12:03', 'admin_sysmho', '2023-01-05 08:12:03', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(4, 'Andrés Herrera', 'andres.herrera04@example.com', 3112233445, 'Carrera 7 #21-87, Bucaramanga', '2022-10-09 17:00:00', TRUE, 'admin_sysmho', '2022-10-09 17:00:00', 'admin_sysmho', '2022-10-09 17:00:00', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(5, 'Diana Quintero', 'diana.quintero05@example.com', 3134567890, 'Calle 14 #50-25, Cartagena', '2024-02-01 11:30:10', TRUE, 'admin_sysmho', '2024-02-01 11:30:10', 'admin_sysmho', '2024-02-01 11:30:10', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(6, 'Felipe Ramos', 'felipe.ramos06@example.com', 3214455667, 'Cra 9 #10-55, Pereira', '2023-05-16 16:42:28', TRUE, 'admin_sysmho', '2023-05-16 16:42:28', 'admin_sysmho', '2023-05-16 16:42:28', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(7, 'Valentina Suárez', 'valentina.suarez07@example.com', 3012233445, 'Av. Caracas #18-33, Bogotá', '2021-12-04 10:11:09', TRUE, 'admin_sysmho', '2021-12-04 10:11:09', 'admin_sysmho', '2021-12-04 10:11:09', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(8, 'Miguel Ángel Torres', 'miguel.torres08@example.com', 3045566778, 'Calle 5 #8-24, Neiva', '2023-06-22 19:50:45', FALSE, 'admin_sysmho', '2023-06-22 19:50:45', 'admin_sysmho', '2023-06-22 19:50:45', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(9, 'Juliana Vargas', 'juliana.vargas09@example.com', 3156677889, 'Carrera 3 #45-67, Ibagué', '2022-08-11 13:20:00', TRUE, 'admin_sysmho', '2022-08-11 13:20:00', 'admin_sysmho', '2022-08-11 13:20:00', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(10, 'Sebastián Rueda', 'sebastian.rueda10@example.com', 3119988776, 'Calle 72 #14-22, Bucaramanga', '2021-09-30 08:00:00', TRUE, 'admin_sysmho', '2021-09-30 08:00:00', 'admin_sysmho', '2021-09-30 08:00:00', 
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(11, 'Natalia Mendoza', 'natalia.mendoza11@example.com', 3021234567, 'Av. Boyacá #45-32, Bogotá', '2024-03-10 11:11:11', TRUE, 'admin_sysmho', '2024-03-10 11:11:11', 'admin_sysmho', '2024-03-10 11:11:11',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(12, 'Carlos Acosta', 'carlos.acosta12@example.com', 3004567890, 'Carrera 70 #55-18, Medellín', '2023-04-25 07:45:00', TRUE, 'admin_sysmho', '2023-04-25 07:45:00', 'admin_sysmho', '2023-04-25 07:45:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(13, 'Paula Cárdenas', 'paula.cardenas13@example.com', 3201122334, 'Calle 22 #30-10, Cali', '2022-02-19 14:20:00', FALSE, 'admin_sysmho', '2022-02-19 14:20:00', 'admin_sysmho', '2022-02-19 14:20:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(14, 'Santiago Gómez', 'santiago.gomez14@example.com', 3123344556, 'Cra 8 #15-60, Manizales', '2021-11-11 17:17:17', TRUE, 'admin_sysmho', '2021-11-11 17:17:17', 'admin_sysmho', '2021-11-11 17:17:17',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(15, 'Daniela Pineda', 'daniela.pineda15@example.com', 3145566778, 'Av. 1 de Mayo #35-50, Bogotá', '2023-07-07 12:00:00', TRUE, 'admin_sysmho', '2023-07-07 12:00:00', 'admin_sysmho', '2023-07-07 12:00:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(16, 'Lucía Bonilla', 'lucia.bonilla16@example.com', 3001122334, 'Calle 10 #23-45, Cúcuta', '2023-01-14 10:22:33', TRUE, 'admin_sysmho', '2023-01-14 10:22:33', 'admin_sysmho', '2023-01-14 10:22:33',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(17, 'Esteban Orozco', 'esteban.orozco17@example.com', 3114455667, 'Cra 50 #30-20, Medellín', '2021-04-18 09:10:11', TRUE, 'admin_sysmho', '2021-04-18 09:10:11', 'admin_sysmho', '2021-04-18 09:10:11',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(18, 'Isabella Páez', 'isabella.paez18@example.com', 3209988776, 'Av. Las Américas #9-50, Bogotá', '2024-01-03 16:30:00', FALSE, 'admin_sysmho', '2024-01-03 16:30:00', 'admin_sysmho', '2024-01-03 16:30:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(19, 'Tomás Villegas', 'tomas.villegas19@example.com', 3045566123, 'Calle 50 #70-12, Barranquilla', '2022-06-06 08:08:08', TRUE, 'admin_sysmho', '2022-06-06 08:08:08', 'admin_sysmho', '2022-06-06 08:08:08',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(20, 'Manuela López', 'manuela.lopez20@example.com', 3136677889, 'Cra 9 #12-34, Popayán', '2023-09-19 14:45:55', TRUE, 'admin_sysmho', '2023-09-19 14:45:55', 'admin_sysmho', '2023-09-19 14:45:55',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(21, 'Alejandro Molina', 'alejandro.molina21@example.com', 3113344556, 'Calle 5 #8-16, Santa Marta', '2021-02-27 12:00:00', TRUE, 'admin_sysmho', '2021-02-27 12:00:00', 'admin_sysmho', '2021-02-27 12:00:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(22, 'Mariana Castro', 'mariana.castro22@example.com', 3012233112, 'Av. El Dorado #100-15, Bogotá', '2022-11-23 18:22:40', FALSE, 'admin_sysmho', '2022-11-23 18:22:40', 'admin_sysmho', '2022-11-23 18:22:40',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(23, 'Daniel Cortés', 'daniel.cortes23@example.com', 3004455667, 'Cra 12 #40-20, Bucaramanga', '2023-03-08 09:30:00', TRUE, 'admin_sysmho', '2023-03-08 09:30:00', 'admin_sysmho', '2023-03-08 09:30:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(24, 'Gabriela Rincón', 'gabriela.rincon24@example.com', 3057788990, 'Calle 22 #11-89, Tunja', '2021-10-05 17:15:00', TRUE, 'admin_sysmho', '2021-10-05 17:15:00', 'admin_sysmho', '2021-10-05 17:15:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(25, 'Cristian Beltrán', 'cristian.beltran25@example.com', 3023344556, 'Cra 44 #33-21, Villavicencio', '2022-05-30 13:00:00', TRUE, 'admin_sysmho', '2022-05-30 13:00:00', 'admin_sysmho', '2022-05-30 13:00:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(26, 'Daniela Mejía', 'daniela.mejia26@example.com', 3112233445, 'Av. Bolívar #23-67, Armenia', '2023-08-12 15:22:22', TRUE, 'admin_sysmho', '2023-08-12 15:22:22', 'admin_sysmho', '2023-08-12 15:22:22',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(27, 'Iván Carrillo', 'ivan.carrillo27@example.com', 3145566778, 'Calle 30 #19-34, Montería', '2021-07-01 11:59:00', TRUE, 'admin_sysmho', '2021-07-01 11:59:00', 'admin_sysmho', '2021-07-01 11:59:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(28, 'Sofía Medina', 'sofia.medina28@example.com', 3127788990, 'Cra 18 #28-56, Sincelejo', '2024-06-14 07:47:10', TRUE, 'admin_sysmho', '2024-06-14 07:47:10', 'admin_sysmho', '2024-06-14 07:47:10',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(29, 'Diego Castaño', 'diego.castano29@example.com', 3009988776, 'Calle 13 #10-22, Pasto', '2022-12-10 20:10:00', FALSE, 'admin_sysmho', '2022-12-10 20:10:00', 'admin_sysmho', '2022-12-10 20:10:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user'),
(30, 'Melisa Barreto', 'melisa.barreto30@example.com', 3031122334, 'Cra 27 #5-55, Florencia', '2021-03-03 06:20:00', TRUE, 'admin_sysmho', '2021-03-03 06:20:00', 'admin_sysmho', '2021-03-03 06:20:00',
 '$2b$12$KIth9iBgg/fzOuZZ4bU4KOeA.55rCzeCKOwN3dGF7dPQhs6NLK1Ei', 'user');




-- tabla categorias
INSERT INTO tab_Categorias (
    id_categoria, nom_categoria, descripcion_categoria, estado
) VALUES
(1, 'Relojes de Lujo', 'Colección de relojes de alta gama, ideales para ocasiones especiales y uso ejecutivo.', TRUE),
(2, 'Relojes Deportivos', 'Diseñados para resistencia y funcionalidad durante actividades físicas exigentes.', TRUE),
(3, 'Relojes Inteligentes', 'Smartwatches con integración móvil, monitoreo de salud y apps integradas.', TRUE),
(4, 'Relojes Clásicos', 'Estilos tradicionales con mecanismos analógicos y diseños atemporales.', TRUE),
(5, 'Relojes Automáticos', 'Relojes mecánicos que no requieren batería, impulsados por movimiento.', TRUE),
(6, 'Relojes de Cuarzo', 'Relojes precisos y asequibles con mecanismo basado en cristal de cuarzo.', TRUE),
(7, 'Relojes para Niños', 'Diseños coloridos y resistentes adaptados al uso infantil.', TRUE),
(8, 'Relojes de Edición Limitada', 'Modelos exclusivos y numerados con disponibilidad limitada.', TRUE),
(9, 'Relojes para Buceo', 'Resistentes al agua con funciones para buceadores profesionales.', TRUE),
(10, 'Relojes Skeleton', 'Diseños con carátula transparente que muestran el mecanismo interno.', TRUE);


-- tabla subcategorias
INSERT INTO tab_Subcategorias (
    id_categoria, id_subcategoria, nom_subcategoria, estado
) VALUES
-- Relojes de Lujo (1)
(1, 1, 'Automáticos Suizos', TRUE),
(1, 2, 'Relojes con Diamantes', TRUE),
(1, 3, 'Relojes de Oro', TRUE),

-- Relojes Deportivos (2)
(2, 1, 'Multideporte', TRUE),
(2, 2, 'GPS Integrado', TRUE),
(2, 3, 'Resistentes a Golpes', TRUE),

-- Relojes Inteligentes (3)
(3, 1, 'Compatibles con iOS', TRUE),
(3, 2, 'Compatibles con Android', TRUE),
(3, 3, 'Con Medición de Salud', TRUE),

-- Relojes Clásicos (4)
(4, 1, 'Estilo Vintage', TRUE),
(4, 2, 'De Cuerda Manual', TRUE),
(4, 3, 'Diseño Minimalista', TRUE),

-- Relojes Automáticos (5)
(5, 1, 'Calibre Japonés', TRUE),
(5, 2, 'Calibre Alemán', TRUE),
(5, 3, 'Calibre Suizo', TRUE),

-- Relojes de Cuarzo (6)
(6, 1, 'Cuarzo Básico', TRUE),
(6, 2, 'Cronógrafos', TRUE),
(6, 3, 'Solares', TRUE),

-- Relojes para Niños (7)
(7, 1, 'Con Personajes Animados', TRUE),
(7, 2, 'Didácticos', TRUE),
(7, 3, 'Resistentes al Agua', TRUE),

-- Relojes de Edición Limitada (8)
(8, 1, 'Colaboraciones Exclusivas', TRUE),
(8, 2, 'Aniversario de Marca', TRUE),
(8, 3, 'Numerados Individualmente', TRUE),

-- Relojes para Buceo (9)
(9, 1, 'Certificados ISO 6425', TRUE),
(9, 2, 'Con Válvula de Helio', TRUE),
(9, 3, 'Luminiscentes', TRUE),

-- Relojes Skeleton (10)
(10, 1, 'Transparencia Total', TRUE),
(10, 2, 'Mecanismo Expuesto Parcial', TRUE),
(10, 3, 'Diseño Artístico', TRUE);


-- tabla marca
INSERT INTO tab_Marca (
    id_marca, nom_marca, estado_marca
) VALUES
(1, 'Rolex', TRUE),
(2, 'Omega', TRUE),
(3, 'Tag Heuer', TRUE),
(4, 'Patek Philippe', TRUE),
(5, 'Casio', TRUE),
(6, 'Seiko', TRUE),
(7, 'Tissot', TRUE),
(8, 'Garmin', TRUE),
(9, 'Fossil', TRUE),
(10, 'Audemars Piguet', TRUE),
(11, 'Citizen', TRUE),
(12, 'Bulova', TRUE),
(13, 'Hamilton', TRUE),
(14, 'Swatch', TRUE),
(15, 'Michael Kors', TRUE),
(16, 'Daniel Wellington', TRUE),
(17, 'Montblanc', TRUE),
(18, 'Hublot', TRUE),
(19, 'Bering', TRUE),
(20, 'Longines', TRUE);


-- tabla proveedor
INSERT INTO tab_Proveedor (
    id_proveedor, nom_proveedor, tipo_documento, num_documento, num_telefono, correo,
    direccion, fecha_creacion, estado, usr_insert, fec_insert, usr_update, fec_update
) VALUES
(1, 'Distribuciones GlobalTime S.A.S.', 'NIT', 9004567890, 3174567890, 'contacto@globaltime.com', 'Calle 45 #10-20, Bogotá', '2022-05-18 10:00:00', TRUE, 'admin_sysmho', '2022-05-18 10:00:00', 'admin_sysmho', '2022-05-18 10:00:00'),
(2, 'Luxury Watches Ltda.', 'NIT', 9012345678, 3126789456, 'ventas@luxurywatches.co', 'Carrera 30 #50-15, Medellín', '2021-12-11 14:15:22', TRUE, 'admin_sysmho', '2021-12-11 14:15:22', 'admin_sysmho', '2021-12-11 14:15:22'),
(3, 'Tiempo Exacto Importaciones', 'NIT', 8300987654, 3134567891, 'info@tiempoexacto.com', 'Av. 9 #23-77, Cali', '2023-02-04 09:35:00', TRUE, 'admin_sysmho', '2023-02-04 09:35:00', 'admin_sysmho', '2023-02-04 09:35:00'),
(4, 'Relojes del Caribe S.A.S.', 'NIT', 9011122233, 3168904567, 'servicio@caribewatch.com', 'Calle 8 #45-11, Barranquilla', '2023-07-10 16:22:10', TRUE, 'admin_sysmho', '2023-07-10 16:22:10', 'admin_sysmho', '2023-07-10 16:22:10'),
(5, 'Tecnología y Relojería SAS', 'NIT', 9008765432, 3147896543, 'soporte@tyrwatch.com', 'Cra 60 #20-80, Bucaramanga', '2022-09-23 11:50:44', TRUE, 'admin_sysmho', '2022-09-23 11:50:44', 'admin_sysmho', '2022-09-23 11:50:44'),
(6, 'CronoDistribuciones S.A.', 'NIT', 9007654321, 3109876543, 'pedidos@cronodis.com', 'Av. 1 #2-34, Bogotá', '2021-04-02 08:00:00', TRUE, 'admin_sysmho', '2021-04-02 08:00:00', 'admin_sysmho', '2021-04-02 08:00:00'),
(7, 'TimeBridge Colombia', 'NIT', 9011123344, 3154443322, 'clientes@timebridge.co', 'Carrera 10 #65-10, Medellín', '2023-08-20 10:44:23', TRUE, 'admin_sysmho', '2023-08-20 10:44:23', 'admin_sysmho', '2023-08-20 10:44:23'),
(8, 'Importadora Suiza de Relojes', 'NIT', 8301234567, 3197654321, 'ventas@suizarelojes.com', 'Calle 100 #13-21, Bogotá', '2022-11-30 09:15:00', TRUE, 'admin_sysmho', '2022-11-30 09:15:00', 'admin_sysmho', '2022-11-30 09:15:00'),
(9, 'Precision Time SAS', 'NIT', 9002345678, 3161122334, 'info@precisiontime.com', 'Cra 25 #30-20, Cartagena', '2024-01-01 10:00:00', TRUE, 'admin_sysmho', '2024-01-01 10:00:00', 'admin_sysmho', '2024-01-01 10:00:00'),
(10, 'Zenith Distribuciones', 'NIT', 8304567891, 3112233445, 'contacto@zenithdist.com', 'Av. Libertador #100-12, Cúcuta', '2021-06-17 12:30:00', TRUE, 'admin_sysmho', '2021-06-17 12:30:00', 'admin_sysmho', '2021-06-17 12:30:00'),
(11, 'Relojería del Norte', 'NIT', 9015566778, 3185566778, 'norte@relojeria.com', 'Cra 80 #90-10, Barranquilla', '2022-03-10 14:10:55', TRUE, 'admin_sysmho', '2022-03-10 14:10:55', 'admin_sysmho', '2022-03-10 14:10:55'),
(12, 'Andes Time Logistics', 'NIT', 9016677889, 3103344556, 'logistics@andestime.com', 'Calle 12 #21-19, Medellín', '2023-05-01 07:45:00', TRUE, 'admin_sysmho', '2023-05-01 07:45:00', 'admin_sysmho', '2023-05-01 07:45:00'),
(13, 'EliteWatch Proveedores S.A.S.', 'NIT', 9017788990, 3122233445, 'contacto@elitewatch.co', 'Cra 15 #100-20, Bogotá', '2023-10-15 13:30:00', TRUE, 'admin_sysmho', '2023-10-15 13:30:00', 'admin_sysmho', '2023-10-15 13:30:00'),
(14, 'Distribuciones Alpina Watch', 'NIT', 8303456789, 3116677889, 'ventas@alpinawatch.com', 'Av. Circunvalar #23-50, Pasto', '2024-02-20 10:15:00', TRUE, 'admin_sysmho', '2024-02-20 10:15:00', 'admin_sysmho', '2024-02-20 10:15:00'),
(15, 'TimeZone Proveedores', 'NIT', 9001122334, 3109988776, 'info@timezone.com', 'Calle 50 #40-25, Manizales', '2022-08-05 09:10:00', TRUE, 'admin_sysmho', '2022-08-05 09:10:00', 'admin_sysmho', '2022-08-05 09:10:00');



-- Poblar tabla tab_Metodos_Pago
INSERT INTO tab_Metodos_Pago (
    id_metodo_pago, nombre_metodo, descripcion,
    usr_insert, fec_insert, usr_update, fec_update
) VALUES 
(1, 'Tarjeta de Crédito', 'Pago mediante tarjetas Visa, MasterCard o American Express.', 'admin_sys', NOW(), NULL, NULL),
(2, 'Transferencia Bancaria', 'Depósito o transferencia desde cuenta bancaria nacional.', 'admin_sys', NOW(), NULL, NULL),
(3, 'PayPal', 'Plataforma de pagos digitales con seguridad internacional.', 'admin_sys', NOW(), NULL, NULL),
(4, 'Contra Entrega', 'Pago en efectivo al recibir el producto en domicilio.', 'admin_sys', NOW(), NULL, NULL);


-- tabla Usuarios_metodo de pago
INSERT INTO tab_Usuario_Metodo_Pago (
    id_usuario_metodo_pago, id_usuario, id_metodo_pago, es_favorito,
    usr_insert, fec_insert, usr_update, fec_update
) VALUES
(1, 1, 1, TRUE, 'admin_sys', NOW(), NULL, NULL),
(2, 1, 2, FALSE, 'admin_sys', NOW(), NULL, NULL),
(3, 2, 3, TRUE, 'admin_sys', NOW(), NULL, NULL),
(4, 3, 1, TRUE, 'admin_sys', NOW(), NULL, NULL),
(5, 3, 4, FALSE, 'admin_sys', NOW(), NULL, NULL),
(6, 4, 2, TRUE, 'admin_sys', NOW(), NULL, NULL),
(7, 5, 3, TRUE, 'admin_sys', NOW(), NULL, NULL),
(8, 5, 1, FALSE, 'admin_sys', NOW(), NULL, NULL),
(9, 6, 4, TRUE, 'admin_sys', NOW(), NULL, NULL),
(10, 7, 1, TRUE, 'admin_sys', NOW(), NULL, NULL),
(11, 8, 2, TRUE, 'admin_sys', NOW(), NULL, NULL),
(12, 9, 3, TRUE, 'admin_sys', NOW(), NULL, NULL),
(13, 10, 4, TRUE, 'admin_sys', NOW(), NULL, NULL),
(14, 10, 1, FALSE, 'admin_sys', NOW(), NULL, NULL),
(15, 11, 2, TRUE, 'admin_sys', NOW(), NULL, NULL),
(16, 12, 3, TRUE, 'admin_sys', NOW(), NULL, NULL),
(17, 13, 1, TRUE, 'admin_sys', NOW(), NULL, NULL),
(18, 13, 4, FALSE, 'admin_sys', NOW(), NULL, NULL),
(19, 14, 3, TRUE, 'admin_sys', NOW(), NULL, NULL),
(20, 15, 2, TRUE, 'admin_sys', NOW(), NULL, NULL);

-- tabla promocines
INSERT INTO tab_Promociones (id_promocion, descripcion, descuento, fecha_inicio, fecha_fin, usr_insert, fec_insert)
VALUES 
(1, 'Descuento de lanzamiento en relojes automáticos', 15.00, '2025-07-01 00:00:00', '2025-07-31 23:59:59', 'admin', CURRENT_TIMESTAMP),
(2, 'Oferta especial por temporada navideña', 20.00, '2025-12-01 00:00:00', '2025-12-31 23:59:59', 'admin', CURRENT_TIMESTAMP),
(3, 'Promoción de aniversario: relojes suizos', 25.00, '2025-09-15 00:00:00', '2025-09-22 23:59:59', 'admin', CURRENT_TIMESTAMP),
(4, 'Semana de descuentos en relojes de lujo', 30.00, '2025-08-05 00:00:00', '2025-08-12 23:59:59', 'admin', CURRENT_TIMESTAMP),
(5, 'Descuento exclusivo para suscriptores', 10.00, '2025-07-20 00:00:00', '2025-08-20 23:59:59', 'admin', CURRENT_TIMESTAMP),
(6, 'Promoción por día del padre', 18.00, '2025-06-01 00:00:00', '2025-06-30 23:59:59', 'admin', CURRENT_TIMESTAMP),
(7, 'Viernes negro: hasta 40% en modelos seleccionados', 40.00, '2025-11-29 00:00:00', '2025-11-29 23:59:59', 'admin', CURRENT_TIMESTAMP),
(8, 'Relojes deportivos en promoción', 12.50, '2025-08-10 00:00:00', '2025-08-17 23:59:59', 'admin', CURRENT_TIMESTAMP),
(9, 'Outlet de relojes: liquidación de inventario', 50.00, '2025-07-01 00:00:00', '2025-07-31 23:59:59', 'admin', CURRENT_TIMESTAMP),
(10, 'Descuento por compra anticipada en línea', 8.00, '2025-07-26 00:00:00', '2025-08-05 23:59:59', 'admin', CURRENT_TIMESTAMP);


--tabla blog
INSERT INTO tab_Blog (
    id_articulo, titulo, contenido, fecha_publicacion, autor, imagen_url
) VALUES
(1, 'La evolución del reloj mecánico: de la tradición a la precisión',
 'Exploramos cómo los relojes mecánicos han sobrevivido a la era digital gracias a su ingeniería y estética atemporal.',
 '2025-06-01 10:00:00', 'Laura Méndez', 'https://relojesonline.com/img/blog/reloj-mecanico.jpg'),

(2, 'Top 5 relojes suizos que deberías conocer en 2025',
 'Desde Rolex hasta Tissot, estos son los modelos que están marcando tendencia este año en la relojería suiza.',
 '2025-06-15 09:30:00', 'Carlos Torres', 'https://relojesonline.com/img/blog/top-suizos-2025.jpg'),

(3, '¿Cómo elegir tu primer reloj automático sin equivocarte?',
 'Una guía rápida para quienes entran al mundo de los relojes automáticos y quieren hacer una buena inversión.',
 '2025-07-01 08:00:00', 'Ana Delgado', 'https://relojesonline.com/img/blog/primer-automatico.jpg'),

(4, 'Mantenimiento básico de relojes: lo que nadie te cuenta',
 'Consejos simples pero clave para mantener tu reloj en óptimas condiciones durante años.',
 '2025-07-10 11:15:00', 'Julián Cortés', 'https://relojesonline.com/img/blog/mantenimiento.jpg'),

(5, 'Relojes digitales vs. analógicos: ¿cuál es mejor para ti?',
 'Comparativa práctica entre lo moderno y lo clásico en el mundo de la medición del tiempo.',
 '2025-07-12 14:45:00', 'Elena Ruiz', 'https://relojesonline.com/img/blog/digital-vs-analogico.jpg'),

(6, 'Las complicaciones más interesantes en relojería moderna',
 'Te explicamos qué son las complicaciones y cuáles son las más valoradas por coleccionistas y expertos.',
 '2025-07-15 13:20:00', 'Fernando Ríos', 'https://relojesonline.com/img/blog/complicaciones.jpg'),

(7, 'Cómo se fabrica un reloj desde cero: paso a paso en la manufactura',
 'Un vistazo dentro de los talleres suizos donde nacen los relojes más precisos del mundo.',
 '2025-07-18 10:40:00', 'Mariana Salazar', 'https://relojesonline.com/img/blog/fabricacion-reloj.jpg'),

(8, 'Smartwatches: ventajas y riesgos que deberías conocer',
 '¿Realmente vale la pena usar un smartwatch? Pros y contras desde el punto de vista técnico y de privacidad.',
 '2025-07-20 16:00:00', 'David Peña', 'https://relojesonline.com/img/blog/smartwatches.jpg'),

(9, 'Los relojes más icónicos del cine',
 'Desde el Omega de James Bond hasta el Casio de Volver al Futuro: una lista que combina cine y precisión.',
 '2025-07-22 12:00:00', 'Lucía Restrepo', 'https://relojesonline.com/img/blog/relojes-cine.jpg'),

(10, 'Tendencias en relojería para el 2026: lo que se viene',
 'Analizamos qué estilos, materiales y tecnologías marcarán el pulso del próximo año.',
 '2025-07-25 17:30:00', 'SysMho', 'https://relojesonline.com/img/blog/tendencias-2026.jpg');


-- tabla servicios
INSERT INTO tab_Servicios (
    id_servicio, nom_servicio, descripcion, precio_servicio, duracion_estimada,
    usr_insert, fec_insert, usr_update, fec_update
) VALUES
(1, 'Cambio de pila',
 'Sustitución profesional de la batería del reloj, utilizando herramientas especializadas y pila original.',
 25000.00, '15 minutos',
 'admin', '2025-07-26 11:00:00', NULL, NULL),

(2, 'Ajuste de correa',
 'Reducción o ampliación de la correa metálica para un ajuste perfecto a la muñeca del cliente.',
 18000.00, '10-20 minutos',
 'admin', '2025-07-26 11:05:00', NULL, NULL),

(3, 'Limpieza interna y externa',
 'Servicio de limpieza profunda del mecanismo y carcasa del reloj, ideal para relojes antiguos o sucios.',
 80000.00, '2-3 días',
 'admin', '2025-07-26 11:10:00', NULL, NULL),

(4, 'Pulido de cristal',
 'Eliminación de rayones superficiales en el cristal del reloj, devolviendo brillo y visibilidad.',
 45000.00, '1 hora',
 'admin', '2025-07-26 11:15:00', NULL, NULL),

(5, 'Revisión general de mecanismo',
 'Diagnóstico completo del funcionamiento del reloj para detectar fallos o desgaste en engranajes.',
 95000.00, '2 días',
 'admin', '2025-07-26 11:20:00', NULL, NULL),

(6, 'Cambio de mecanismo (cuarzo)',
 'Sustitución total del mecanismo de cuarzo dañado por uno nuevo de alta precisión.',
 120000.00, '3 días',
 'admin', '2025-07-26 11:25:00', NULL, NULL),

(7, 'Hermetización y prueba de estanqueidad',
 'Verificación y sellado del reloj para resistir el ingreso de agua y polvo, ideal para relojes deportivos.',
 70000.00, '2 horas',
 'admin', '2025-07-26 11:30:00', NULL, NULL),

(8, 'Cambio de cristal',
 'Reemplazo del cristal dañado por uno nuevo (mineral o zafiro, según el modelo).',
 95000.00, '1-2 días',
 'admin', '2025-07-26 11:35:00', NULL, NULL),

(9, 'Restauración de reloj vintage',
 'Restauración estética y funcional de piezas clásicas o de colección, respetando componentes originales.',
 250000.00, '5-7 días',
 'admin', '2025-07-26 11:40:00', NULL, NULL),

(10, 'Grabado personalizado',
 'Grabado láser de iniciales, fechas o mensajes en la parte trasera del reloj.',
 40000.00, '30 minutos',
 'admin', '2025-07-26 11:45:00', NULL, NULL);


-- tabla contacto
INSERT INTO tab_Contacto (
    id_contacto, nombre_remitente, correo_remitente, telefono_remitente, 
    asunto, mensaje, fecha_envio, estado
) VALUES
(1, 'Camila Ríos', 'camila.rios@gmail.com', 3005123456,
 'Garantía de reloj comprado', 
 'Hola, compré un reloj hace 2 semanas y dejó de funcionar. ¿Cómo aplico la garantía?', 
 '2025-07-25 10:20:00', 'pendiente'),

(2, 'Julián Herrera', 'julian.herrera@yahoo.com', 3127788990,
 'Consulta sobre envío', 
 'Quisiera saber si hacen envíos a Medellín y cuánto tarda.', 
 '2025-07-25 11:00:00', 'en proceso'),

(3, 'Esteban Mejía', 'emejia@outlook.com', 3215670011,
 'Solicito cotización de restauración', 
 'Tengo un reloj vintage Omega. ¿Cuánto cuesta restaurarlo por completo?', 
 '2025-07-25 12:45:00', 'pendiente'),

(4, 'Laura Nieto', 'launieto@gmail.com', 3119988776,
 'Error en la facturación', 
 'Recibí una factura con datos erróneos. Necesito una corrección para mi empresa.', 
 '2025-07-25 14:15:00', 'resuelto'),

(5, 'Carlos Benítez', 'cbenitez@gmail.com', 3143332211,
 'Cambio de correa', 
 '¿Tienen correas en cuero marrón para un Seiko automático?', 
 '2025-07-25 15:30:00', 'cerrado'),

(6, 'Mariana Ramírez', 'mariana_rz@hotmail.com', 3102233445,
 'Grabado personalizado', 
 '¿Puedo llevar mi reloj y que le graben una fecha especial? ¿Cuánto cuesta?', 
 '2025-07-25 16:10:00', 'pendiente'),

(7, 'Ricardo Torres', 'r.torres@empresa.com', 3004455667,
 'Solicitud de factura electrónica', 
 'Necesito la factura electrónica del pedido #120934.', 
 '2025-07-25 17:45:00', 'en proceso'),

(8, 'Paula Castaño', 'paulac88@gmail.com', 3110009876,
 'Información sobre mantenimiento', 
 '¿Cada cuánto tiempo es recomendable hacer mantenimiento preventivo?', 
 '2025-07-25 18:20:00', 'resuelto'),

(9, 'Santiago Vargas', 's.vargas@gmail.com', 3056667788,
 'Pedido retrasado', 
 'Mi pedido debía llegar ayer y no he recibido ninguna actualización.', 
 '2025-07-25 19:30:00', 'en proceso'),

(10, 'Isabel Duarte', 'isaduarte@gmail.com', 3201239876,
 'Consulta sobre métodos de pago', 
 '¿Aceptan pago contra entrega o solo pagos electrónicos?', 
 '2025-07-25 20:10:00', 'pendiente');


-- tabla empleados
INSERT INTO tab_Empleados (
    id_empleado, num_documento, nom_empleado, apellido_empleado, correo, telefono, puesto, fecha_contratacion,
    usr_insert, fec_insert, usr_update, fec_update
) VALUES
(1, 10045678901, 'Laura', 'Moreno', 'laura.moreno@relojex.com', 3125551010, 'Gerente General', '2021-03-15',
 'admin_sys', CURRENT_TIMESTAMP, NULL, NULL),

(2, 10067890123, 'Carlos', 'Rueda', 'carlos.rueda@relojex.com', 3105552020, 'Técnico de Reparación', '2022-06-10',
 'admin_sys', CURRENT_TIMESTAMP, NULL, NULL),

(3, 10098765432, 'Sofía', 'Vargas', 'sofia.vargas@relojex.com', 3015553030, 'Atención al Cliente', '2023-01-20',
 'admin_sys', CURRENT_TIMESTAMP, NULL, NULL),

(4, 10123456789, 'Miguel', 'Salazar', 'miguel.salazar@relojex.com', 3005554040, 'Diseñador Gráfico', '2022-11-05',
 'admin_sys', CURRENT_TIMESTAMP, NULL, NULL),

(5, 10198765432, 'Elena', 'Pérez', 'elena.perez@relojex.com', 3135555050, 'Marketing Digital', '2023-05-12',
 'admin_sys', CURRENT_TIMESTAMP, NULL, NULL);


-- tabla eventos
INSERT INTO tab_Eventos (
    id_evento, titulo, descripcion, fecha_inicio, fecha_fin, id_sucursal
) VALUES
(1, 'Lanzamiento de la Colección Primavera 2025',
 'Presentación exclusiva de la nueva línea de relojes suizos con materiales sostenibles.',
 '2025-03-21 18:00:00', '2025-03-21 21:00:00', 1),

(2, 'Taller de Mantenimiento de Relojes Clásicos',
 'Sesión guiada por técnicos expertos sobre cómo cuidar y mantener relojes antiguos.',
 '2025-04-10 10:00:00', '2025-04-10 13:00:00', 2),

(3, 'Noche VIP: Clientes Premium',
 'Evento privado para nuestros mejores clientes con descuentos exclusivos y regalos.',
 '2025-05-05 19:00:00', '2025-05-05 22:00:00', 1),

(4, 'Exposición de Relojes de Colección',
 'Muestra abierta al público de piezas históricas y ediciones limitadas.',
 '2025-06-15 09:00:00', '2025-06-20 18:00:00', 3),

(5, 'Feria Tecnológica de Smartwatches',
 'Demostraciones en vivo de relojes inteligentes y charlas sobre tendencias del sector.',
 '2025-07-01 11:00:00', NULL, 2);


 -- tabla historrial_navegacion
 INSERT INTO tab_Historial_Navegacion (
    id_historial, id_usuario, pagina_visitada, fecha_visita
) VALUES
(1, 3, '/catalogo/relojes-de-lujo', '2025-07-25 08:12:33'),
(2, 1, '/servicios/mantenimiento', '2025-07-25 08:14:05'),
(3, 2, '/productos/reloj-cuarzo-acero', '2025-07-25 08:15:47'),
(4, NULL, '/promociones/temporada', '2025-07-25 08:17:12'),
(5, 4, '/blog/como-cuidar-tu-reloj-automatico', '2025-07-25 08:19:28'),
(6, NULL, '/contacto', '2025-07-25 08:20:44'),
(7, 5, '/mi-cuenta/historial-compras', '2025-07-25 08:22:09'),
(8, 3, '/productos/reloj-smart-dorado', '2025-07-25 08:24:31'),
(9, NULL, '/quienes-somos', '2025-07-25 08:26:18'),
(10, 1, '/servicios/personalizacion', '2025-07-25 08:29:02');


-- tabla direccion de envio
INSERT INTO tab_Direcciones_Envio (
    id_direccion, id_usuario, direccion_completa, ciudad, estado_provincia,
    codigo_postal, pais, es_predeterminada, usr_insert, fec_insert, usr_update, fec_update
) VALUES
(1, 1, 'Calle 45 #123-56, Edificio Altavista', 'Bogotá', 'Cundinamarca', '110111', 'Colombia', TRUE, 'admin', NOW(), NULL, NULL),
(2, 2, 'Av. Paulista 1578, Apto 504', 'São Paulo', 'São Paulo', '01310-200', 'Brasil', TRUE, 'admin', NOW(), NULL, NULL),
(3, 3, 'Carrera 7 #89-23, Torre Empresarial', 'Medellín', 'Antioquia', '050021', 'Colombia', TRUE, 'admin', NOW(), NULL, NULL),
(4, 4, 'Av. Los Leones 345, Depto 803', 'Santiago', 'Región Metropolitana', '8320000', 'Chile', TRUE, 'admin', NOW(), NULL, NULL),
(5, 5, 'Calle Real 980, Piso 2', 'Lima', 'Lima Metropolitana', '15074', 'Perú', TRUE, 'admin', NOW(), NULL, NULL),
(6, 6, 'Av. Insurgentes Sur 1234, Int 22', 'Ciudad de México', 'CDMX', '03100', 'México', TRUE, 'admin', NOW(), NULL, NULL),
(7, 7, 'Rua Augusta 321, Apto 11B', 'Belo Horizonte', 'Minas Gerais', '30190-130', 'Brasil', TRUE, 'admin', NOW(), NULL, NULL),
(8, 8, 'Cra. 15 #120-45, Casa 9', 'Barranquilla', 'Atlántico', '080001', 'Colombia', TRUE, 'admin', NOW(), NULL, NULL),
(9, 9, 'Av. Javier Prado Este 123, Torre C', 'Lima', 'Lima Metropolitana', '15036', 'Perú', TRUE, 'admin', NOW(), NULL, NULL),
(10, 10, 'Av. Colón 400, Piso 3', 'Buenos Aires', 'CABA', 'C1063', 'Argentina', TRUE, 'admin', NOW(), NULL, NULL);


-- tabla productos
INSERT INTO tab_Productos (
    id_producto, id_marca, nom_producto, descripcion, precio,
    id_categoria, id_subcategoria, stock, url_imagen,
    fecha_creacion, estado, usr_insert, fec_insert, usr_update, fec_update
) VALUES
(1, 1, 'Rolex Submariner Date', 'Reloj de buceo con caja de acero Oystersteel y bisel giratorio unidireccional.', 12500.00,
 1, 1, 15, 'https://relojeria.com/img/rolex_submariner.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(2, 2, 'Omega Speedmaster Moonwatch', 'Cronógrafo clásico utilizado en las misiones Apolo. Movimiento manual.', 7200.00,
 1, 2, 10, 'https://relojeria.com/img/omega_speedmaster.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(3, 3, 'Tag Heuer Carrera Calibre 16', 'Reloj deportivo elegante con cronógrafo y diseño clásico para pilotos.', 4800.00,
 1, 3, 25, 'https://relojeria.com/img/tag_carrera.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(4, 4, 'Seiko Prospex Turtle', 'Reloj automático de buceo con diseño retro y excelente relación calidad/precio.', 450.00,
 1, 1, 40, 'https://relojeria.com/img/seiko_turtle.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(5, 5, 'Casio G-Shock GA-2100', 'Reloj digital/analógico ultrarresistente, ideal para deportes extremos.', 120.00,
 2, 1, 100, 'https://relojeria.com/img/gshock_ga2100.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(6, 1, 'Rolex Datejust 41', 'Reloj elegante con ventana de fecha y diseño clásico. Caja Oyster de acero y oro.', 9600.00,
 1, 2, 12, 'https://relojeria.com/img/rolex_datejust.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(7, 3, 'Tag Heuer Aquaracer Professional 300', 'Diseñado para actividades marinas, con resistencia al agua hasta 300m.', 3900.00,
 1, 3, 20, 'https://relojeria.com/img/tag_aquaracer.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(8, 4, 'Seiko Presage Cocktail Time', 'Diseño inspirado en cócteles japoneses, ideal para uso formal.', 620.00,
 1, 2, 30, 'https://relojeria.com/img/seiko_presage.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(9, 5, 'Casio Vintage A168WG-9', 'Reloj digital con estilo retro dorado, asequible y funcional.', 50.00,
 2, 2, 150, 'https://relojeria.com/img/casio_vintage.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL),

(10, 2, 'Omega Seamaster Diver 300M', 'Reloj de buceo con válvula de helio y brazalete de acero inoxidable.', 5200.00,
 1, 1, 18, 'https://relojeria.com/img/omega_seamaster.jpg', NOW(), TRUE, 'admin', NOW(), NULL, NULL);


-- tabla carrito
INSERT INTO tab_Carrito (
    id_carrito, id_usuario, fecha_creacion, fecha_ultima_actualizacion, estado_carrito
) VALUES
(1, 1, NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days', 'convertido_a_orden'),
(2, 2, NOW() - INTERVAL '3 days', NOW() - INTERVAL '2 days', 'abandonado'),
(3, 3, NOW() - INTERVAL '1 day', NOW(), 'activo'),
(4, 4, NOW() - INTERVAL '8 days', NOW() - INTERVAL '6 days', 'convertido_a_orden'),
(5, 5, NOW() - INTERVAL '4 days', NOW() - INTERVAL '1 day', 'abandonado'),
(6, 6, NOW() - INTERVAL '12 days', NOW() - INTERVAL '2 days', 'convertido_a_orden'),
(7, 7, NOW() - INTERVAL '2 days', NOW(), 'activo'),
(8, 8, NOW() - INTERVAL '15 days', NOW() - INTERVAL '10 days', 'abandonado'),
(9, 9, NOW() - INTERVAL '7 days', NOW() - INTERVAL '1 day', 'activo'),
(10, 10, NOW() - INTERVAL '20 days', NOW() - INTERVAL '15 days', 'convertido_a_orden');


-- tabla carrito detalle
INSERT INTO tab_Carrito_Detalle (id_carrito_detalle, id_carrito, id_producto, cantidad) VALUES
(1, 1, 5, 2),
(2, 1, 3, 1),
(3, 2, 2, 3),
(4, 2, 8, 1),
(5, 3, 6, 4),
(6, 3, 7, 2),
(7, 3, 9, 1),
(8, 4, 1, 2),
(9, 5, 4, 3),
(10, 5, 10, 1),
(11, 6, 1, 2),
(12, 7, 3, 5),
(13, 7, 4, 2),
(14, 8, 6, 1),
(15, 9, 2, 3),
(16, 9, 5, 2),
(17, 10, 7, 1),
(18, 10, 8, 1),
(19, 10, 10, 2);


-- tabla orden
INSERT INTO tab_Orden (
    id_orden, id_usuario, fecha_orden, estado_orden, concepto, total_orden, 
    usr_insert, fec_insert, usr_update, fec_update
) VALUES
(1, 1, '2024-07-10 14:15:00', 'pendiente', 'Compra de relojes deportivos', 325000.00, 'admin', NOW(), NULL, NULL),
(2, 2, '2024-07-12 09:45:00', 'en proceso', 'Reloj automático + accesorios', 482500.00, 'admin', NOW(), NULL, NULL),
(3, 3, '2024-07-14 17:30:00', 'completado', 'Reloj de lujo con correa extra', 712000.00, 'admin', NOW(), NULL, NULL),
(4, 4, '2024-07-15 11:00:00', 'cancelado', 'Compra cancelada por usuario', 0.00, 'admin', NOW(), NULL, NULL),
(5, 5, '2024-07-18 13:25:00', 'pendiente', 'Kit de limpieza y pulido', 87500.00, 'admin', NOW(), NULL, NULL),
(6, 6, '2024-07-20 10:10:00', 'completado', 'Reloj sumergible profesional', 389900.00, 'admin', NOW(), NULL, NULL),
(7, 7, '2024-07-21 15:40:00', 'en proceso', 'Pedido mixto relojería', 215000.00, 'admin', NOW(), NULL, NULL),
(8, 8, '2024-07-22 19:50:00', 'completado', 'Reloj clásico y herramientas', 157800.00, 'admin', NOW(), NULL, NULL),
(9, 9, '2024-07-24 08:20:00', 'pendiente', 'Correa de cuero premium', 66500.00, 'admin', NOW(), NULL, NULL),
(10, 10, '2024-07-25 12:35:00', 'pendiente', 'Reloj cronógrafo y kit', 248300.00, 'admin', NOW(), NULL, NULL);


-- tabla detalle orden
INSERT INTO tab_Detalle_Orden (
    id_detalle_orden, id_orden, id_producto, cantidad, precio_unitario, id_promocion_aplicada, usr_insert,  fec_insert, usr_update, fec_update) 
    VALUES
(1, 1, 3, 2, 249999.99, 1, 'admin', NOW(), NULL, NULL),
(2, 1, 7, 1, 319999.99, NULL, 'admin', NOW(), NULL, NULL),
(3, 2, 5, 3, 189999.00, 2, 'admin', NOW(), NULL, NULL),
(4, 3, 9, 1, 999999.99, NULL, 'admin', NOW(), NULL, NULL),
(5, 4, 2, 1, 450000.00, 3, 'admin', NOW(), NULL, NULL),
(6, 5, 1, 2, 299999.99, NULL, 'admin', NOW(), NULL, NULL),
(7, 6, 4, 1, 329999.99, 1, 'admin', NOW(), NULL, NULL),
(8, 7, 6, 2, 219999.00, NULL, 'admin', NOW(), NULL, NULL),
(9, 8, 10, 1, 749999.99, 2, 'admin', NOW(), NULL, NULL),
(10, 9, 8, 1, 399999.00, NULL, 'admin', NOW(), NULL, NULL);


-- tabla orden servicios
INSERT INTO tab_Orden_Servicios (
    id_orden_servicio, id_orden, id_servicio, cantidad, precio_servicio_aplicado, usr_insert, fec_insert, usr_update, fec_update) 
    VALUES
(1, 1, 1, 1, 150000.00, 'admin', NOW(), NULL, NULL),
(2, 2, 3, 2, 100000.00, 'admin', NOW(), NULL, NULL),
(3, 3, 2, 1, 80000.00, 'admin', NOW(), NULL, NULL),
(4, 4, 4, 1, 95000.00, 'admin', NOW(), NULL, NULL),
(5, 5, 1, 2, 150000.00, 'admin', NOW(), NULL, NULL),
(6, 6, 5, 1, 120000.00, 'admin', NOW(), NULL, NULL),
(7, 7, 2, 1, 80000.00, 'admin', NOW(), NULL, NULL),
(8, 8, 3, 1, 100000.00, 'admin', NOW(), NULL, NULL),
(9, 9, 4, 2, 95000.00, 'admin', NOW(), NULL, NULL),
(10, 10, 5, 1, 120000.00, 'admin', NOW(), NULL, NULL);


-- tabla facturas
INSERT INTO tab_Facturas (
    id_factura, id_orden, id_usuario, fecha_emision, total_factura, estado_factura, usr_insert, fec_insert, usr_update, fec_update)
     VALUES
(1, 1, 1, NOW(), 459000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(2, 2, 2, NOW(), 525000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(3, 3, 3, NOW(), 920000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(4, 4, 4, NOW(), 1039000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(5, 5, 5, NOW(), 675000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(6, 6, 6, NOW(), 150000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(7, 7, 7, NOW(), 920000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(8, 8, 8, NOW(), 1175000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(9, 9, 9, NOW(), 870000.00, 'Emitida', 'admin', NOW(), NULL, NULL),
(10, 10, 10, NOW(), 845000.00, 'Emitida', 'admin', NOW(), NULL, NULL);


-- tabla detalle factura
INSERT INTO tab_Detalle_Factura (
    id_detalle_factura, id_factura, id_producto, cantidad, precio_unitario, subtotal_linea, usr_insert, fec_insert, usr_update, fec_update)
VALUES 
(1, 1, 1, 1, 250000.00, 250000.00, 'admin', NOW(), NULL, NULL),
(2, 2, 2, 1, 360000.00, 360000.00, 'admin', NOW(), NULL, NULL),
(3, 3, 3, 1, 185000.00, 185000.00, 'admin', NOW(), NULL, NULL),
(4, 4, 4, 1, 90000.00, 90000.00, 'admin', NOW(), NULL, NULL),
(5, 5, 5, 1, 135000.00, 135000.00, 'admin', NOW(), NULL, NULL),
(6, 6, 6, 1, 240000.00, 240000.00, 'admin', NOW(), NULL, NULL),
(7, 7, 7, 1, 320000.00, 320000.00, 'admin', NOW(), NULL, NULL),
(8, 8, 8, 1, 780000.00, 780000.00, 'admin', NOW(), NULL, NULL),
(9, 9, 9, 1, 210000.00, 210000.00, 'admin', NOW(), NULL, NULL),
(10, 10, 10, 1, 560000.00, 560000.00, 'admin', NOW(), NULL, NULL);


-- tabla envios
INSERT INTO tab_Envios (
    id_envio, id_orden, id_direccion_envio,
    metodo_envio, estado_envio,
    fecha_envio, fecha_entrega_estimada, costo_envio,
    usr_insert, fec_insert, usr_update, fec_update
)
VALUES
(1, 1, 1, 'DHL Express', 'entregado', '2025-07-20 10:00:00', '2025-07-21 16:00:00', 15000.00, 'admin', NOW(), NULL, NULL),
(2, 2, 2, 'FedEx Standard', 'en tránsito', '2025-07-21 09:30:00', '2025-07-23 12:00:00', 12000.00, 'admin', NOW(), NULL, NULL),
(3, 3, 3, 'Envío Local', 'pendiente', NULL, NULL, 8000.00, 'admin', NOW(), NULL, NULL),
(4, 4, 4, 'UPS Ground', 'cancelado', '2025-07-19 14:00:00', '2025-07-20 20:00:00', 10000.00, 'admin', NOW(), NULL, NULL),
(5, 5, 5, 'Servientrega', 'entregado', '2025-07-18 08:00:00', '2025-07-19 17:00:00', 9500.00, 'admin', NOW(), NULL, NULL),
(6, 6, 6, 'Coordinadora', 'entregado', '2025-07-17 13:15:00', '2025-07-18 18:30:00', 10000.00, 'admin', NOW(), NULL, NULL),
(7, 7, 7, 'FedEx Standard', 'en tránsito', '2025-07-22 11:00:00', '2025-07-24 15:00:00', 11000.00, 'admin', NOW(), NULL, NULL),
(8, 8, 8, 'DHL Express', 'pendiente', NULL, NULL, 14000.00, 'admin', NOW(), NULL, NULL),
(9, 9, 9, 'UPS Ground', 'en tránsito', '2025-07-21 10:45:00', '2025-07-23 13:00:00', 10500.00, 'admin', NOW(), NULL, NULL),
(10, 10, 10, 'Servientrega', 'entregado', '2025-07-16 09:00:00', '2025-07-17 12:00:00', 9500.00, 'admin', NOW(), NULL, NULL);


-- tabla opiniones 
INSERT INTO tab_Opiniones (
    id_opinion, id_usuario, id_producto, calificacion, comentario,
    fecha_opinion, usr_insert, fec_insert, usr_update, fec_update
)
VALUES
(1, 1, 3, 5, 'Excelente calidad y diseño. Muy satisfecho.', '2025-07-21 12:30:00', 'admin', NOW(), NULL, NULL),
(2, 2, 1, 4, 'Buen producto aunque el empaque llegó algo dañado.', '2025-07-22 10:00:00', 'admin', NOW(), NULL, NULL),
(3, 3, 5, 3, 'Funciona bien, pero esperaba más por el precio.', '2025-07-20 15:45:00', 'admin', NOW(), NULL, NULL),
(4, 4, 7, 5, 'Muy elegante, ideal para regalo.', '2025-07-19 18:20:00', 'admin', NOW(), NULL, NULL),
(5, 5, 2, 2, 'No me gustó el acabado, parece frágil.', '2025-07-23 09:10:00', 'admin', NOW(), NULL, NULL),
(6, 6, 4, 4, 'Buena relación calidad-precio.', '2025-07-22 17:00:00', 'admin', NOW(), NULL, NULL),
(7, 7, 6, 5, 'Espectacular. Se ve mejor que en las fotos.', '2025-07-24 11:45:00', 'admin', NOW(), NULL, NULL),
(8, 8, 8, 3, 'Normal, cumple con lo básico.', '2025-07-20 14:30:00', 'admin', NOW(), NULL, NULL),
(9, 9, 9, 4, 'Me gustó, aunque la correa se siente rígida al principio.', '2025-07-21 16:50:00', 'admin', NOW(), NULL, NULL),
(10, 10, 10, 5, 'Perfecto para coleccionistas. Detalles muy finos.', '2025-07-18 13:00:00', 'admin', NOW(), NULL, NULL);


-- tabla recepciones proveedores
INSERT INTO tab_Recepciones_Proveedor (
    id_recepcion, id_producto, id_proveedor, cantidad_recibida,
    fecha_recepcion, usr_insert, fec_insert, usr_update, fec_update
)
VALUES
(1, 1, 1, 30, '2025-07-15 09:00:00', 'admin', NOW(), NULL, NULL),
(2, 2, 2, 50, '2025-07-16 10:30:00', 'admin', NOW(), NULL, NULL),
(3, 3, 3, 40, '2025-07-17 11:15:00', 'admin', NOW(), NULL, NULL),
(4, 4, 4, 35, '2025-07-18 14:20:00', 'admin', NOW(), NULL, NULL),
(5, 5, 5, 60, '2025-07-19 08:45:00', 'admin', NOW(), NULL, NULL),
(6, 6, 1, 20, '2025-07-20 13:10:00', 'admin', NOW(), NULL, NULL),
(7, 7, 2, 25, '2025-07-21 15:55:00', 'admin', NOW(), NULL, NULL),
(8, 8, 3, 30, '2025-07-22 10:00:00', 'admin', NOW(), NULL, NULL),
(9, 9, 4, 40, '2025-07-23 09:30:00', 'admin', NOW(), NULL, NULL),
(10, 10, 5, 50, '2025-07-24 12:00:00', 'admin', NOW(), NULL, NULL);


-- tabla pagos 
INSERT INTO tab_Pagos (
    id_pago, id_orden, monto, id_metodo_pago, estado_pago,
    fecha_pago, usr_insert, fec_insert, usr_update, fec_update
)
VALUES
(1, 1, 299.99, 1, 'completado', '2025-07-15 10:00:00', 'admin', NOW(), NULL, NULL),
(2, 2, 199.50, 2, 'completado', '2025-07-16 11:30:00', 'admin', NOW(), NULL, NULL),
(3, 3, 145.75, 3, 'pendiente', '2025-07-17 12:20:00', 'admin', NOW(), NULL, NULL),
(4, 4, 389.90, 1, 'completado', '2025-07-18 14:45:00', 'admin', NOW(), NULL, NULL),
(5, 5, 89.99, 2, 'fallido', '2025-07-19 09:15:00', 'admin', NOW(), NULL, NULL),
(6, 6, 512.00, 3, 'completado', '2025-07-20 16:40:00', 'admin', NOW(), NULL, NULL),
(7, 7, 120.00, 1, 'pendiente', '2025-07-21 10:25:00', 'admin', NOW(), NULL, NULL),
(8, 8, 340.75, 2, 'completado', '2025-07-22 13:05:00', 'admin', NOW(), NULL, NULL),
(9, 9, 275.40, 3, 'reembolsado', '2025-07-23 08:30:00', 'admin', NOW(), NULL, NULL),
(10, 10, 99.95, 1, 'completado', '2025-07-24 11:50:00', 'admin', NOW(), NULL, NULL);


-- tabla productos promociones
INSERT INTO tab_Productos_Promociones (
    id_producto_promocion, id_producto, id_promocion,
    usr_insert, fec_insert, usr_update, fec_update
)
VALUES
(1, 1, 1, 'admin', NOW(), NULL, NULL),
(2, 2, 1, 'admin', NOW(), NULL, NULL),
(3, 3, 2, 'admin', NOW(), NULL, NULL),
(4, 4, 2, 'admin', NOW(), NULL, NULL),
(5, 5, 3, 'admin', NOW(), NULL, NULL),
(6, 6, 3, 'admin', NOW(), NULL, NULL),
(7, 7, 4, 'admin', NOW(), NULL, NULL),
(8, 8, 4, 'admin', NOW(), NULL, NULL),
(9, 9, 5, 'admin', NOW(), NULL, NULL),
(10, 10, 5, 'admin', NOW(), NULL, NULL);


-- tabla reservas
INSERT INTO tab_Reservas (
    id_reserva, id_usuario, id_servicio, fecha_reserva, estado_reserva,
    usr_insert, fec_insert, usr_update, fec_update
)
VALUES
(1, 3, 1, '2025-07-01 10:00:00', 'confirmada', 'admin', NOW(), NULL, NULL),
(2, 5, 2, '2025-07-03 15:30:00', 'pendiente', 'admin', NOW(), NULL, NULL),
(3, 7, 3, '2025-07-05 09:45:00', 'completada', 'admin', NOW(), NULL, NULL),
(4, 9, 4, '2025-07-06 13:00:00', 'cancelada', 'admin', NOW(), NULL, NULL),
(5, 11, 5, '2025-07-08 16:20:00', 'confirmada', 'admin', NOW(), NULL, NULL),
(6, 13, 1, '2025-07-10 11:15:00', 'pendiente', 'admin', NOW(), NULL, NULL),
(7, 15, 2, '2025-07-12 14:30:00', 'completada', 'admin', NOW(), NULL, NULL),
(8, 17, 3, '2025-07-14 12:00:00', 'pendiente', 'admin', NOW(), NULL, NULL),
(9, 19, 4, '2025-07-15 09:00:00', 'cancelada', 'admin', NOW(), NULL, NULL),
(10, 2, 5, '2025-07-16 17:45:00', 'confirmada', 'admin', NOW(), NULL, NULL);
