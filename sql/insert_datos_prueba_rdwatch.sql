INSERT INTO tab_Usuarios 
(
    id_usuario,
    nom_usuario,
    correo_usuario,
    num_telefono_usuario,
    direccion_principal,
    activo,
    password_usuario,
    rol_usuario,
    usr_insert,
    fec_insert
)
VALUES
(1, 'Carlos Ramírez', 'carlos@example.com', 3001234567, 'Cra 12 #34-56, Bogotá', TRUE, 
 '$2y$10$Z1iN7O7pF6O4N9e4D89DneM3V7bLz3qjML1a5oajxO7N0Hwb7dIum', 'admin', 'system', NOW()),

(2, 'María González', 'maria@example.com', 3119876543, 'Cl 45 #22-11, Medellín', TRUE, 
 '$2y$10$hD.qkDy.2gBTMQ8ME3beEuwuCqKp3mL7I4mJ3g6WPPbVbL0vZr6dK', 'user', 'system', NOW()),

(3, 'Andrés López', 'andres@example.com', 3205556677, 'Av 68 #33-21, Cali', TRUE, 
 '$2y$10$y1sKQwD/WI3z4cvlA6WHP.q5MqOCg3GxvAvzzqKzNG3j6A7AqIbWy', 'user', 'system', NOW()),

(4, 'Lucía Fernández', 'lucia@example.com', 3029988776, 'Calle 10 #25-30, Barranquilla', TRUE, 
 '$2y$10$LSc3PoKz6CAG3J4yJq8wUOv4xSRk6gkbK39k63vffTQy/2edGk/hK', 'user', 'system', NOW()),

(5, 'Julián Torres', 'julian@example.com', 3147788990, 'Carrera 50 #14-55, Bucaramanga', TRUE, 
 '$2y$10$W3Jq7Kn7wTzPLQm6lymHYuMSAAyvdYZhd8mZmsA6abjmhXBGstqTi', 'user', 'system', NOW());
