INSERT INTO tab_Usuarios (id_usuario, nom_usuario, correo_usuario, num_telefono_usuario, direccion_principal, fecha_registro, activo)
VALUES 
(1, 'Juan Pérez', 'juan.perez@email.com', 573001234567, 'Calle 123 #45-67, Bogotá', '2023-01-15 10:00:00', TRUE),
(2, 'María Gómez', 'maria.gomez@email.com', 573002345678, 'Avenida 5 #23-45, Medellín', '2023-02-20 14:30:00', TRUE),
(3, 'Carlos Rodríguez', 'carlos.rod@email.com', 573003456789, 'Carrera 7 #12-34, Cali', '2023-03-10 09:15:00', TRUE),
(4, 'Ana López', 'ana.lopez@email.com', 573004567890, 'Diagonal 23 #34-56, Barranquilla', '2023-04-05 16:45:00', TRUE),
(5, 'Pedro Martínez', 'pedro.mart@email.com', 573005678901, 'Transversal 8 #9-10, Cartagena', '2023-05-12 11:20:00', TRUE);


INSERT INTO tab_Categorias (id_categoria, nom_categoria, descripcion_categoria, estado)
VALUES 
(1, 'Relojes de Pulsera', 'Relojes diseñados para usarse en la muñeca', TRUE),
(2, 'Relojes de Bolsillo', 'Relojes clásicos que se llevan en el bolsillo', TRUE),
(3, 'Relojes de Pared', 'Relojes decorativos para colgar en paredes', TRUE),
(4, 'Relojes Inteligentes', 'Dispositivos con funcionalidades avanzadas', TRUE);


INSERT INTO tab_Subcategorias (id_categoria, id_subcategoria, nom_subcategoria, estado)
VALUES 
(1, 1, 'Relojes Analógicos', TRUE),
(1, 2, 'Relojes Digitales', TRUE),
(1, 3, 'Relojes Deportivos', TRUE),
(2, 1, 'Relojes de Cadena', TRUE),
(2, 2, 'Relojes Antiguos', TRUE),
(3, 1, 'Relojes de Cocina', TRUE),
(3, 2, 'Relojes de Salón', TRUE),
(4, 1, 'Smartwatches', TRUE),
(4, 2, 'Fitness Trackers', TRUE);


CREATE TABLE IF NOT EXISTS tab_Marca
(
    id_marca                    INT, -- Identificador único de la marca
    nom_marca                   VARCHAR(100) NOT NULL, -- Nombre de la marca
    estado_marca                BOOLEAN DEFAULT TRUE, -- Indica si la marca está activa o inactiva

    PRIMARY KEY (id_marca),
    UNIQUE (nom_marca)
);




