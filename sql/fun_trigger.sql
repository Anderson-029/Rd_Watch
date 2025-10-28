-- =====================================================
-- TRIGGERS DE AUDITORÍA PARA TODAS LAS TABLAS
-- =====================================================

/**********************/
/* Tabla de Usuarios  */
/**********************/
CREATE TRIGGER tri_audit_usuarios 
    BEFORE INSERT OR UPDATE ON tab_Usuarios
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*************************/
/* Tabla de Categorías  */
/*************************/
CREATE TRIGGER tri_audit_categorias 
    BEFORE INSERT OR UPDATE ON tab_Categorias
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/****************************/
/* Tabla de Subcategorías  */
/****************************/
CREATE TRIGGER tri_audit_subcategorias 
    BEFORE INSERT OR UPDATE ON tab_Subcategorias
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*******************/
/* Tabla de Marca  */
/*******************/
CREATE TRIGGER tri_audit_marca 
    BEFORE INSERT OR UPDATE ON tab_Marcas
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/***********************/
/* Tabla de Proveedor  */
/***********************/
CREATE TRIGGER tri_audit_proveedor 
    BEFORE INSERT OR UPDATE ON tab_Proveedor
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*****************************/
/* Tabla de Métodos de Pago  */
/*****************************/
CREATE TRIGGER tri_audit_metodos_pago 
    BEFORE INSERT OR UPDATE ON tab_Metodos_Pago
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*************************************/
/* Tabla de Usuario Método de Pago  */
/*************************************/
CREATE TRIGGER tri_audit_usuario_metodo_pago 
    BEFORE INSERT OR UPDATE ON tab_Usuario_Metodo_Pago
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*************************/
/* Tabla de Promociones  */
/*************************/
CREATE TRIGGER tri_audit_promociones 
    BEFORE INSERT OR UPDATE ON tab_Promociones
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/**********************/
/* Tabla de Servicios  */
/**********************/
CREATE TRIGGER tri_audit_servicios 
    BEFORE INSERT OR UPDATE ON tab_Servicios
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/**********************/
/* Tabla de Contacto  */
/**********************/
CREATE TRIGGER tri_audit_contacto 
    BEFORE INSERT OR UPDATE ON tab_Contacto
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/***********************/
/* Tabla de Empleados  */
/***********************/
CREATE TRIGGER tri_audit_empleados 
    BEFORE INSERT OR UPDATE ON tab_Empleados
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*********************/
/* Tabla de Eventos  */
/*********************/
CREATE TRIGGER tri_audit_eventos 
    BEFORE INSERT OR UPDATE ON tab_Eventos
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/**********************/
/* Tabla de Ciudades  */
/**********************/
CREATE TRIGGER tri_audit_ciudades 
    BEFORE INSERT OR UPDATE ON tab_Ciudades
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*********************************/
/* Tabla de Direcciones de Envío  */
/*********************************/
CREATE TRIGGER tri_audit_direcciones_envio 
    BEFORE INSERT OR UPDATE ON tab_Direcciones_Envio
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/***********************/
/* Tabla de Productos  */
/***********************/
CREATE TRIGGER tri_audit_productos 
    BEFORE INSERT OR UPDATE ON tab_Productos
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*********************/
/* Tabla de Carrito  */
/*********************/
CREATE TRIGGER tri_audit_carrito 
    BEFORE INSERT OR UPDATE ON tab_Carrito
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*****************************/
/* Tabla de Carrito Detalle  */
/*****************************/
CREATE TRIGGER tri_audit_carrito_detalle 
    BEFORE INSERT OR UPDATE ON tab_Carrito_Detalle
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*******************/
/* Tabla de Orden  */
/*******************/
CREATE TRIGGER tri_audit_orden 
    BEFORE INSERT OR UPDATE ON tab_Orden
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/****************************/
/* Tabla de Detalle Orden  */
/****************************/
CREATE TRIGGER tri_audit_detalle_orden 
    BEFORE INSERT OR UPDATE ON tab_Detalle_Orden
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*****************************/
/* Tabla de Orden Servicios  */
/*****************************/
CREATE TRIGGER tri_audit_orden_servicios 
    BEFORE INSERT OR UPDATE ON tab_Orden_Servicios
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/**********************/
/* Tabla de Facturas  */
/**********************/
CREATE TRIGGER tri_audit_facturas 
    BEFORE INSERT OR UPDATE ON tab_Facturas
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*******************************/
/* Tabla de Detalle Factura  */
/*******************************/
CREATE TRIGGER tri_audit_detalle_factura 
    BEFORE INSERT OR UPDATE ON tab_Detalle_Factura
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*********************/
/* Tabla de Envíos  */
/*********************/
CREATE TRIGGER tri_audit_envios 
    BEFORE INSERT OR UPDATE ON tab_Envios
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/**********************/
/* Tabla de Opiniones  */
/**********************/
CREATE TRIGGER tri_audit_opiniones 
    BEFORE INSERT OR UPDATE ON tab_Opiniones
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/**********************************/
/* Tabla de Recepciones Proveedor  */
/**********************************/
CREATE TRIGGER tri_audit_recepciones_proveedor 
    BEFORE INSERT OR UPDATE ON tab_Recepciones_Proveedor
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/*******************/
/* Tabla de Pagos  */
/*******************/
CREATE TRIGGER tri_audit_pagos 
    BEFORE INSERT OR UPDATE ON tab_Pagos
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/************************************/
/* Tabla de Productos Promociones  */
/************************************/
CREATE TRIGGER tri_audit_productos_promociones 
    BEFORE INSERT OR UPDATE ON tab_Productos_Promociones
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();

/**********************/
/* Tabla de Reservas  */
/**********************/
CREATE TRIGGER tri_audit_reservas 
    BEFORE INSERT OR UPDATE ON tab_Reservas
    FOR EACH ROW EXECUTE PROCEDURE fun_audit_rdwatch();
