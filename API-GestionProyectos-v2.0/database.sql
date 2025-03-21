-- SQL script to create the database schema

CREATE TABLE Roles (
    id INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Permisos (
    id INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE Roles_Permisos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    rol_id INT NOT NULL,
    permiso_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES Roles(id),
    FOREIGN KEY (permiso_id) REFERENCES Permisos(id)
);

CREATE TABLE Usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    carrera_profesional VARCHAR(100),
    pais VARCHAR(50),
    carnet_empresarial VARCHAR(20) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES Roles(id)
);

CREATE TABLE Proyectos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE,
    fecha_fin DATE,
    gerente_id INT,
    FOREIGN KEY (gerente_id) REFERENCES Usuarios(id)
);

CREATE TABLE Usuarios_Proyectos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    proyecto_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id),
    FOREIGN KEY (proyecto_id) REFERENCES Proyectos(id)
);

CREATE TABLE Tareas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    estado VARCHAR(20) NOT NULL,
    proyecto_id INT NOT NULL,
    asignado_a INT,
    FOREIGN KEY (proyecto_id) REFERENCES Proyectos(id),
    FOREIGN KEY (asignado_a) REFERENCES Usuarios(id)
);

CREATE TABLE Comentarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tarea_id INT NOT NULL,
    usuario_id INT NOT NULL,
    comentario TEXT,
    fecha DATETIME NOT NULL,
    FOREIGN KEY (tarea_id) REFERENCES Tareas(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

CREATE TABLE Codigos_Verificacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    codigo VARCHAR(255) NOT NULL,
    expiracion DATETIME NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

-- Insert default roles
INSERT INTO Roles (id, nombre) VALUES
(1, 'Administrador'),
(2, 'Gerente de Proyecto'),
(3, 'Miembro del Equipo');

-- Insert default permissions
INSERT INTO Permisos (id, nombre) VALUES
(1, 'Gestionar usuarios'),
(2, 'Crear proyectos'),
(3, 'Asignar tareas'),
(4, 'Ver reportes de actividad'),
(5, 'Editar proyectos'),
(6, 'Eliminar proyectos'),
(7, 'Modificar estados de tareas'),
(8, 'Gestionar comentarios en tareas'),
(9, 'Ver proyectos asignados'),
(10, 'Actualizar estado de tareas'),
(11, 'Agregar comentarios en tareas'),
(12, 'Ver detalles del proyecto');

-- Assign permissions to roles
INSERT INTO Roles_Permisos (rol_id, permiso_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12),
(2, 2), (2, 3), (2, 5), (2, 6), (2, 7), (2, 8), (2, 9), (2, 10), (2, 11), (2, 12),
(3, 9), (3, 10), (3, 11), (3, 12);
