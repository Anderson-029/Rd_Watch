-- INSERT - Insertar usuario
CREATE OR REPLACE FUNCTION fun_insert_usuarios(
    wid_usuario tab_Usuarios.id_usuario%TYPE,
    wnom_usuario tab_Usuarios.nom_usuario%TYPE,
    wcorreo_usuario tab_Usuarios.correo_usuario%TYPE,
    wnum_telefono_usuario tab_Usuarios.num_telefono_usuario%TYPE,
    wdireccion_principal tab_Usuarios.direccion_principal%TYPE DEFAULT NULL
) RETURNS TEXT AS
$BODY$
    DECLARE wusuario tab_Usuarios.id_usuario%TYPE;
    BEGIN
        -- Verificar si ya existe un usuario con el mismo ID o correo
        SELECT id_usuario INTO wusuario FROM tab_Usuarios
        WHERE id_usuario = wid_usuario OR correo_usuario = wcorreo_usuario;
        
        IF FOUND THEN
            RETURN 'ERROR: Usuario ya existe con ese ID o correo electrónico';
        ELSE
            BEGIN
                INSERT INTO tab_Usuarios (id_usuario, nom_usuario, correo_usuario, num_telefono_usuario, direccion_principal, activo)
                VALUES (wid_usuario, wnom_usuario, wcorreo_usuario, wnum_telefono_usuario, wdireccion_principal, TRUE);
                
                RETURN 'SUCCESS: Usuario insertado correctamente con ID ' || wid_usuario;
            EXCEPTION
                WHEN OTHERS THEN
                    RETURN 'ERROR: ' || SQLERRM;
            END;
        END IF;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- UPDATE - Actualizar usuario
CREATE OR REPLACE FUNCTION fun_update_usuarios(
    wid_usuario tab_Usuarios.id_usuario%TYPE,
    wnom_usuario tab_Usuarios.nom_usuario%TYPE,
    wcorreo_usuario tab_Usuarios.correo_usuario%TYPE,
    wnum_telefono_usuario tab_Usuarios.num_telefono_usuario%TYPE,
    wdireccion_principal tab_Usuarios.direccion_principal%TYPE DEFAULT NULL
) RETURNS TEXT AS
$BODY$
    DECLARE 
        wcorreo_existente tab_Usuarios.id_usuario%TYPE;
    BEGIN
        -- Verificar si el nuevo correo ya existe en otro usuario
        SELECT id_usuario INTO wcorreo_existente FROM tab_Usuarios
        WHERE correo_usuario = wcorreo_usuario AND id_usuario != wid_usuario;
        
        IF FOUND THEN
            RETURN 'ERROR: El correo electrónico ya está registrado en otro usuario';
        END IF;
        
        -- Realizar la actualización
        UPDATE tab_Usuarios SET 
            nom_usuario = wnom_usuario,
            correo_usuario = wcorreo_usuario,
            num_telefono_usuario = wnum_telefono_usuario,
            direccion_principal = wdireccion_principal
        WHERE id_usuario = wid_usuario;
        
        IF FOUND THEN
            RETURN 'SUCCESS: Usuario actualizado correctamente';
        ELSE
            RETURN 'ERROR: No se encontró el usuario con ID ' || wid_usuario;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- DELETE - Eliminar usuario (soft delete)
CREATE OR REPLACE FUNCTION fun_delete_usuarios(
    wid_usuario tab_Usuarios.id_usuario%TYPE
) RETURNS TEXT AS
$BODY$
    BEGIN
        UPDATE tab_Usuarios SET activo = FALSE WHERE id_usuario = wid_usuario;
        IF FOUND THEN
            RETURN 'SUCCESS: Usuario desactivado correctamente';
        ELSE
            RETURN 'ERROR: No se encontró el usuario con ID ' || wid_usuario;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- ==========================================
-- CRUD TABLA: tab_Categorias 
-- ==========================================

-- INSERT - Insertar categoría
CREATE OR REPLACE FUNCTION fun_insert_categorias(
    wid_categoria tab_Categorias.id_categoria%TYPE,
    wnom_categoria tab_Categorias.nom_categoria%TYPE,
    wdescripcion_categoria tab_Categorias.descripcion_categoria%TYPE
) RETURNS TEXT AS
$BODY$
    DECLARE wcategoria tab_Categorias.id_categoria%TYPE;
    BEGIN
        -- Verificar si ya existe una categoría con el mismo ID o nombre
        SELECT id_categoria INTO wcategoria FROM tab_Categorias
        WHERE id_categoria = wid_categoria OR nom_categoria = wnom_categoria;
        
        IF FOUND THEN
            RETURN 'ERROR: Categoría ya existe con ese ID o nombre';
        ELSE
            BEGIN
                INSERT INTO tab_Categorias (id_categoria, nom_categoria, descripcion_categoria, estado)
                VALUES (wid_categoria, wnom_categoria, wdescripcion_categoria, TRUE);
                
                RETURN 'SUCCESS: Categoría insertada correctamente con ID ' || wid_categoria;
            EXCEPTION
                WHEN OTHERS THEN
                    RETURN 'ERROR: ' || SQLERRM;
            END;
        END IF;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- UPDATE - Actualizar categoría
CREATE OR REPLACE FUNCTION fun_update_categorias(
    wid_categoria tab_Categorias.id_categoria%TYPE,
    wnom_categoria tab_Categorias.nom_categoria%TYPE,
    wdescripcion_categoria tab_Categorias.descripcion_categoria%TYPE,
    westado tab_Categorias.estado%TYPE DEFAULT TRUE
) RETURNS TEXT AS
$BODY$
    DECLARE
        wnombre_existente tab_Categorias.id_categoria%TYPE;
    BEGIN
        -- Verificar si el nuevo nombre ya existe en otra categoría
        SELECT id_categoria INTO wnombre_existente FROM tab_Categorias
        WHERE nom_categoria = wnom_categoria AND id_categoria != wid_categoria;
        
        IF FOUND THEN
            RETURN 'ERROR: Ya existe otra categoría con ese nombre';
        END IF;
        
        -- Realizar la actualización
        UPDATE tab_Categorias SET 
            nom_categoria = wnom_categoria,
            descripcion_categoria = wdescripcion_categoria,
            estado = westado
        WHERE id_categoria = wid_categoria;
        
        IF FOUND THEN
            RETURN 'SUCCESS: Categoría actualizada correctamente';
        ELSE
            RETURN 'ERROR: No se encontró la categoría con ID ' || wid_categoria;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- DELETE - Eliminar categoría (soft delete)
CREATE OR REPLACE FUNCTION fun_delete_categorias(
    wid_categoria tab_Categorias.id_categoria%TYPE
) RETURNS TEXT AS
$BODY$
    BEGIN
        UPDATE tab_Categorias SET estado = FALSE WHERE id_categoria = wid_categoria;
        IF FOUND THEN
            RETURN 'SUCCESS: Categoría desactivada correctamente';
        ELSE
            RETURN 'ERROR: No se encontró la categoría con ID ' || wid_categoria;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- ==========================================
-- CRUD TABLA: tab_Marcas (CORREGIDO)
-- ==========================================

-- INSERT - Insertar marca
CREATE OR REPLACE FUNCTION fun_insert_marcas(
    wid_marca tab_Marcas.id_marca%TYPE,
    wnom_marca tab_Marcas.nom_marca%TYPE
) RETURNS TEXT AS
$BODY$
    DECLARE wmarca tab_Marcas.id_marca%TYPE;
    BEGIN
        -- Verificar si ya existe una marca con el mismo ID o nombre
        SELECT id_marca INTO wmarca FROM tab_Marcas
        WHERE id_marca = wid_marca OR nom_marca = wnom_marca;
        
        IF FOUND THEN
            RETURN 'ERROR: Marca ya existe con ese ID o nombre';
        ELSE
            BEGIN
                INSERT INTO tab_Marcas (id_marca, nom_marca, estado_marca)
                VALUES (wid_marca, wnom_marca, TRUE);
                
                RETURN 'SUCCESS: Marca insertada correctamente con ID ' || wid_marca;
            EXCEPTION
                WHEN OTHERS THEN
                    RETURN 'ERROR: ' || SQLERRM;
            END;
        END IF;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- UPDATE - Actualizar marca
CREATE OR REPLACE FUNCTION fun_update_marcas(
    wid_marca tab_Marcas.id_marca%TYPE,
    wnom_marca tab_Marcas.nom_marca%TYPE,
    westado_marca tab_Marcas.estado_marca%TYPE DEFAULT TRUE
) RETURNS TEXT AS
$BODY$
    DECLARE
        wnombre_existente tab_Marcas.id_marca%TYPE;
    BEGIN
        -- Verificar si el nuevo nombre ya existe en otra marca
        SELECT id_marca INTO wnombre_existente FROM tab_Marcas
        WHERE nom_marca = wnom_marca AND id_marca != wid_marca;
        
        IF FOUND THEN
            RETURN 'ERROR: Ya existe otra marca con ese nombre';
        END IF;
        
        -- Realizar la actualización
        UPDATE tab_Marcas SET 
            nom_marca = wnom_marca,
            estado_marca = westado_marca
        WHERE id_marca = wid_marca;
        
        IF FOUND THEN
            RETURN 'SUCCESS: Marca actualizada correctamente';
        ELSE
            RETURN 'ERROR: No se encontró la marca con ID ' || wid_marca;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- DELETE - Eliminar marca (soft delete)
CREATE OR REPLACE FUNCTION fun_delete_marcas(
    wid_marca tab_Marcas.id_marca%TYPE
) RETURNS TEXT AS
$BODY$
    BEGIN
        UPDATE tab_Marcas SET estado_marca = FALSE WHERE id_marca = wid_marca;
        IF FOUND THEN
            RETURN 'SUCCESS: Marca desactivada correctamente';
        ELSE
            RETURN 'ERROR: No se encontró la marca con ID ' || wid_marca;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;
-- ==========================================
-- CRUD TABLA: tab_Productos
-- ==========================================
-
CREATE OR REPLACE FUNCTION public.fun_insert_productos(
    wid_producto tab_Productos.id_producto%TYPE,         -- BIGINT
    wid_marca tab_Productos.id_marca%TYPE,               -- BIGINT
    wnom_producto tab_Productos.nom_producto%TYPE,       -- VARCHAR
    wdescripcion tab_Productos.descripcion%TYPE,         -- TEXT
    wprecio tab_Productos.precio%TYPE,                   -- NUMERIC
    wid_categoria tab_Productos.id_categoria%TYPE,       -- INTEGER
    wid_subcategoria tab_Productos.id_subcategoria%TYPE, -- INTEGER
    wstock tab_Productos.stock%TYPE,                     -- SMALLINT
    wurl_imagen tab_Productos.url_imagen%TYPE DEFAULT NULL -- VARCHAR
) RETURNS TEXT AS
$BODY$
DECLARE 
    wproducto tab_Productos.id_producto%TYPE;
    wmarca_existe BOOLEAN := FALSE;
    wcategoria_existe BOOLEAN := FALSE;
    wsubcategoria_existe BOOLEAN := FALSE;
BEGIN
    -- ID duplicado
    SELECT id_producto INTO wproducto FROM tab_Productos WHERE id_producto = wid_producto;
    IF FOUND THEN
        RETURN 'ERROR: El producto con ID ' || wid_producto || ' ya existe';
    END IF;

    -- Nombre duplicado
    SELECT id_producto INTO wproducto FROM tab_Productos
    WHERE LOWER(TRIM(nom_producto)) = LOWER(TRIM(wnom_producto));
    IF FOUND THEN
        RETURN 'ERROR: Ya existe un producto con el nombre: ' || wnom_producto;
    END IF;

    -- Obligatorios
    IF wid_producto IS NULL OR wid_producto <= 0 THEN
        RETURN 'ERROR: El ID del producto debe ser positivo';
    END IF;
    IF wnom_producto IS NULL OR TRIM(wnom_producto) = '' THEN
        RETURN 'ERROR: El nombre del producto no puede estar vacío';
    END IF;
    IF wdescripcion IS NULL OR TRIM(wdescripcion) = '' THEN
        RETURN 'ERROR: La descripción del producto no puede estar vacía';
    END IF;

    -- Rangos
    IF wprecio IS NULL OR wprecio <= 0 THEN
        RETURN 'ERROR: El precio debe ser mayor a cero';
    END IF;
    IF wstock IS NULL OR wstock < 0 THEN
        RETURN 'ERROR: El stock no puede ser negativo';
    END IF;

    -- FK Marca (OJO: tab_Marcas en plural)
    SELECT EXISTS(SELECT 1 FROM tab_Marcas WHERE id_marca = wid_marca AND estado_marca = TRUE)
    INTO wmarca_existe;
    IF NOT wmarca_existe THEN
        RETURN 'ERROR: La marca con ID ' || wid_marca || ' no existe o está inactiva';
    END IF;

    -- FK Categoría
    SELECT EXISTS(SELECT 1 FROM tab_Categorias WHERE id_categoria = wid_categoria AND estado = TRUE)
    INTO wcategoria_existe;
    IF NOT wcategoria_existe THEN
        RETURN 'ERROR: La categoría con ID ' || wid_categoria || ' no existe o está inactiva';
    END IF;

    -- FK Subcategoría
    SELECT EXISTS(
        SELECT 1 FROM tab_Subcategorias 
        WHERE id_categoria = wid_categoria 
          AND id_subcategoria = wid_subcategoria 
          AND estado = TRUE
    ) INTO wsubcategoria_existe;
    IF NOT wsubcategoria_existe THEN
        RETURN 'ERROR: La subcategoría ' || wid_subcategoria || ' no existe, está inactiva o no pertenece a la categoría ' || wid_categoria;
    END IF;

    -- URL imagen
    IF wurl_imagen IS NOT NULL AND TRIM(wurl_imagen) <> '' THEN
        IF LENGTH(wurl_imagen) > 255 THEN
            RETURN 'ERROR: La URL de la imagen no puede superar 255 caracteres';
        END IF;
        IF wurl_imagen NOT LIKE 'http://%' AND wurl_imagen NOT LIKE 'https://%' THEN
            RETURN 'ERROR: La URL de la imagen debe comenzar con http:// o https://';
        END IF;
    END IF;

    -- Inserción
    BEGIN
        INSERT INTO tab_Productos (
            id_producto, id_marca, nom_producto, descripcion, precio,
            id_categoria, id_subcategoria, stock, url_imagen, estado
        ) VALUES (
            wid_producto, wid_marca, TRIM(wnom_producto), TRIM(wdescripcion), wprecio,
            wid_categoria, wid_subcategoria, wstock,
            CASE WHEN wurl_imagen IS NULL OR TRIM(wurl_imagen) = '' THEN NULL ELSE TRIM(wurl_imagen) END,
            TRUE
        );
        RETURN 'SUCCESS: Producto insertado correctamente con ID ' || wid_producto;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
END;
$BODY$
LANGUAGE plpgsql;



-- UPDATE - Actualizar producto
CREATE OR REPLACE FUNCTION fun_update_productos(
    wid_producto tab_Productos.id_producto%TYPE,
    wid_marca tab_Productos.id_marca%TYPE,
    wnom_producto tab_Productos.nom_producto%TYPE,
    wdescripcion tab_Productos.descripcion%TYPE,
    wprecio tab_Productos.precio%TYPE,
    wid_categoria tab_Productos.id_categoria%TYPE,
    wid_subcategoria tab_Productos.id_subcategoria%TYPE,
    wstock tab_Productos.stock%TYPE,
    wurl_imagen tab_Productos.url_imagen%TYPE DEFAULT NULL,
    westado tab_Productos.estado%TYPE DEFAULT TRUE
) RETURNS TEXT AS
$BODY$
DECLARE
    wnombre_existente tab_Productos.id_producto%TYPE;
BEGIN
    -- Validar nombre duplicado
    SELECT id_producto INTO wnombre_existente FROM tab_Productos
    WHERE LOWER(TRIM(nom_producto)) = LOWER(TRIM(wnom_producto)) AND id_producto != wid_producto;
    IF FOUND THEN
        RETURN 'ERROR: Ya existe otro producto con el nombre: ' || wnom_producto;
    END IF;

    -- Validar valores básicos
    IF wprecio IS NULL OR wprecio <= 0 THEN
        RETURN 'ERROR: El precio debe ser mayor a cero';
    END IF;

    IF wstock IS NULL OR wstock < 0 THEN
        RETURN 'ERROR: El stock no puede ser negativo';
    END IF;

    -- Actualizar
    UPDATE tab_Productos SET
        id_marca = wid_marca,
        nom_producto = TRIM(wnom_producto),
        descripcion = TRIM(wdescripcion),
        precio = wprecio,
        id_categoria = wid_categoria,
        id_subcategoria = wid_subcategoria,
        stock = wstock,
        url_imagen = CASE WHEN wurl_imagen IS NULL OR TRIM(wurl_imagen) = '' THEN NULL ELSE TRIM(wurl_imagen) END,
        estado = westado
    WHERE id_producto = wid_producto;

    IF FOUND THEN
        RETURN 'SUCCESS: Producto actualizado correctamente';
    ELSE
        RETURN 'ERROR: No se encontró el producto con ID ' || wid_producto;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'ERROR: ' || SQLERRM;
END;
$BODY$
LANGUAGE PLPGSQL;


-- DELETE - Eliminar producto (soft delete)
CREATE OR REPLACE FUNCTION fun_delete_productos(
    wid_producto tab_Productos.id_producto%TYPE
) RETURNS TEXT AS
$BODY$
BEGIN
    UPDATE tab_Productos SET estado = FALSE WHERE id_producto = wid_producto;

    IF FOUND THEN
        RETURN 'SUCCESS: Producto desactivado correctamente';
    ELSE
        RETURN 'ERROR: No se encontró el producto con ID ' || wid_producto;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RETURN 'ERROR: ' || SQLERRM;
END;
$BODY$
LANGUAGE PLPGSQL;

-- ==========================================
-- CRUD TABLA: tab_Proveedor 
-- ==========================================

-- INSERT - Insertar proveedor
CREATE OR REPLACE FUNCTION fun_insert_proveedores(
    wid_proveedor tab_Proveedor.id_proveedor%TYPE,
    wnom_proveedor tab_Proveedor.nom_proveedor%TYPE,
    wtipo_documento tab_Proveedor.tipo_documento%TYPE,
    wnum_documento tab_Proveedor.num_documento%TYPE,
    wnum_telefono tab_Proveedor.num_telefono%TYPE,
    wcorreo tab_Proveedor.correo%TYPE,
    wdireccion tab_Proveedor.direccion%TYPE DEFAULT NULL
) RETURNS TEXT AS
$BODY$
    DECLARE wproveedor tab_Proveedor.id_proveedor%TYPE;
    BEGIN
        -- Verificar si ya existe un proveedor con el mismo ID, documento o correo
        SELECT id_proveedor INTO wproveedor FROM tab_Proveedor
        WHERE id_proveedor = wid_proveedor OR num_documento = wnum_documento OR correo = wcorreo;
        
        IF FOUND THEN
            RETURN 'ERROR: Proveedor ya existe con ese ID, documento o correo';
        ELSE
            BEGIN
                INSERT INTO tab_Proveedor (id_proveedor, nom_proveedor, tipo_documento, num_documento, 
                                         num_telefono, correo, direccion, estado)
                VALUES (wid_proveedor, wnom_proveedor, wtipo_documento, wnum_documento, 
                       wnum_telefono, wcorreo, wdireccion, TRUE);
                
                RETURN 'SUCCESS: Proveedor insertado correctamente con ID ' || wid_proveedor;
            EXCEPTION
                WHEN OTHERS THEN
                    RETURN 'ERROR: ' || SQLERRM;
            END;
        END IF;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- UPDATE - Actualizar proveedor
CREATE OR REPLACE FUNCTION fun_update_proveedores(
    wid_proveedor tab_Proveedor.id_proveedor%TYPE,
    wnom_proveedor tab_Proveedor.nom_proveedor%TYPE,
    wtipo_documento tab_Proveedor.tipo_documento%TYPE,
    wnum_documento tab_Proveedor.num_documento%TYPE,
    wnum_telefono tab_Proveedor.num_telefono%TYPE,
    wcorreo tab_Proveedor.correo%TYPE,
    wdireccion tab_Proveedor.direccion%TYPE DEFAULT NULL,
    westado tab_Proveedor.estado%TYPE DEFAULT TRUE
) RETURNS TEXT AS
$BODY$
    DECLARE
        wexistente tab_Proveedor.id_proveedor%TYPE;
    BEGIN
        -- Verificar si el documento o correo ya existen en otro proveedor
        SELECT id_proveedor INTO wexistente FROM tab_Proveedor
        WHERE (num_documento = wnum_documento OR correo = wcorreo) AND id_proveedor != wid_proveedor;
        
        IF FOUND THEN
            RETURN 'ERROR: Ya existe otro proveedor con ese documento o correo';
        END IF;
        
        -- Realizar la actualización
        UPDATE tab_Proveedor SET 
            nom_proveedor = wnom_proveedor,
            tipo_documento = wtipo_documento,
            num_documento = wnum_documento,
            num_telefono = wnum_telefono,
            correo = wcorreo,
            direccion = wdireccion,
            estado = westado
        WHERE id_proveedor = wid_proveedor;
        
        IF FOUND THEN
            RETURN 'SUCCESS: Proveedor actualizado correctamente';
        ELSE
            RETURN 'ERROR: No se encontró el proveedor con ID ' || wid_proveedor;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- DELETE - Eliminar proveedor (soft delete)
CREATE OR REPLACE FUNCTION fun_delete_proveedores(
    wid_proveedor tab_Proveedor.id_proveedor%TYPE
) RETURNS TEXT AS
$BODY$
    BEGIN
        UPDATE tab_Proveedor SET estado = FALSE WHERE id_proveedor = wid_proveedor;
        IF FOUND THEN
            RETURN 'SUCCESS: Proveedor desactivado correctamente';
        ELSE
            RETURN 'ERROR: No se encontró el proveedor con ID ' || wid_proveedor;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- ==========================================
-- CRUD TABLA: tab_Servicios 
-- ==========================================

-- INSERT - Insertar servicio
CREATE OR REPLACE FUNCTION fun_insert_servicios(
    wid_servicio tab_Servicios.id_servicio%TYPE,
    wnom_servicio tab_Servicios.nom_servicio%TYPE,
    wdescripcion tab_Servicios.descripcion%TYPE,
    wprecio_servicio tab_Servicios.precio_servicio%TYPE,
    wduracion_estimada tab_Servicios.duracion_estimada%TYPE
) RETURNS TEXT AS
$BODY$
    DECLARE wservicio tab_Servicios.id_servicio%TYPE;
    BEGIN
        -- Verificar si ya existe un servicio con el mismo ID o nombre
        SELECT id_servicio INTO wservicio FROM tab_Servicios
        WHERE id_servicio = wid_servicio OR nom_servicio = wnom_servicio;
        
        IF FOUND THEN
            RETURN 'ERROR: Servicio ya existe con ese ID o nombre';
        ELSE
            BEGIN
                INSERT INTO tab_Servicios (id_servicio, nom_servicio, descripcion, precio_servicio, duracion_estimada)
                VALUES (wid_servicio, wnom_servicio, wdescripcion, wprecio_servicio, wduracion_estimada);
                
                RETURN 'SUCCESS: Servicio insertado correctamente con ID ' || wid_servicio;
            EXCEPTION
                WHEN OTHERS THEN
                    RETURN 'ERROR: ' || SQLERRM;
            END;
        END IF;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- UPDATE - Actualizar servicio
CREATE OR REPLACE FUNCTION fun_update_servicios(
    wid_servicio tab_Servicios.id_servicio%TYPE,
    wnom_servicio tab_Servicios.nom_servicio%TYPE,
    wdescripcion tab_Servicios.descripcion%TYPE,
    wprecio_servicio tab_Servicios.precio_servicio%TYPE,
    wduracion_estimada tab_Servicios.duracion_estimada%TYPE
) RETURNS TEXT AS
$BODY$
    DECLARE
        wnombre_existente tab_Servicios.id_servicio%TYPE;
    BEGIN
        -- Verificar si el nuevo nombre ya existe en otro servicio
        SELECT id_servicio INTO wnombre_existente FROM tab_Servicios
        WHERE nom_servicio = wnom_servicio AND id_servicio != wid_servicio;
        
        IF FOUND THEN
            RETURN 'ERROR: Ya existe otro servicio con ese nombre';
        END IF;
        
        -- Realizar la actualización
        UPDATE tab_Servicios SET 
            nom_servicio = wnom_servicio,
            descripcion = wdescripcion,
            precio_servicio = wprecio_servicio,
            duracion_estimada = wduracion_estimada
        WHERE id_servicio = wid_servicio;
        
        IF FOUND THEN
            RETURN 'SUCCESS: Servicio actualizado correctamente';
        ELSE
            RETURN 'ERROR: No se encontró el servicio con ID ' || wid_servicio;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- DELETE - Eliminar servicio (hard delete)
CREATE OR REPLACE FUNCTION fun_delete_servicios(
    wid_servicio tab_Servicios.id_servicio%TYPE
) RETURNS TEXT AS
$BODY$
    BEGIN
        DELETE FROM tab_Servicios WHERE id_servicio = wid_servicio;
        IF FOUND THEN
            RETURN 'SUCCESS: Servicio eliminado correctamente';
        ELSE
            RETURN 'ERROR: No se encontró el servicio con ID ' || wid_servicio;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- ==========================================
-- CRUD TABLA: tab_Orden 
-- ==========================================

-- INSERT - Insertar orden
CREATE OR REPLACE FUNCTION fun_insert_ordenes(
    wid_orden tab_Orden.id_orden%TYPE,
    wid_usuario tab_Orden.id_usuario%TYPE,
    westado_orden tab_Orden.estado_orden%TYPE,
    wtotal_orden tab_Orden.total_orden%TYPE,
    wconcepto tab_Orden.concepto%TYPE DEFAULT NULL
) RETURNS TEXT AS
$BODY$
    DECLARE 
        worden tab_Orden.id_orden%TYPE;
        wusuario_existe BOOLEAN;
    BEGIN
        -- Verificar si la orden ya existe
        SELECT id_orden INTO worden FROM tab_Orden WHERE id_orden = wid_orden;
        IF FOUND THEN
            RETURN 'ERROR: Orden ya existe con ID ' || wid_orden;
        END IF;
        
        -- Verificar si el usuario existe y está activo
        SELECT EXISTS(SELECT 1 FROM tab_Usuarios WHERE id_usuario = wid_usuario AND activo = TRUE) INTO wusuario_existe;
        IF NOT wusuario_existe THEN
            RETURN 'ERROR: El usuario no existe o está inactivo';
        END IF;
        
        BEGIN
            INSERT INTO tab_Orden (id_orden, id_usuario, estado_orden, total_orden, concepto)
            VALUES (wid_orden, wid_usuario, westado_orden, wtotal_orden, wconcepto);
            
            RETURN 'SUCCESS: Orden insertada correctamente con ID ' || wid_orden;
        EXCEPTION
            WHEN OTHERS THEN
                RETURN 'ERROR: ' || SQLERRM;
        END;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- UPDATE - Actualizar orden
CREATE OR REPLACE FUNCTION fun_update_ordenes(
    wid_orden tab_Orden.id_orden%TYPE,
    westado_orden tab_Orden.estado_orden%TYPE,
    wconcepto tab_Orden.concepto%TYPE,
    wtotal_orden tab_Orden.total_orden%TYPE
) RETURNS TEXT AS
$BODY$
    BEGIN
        UPDATE tab_Orden SET 
            estado_orden = westado_orden,
            concepto = wconcepto,
            total_orden = wtotal_orden
        WHERE id_orden = wid_orden;
        
        IF FOUND THEN
            RETURN 'SUCCESS: Orden actualizada correctamente';
        ELSE
            RETURN 'ERROR: No se encontró la orden con ID ' || wid_orden;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;

-- DELETE - Cancelar orden
CREATE OR REPLACE FUNCTION fun_cancel_ordenes(
    wid_orden tab_Orden.id_orden%TYPE
) RETURNS TEXT AS
$BODY$
    BEGIN
        UPDATE tab_Orden SET estado_orden = 'cancelado'
        WHERE id_orden = wid_orden;
        
        IF FOUND THEN
            RETURN 'SUCCESS: Orden cancelada correctamente';
        ELSE
            RETURN 'ERROR: No se encontró la orden con ID ' || wid_orden;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'ERROR: ' || SQLERRM;
    END;
$BODY$
LANGUAGE PLPGSQL;