# Sistema de Gestión de Proyectos 🚀

![Banner del Proyecto][imagen-proyecto]

> Este es un sistema de gestión de proyectos desarrollado con React y Next.js, diseñado para permitir a los usuarios registrarse, iniciar sesión y gestionar proyectos y tareas de manera eficiente.

## 📚 Información Académica

Este proyecto fue desarrollado como parte de la evaluación para la asignatura:

**Universidad:** [Universidad Don Bosco]

**Facultad:** [Factultad de ingenieria]

**Asignatura:** [Programación de Software Multiplataforma - DPS]

**Docente:** [Ing. Alexander Alberto Siguenza Campos]

## 🌐 Demo en vivo
[Ver demostración](url)

## 🛠 Tecnologías utilizadas

## 👥 Equipo de desarrollo
<div align="center">
  <table>
    <tr>
      <td align="center" style="padding: 15px; border-radius: 10px; background: #f4f4f4; box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);">
        <a href="https://www.linkedin.com/in/isidro-marroquin-51a028264/">
          <img src="https://github.com/marroquin9953.png" alt="Foto Perfil 1" width="110" height="110" style="border-radius:50%; border: 3px solid #4CAF50;"/>
          <br />
          <sub><b>Isidro Marroquin</b></sub>
          <br />
          <sub style="color: gray;">ME221443</sub>
        </a>
      </td>
      <td align="center" style="padding: 15px; border-radius: 10px; background: #f4f4f4; box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);">
        <a href="https://www.linkedin.com/in/usuario2/">
          <img src="https://github.com/Emilia04.png" alt="Foto Perfil 2" width="110" height="110" style="border-radius:50%; border: 3px solid #2196F3;"/>
          <br />
          <sub><b>Emilia Barreiro</b></sub>
          <br />
          <sub style="color: gray;">MB211545</sub>
        </a>
      </td>
      <td align="center" style="padding: 15px; border-radius: 10px; background: #f4f4f4; box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);">
        <a href="https://www.linkedin.com/in/usuario3/">
          <img src="https://github.com/mario-diaz9.png" alt="Foto Perfil 3" width="110" height="110" style="border-radius:50%; border: 3px solid #2196F3;"/>
          <br />
          <sub><b>Mario Diaz</b></sub>
          <br />
          <sub style="color: gray;">DA202822</sub>
        </a>
      </td>
    </tr>
  </table>
</div>

## 🚀 Hosting para el Front-End
Este proyecto está alojado en VPS Privado, con fines de aplicaciones web estáticas.
[Ver pagina oficional](url)

## 🚀 Hosting para API-REST
Esta API-REST está alojado en la plataforma Railway. Puedes acceder a la documentación completa de la API en el siguiente enlace:
[Documentación API](https://sistema-de-gestion-de-proyectos-production.up.railway.app/api-docs/)
![Banner de API][imagen-API-DOCS]

Link enlace video explicativo🔗
https://drive.google.com/file/d/16CEVR3m0PzSEbvEvGjocrptzpubbS5co/view?usp=share_link

## Estructura del Proyecto

```
📁 Proyecto/
```

## Caracteristicas

Este proyecto para gestionar proyectos que incluye las siguientes características:
- Autenticación de usuarios (registro e inicio de sesión).
- Creación, edición y eliminación de proyectos.
- Gestión de tareas dentro de cada proyecto.
- Interfaz moderna y responsiva.
- Integración con una API REST para almacenamiento y recuperación de datos (Back-End).

## 🔧 Instalación y uso
1. Clona este repositorio
```bash
git clone https://github.com/marroquin9953/Sistema-de-Gestion-de-Proyectos.git
```
2. ¡Listo para usar!

## Configuración del Proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run dev
```

3. Construir para producción:
```bash
npm run build
```


## 📊 Diseño de Base de Datos DPS

### 🔍 Visualización del Diagrama
**Diagrama Completo:** [Visualizar Diagrama Entidad-Relación](https://drawsql.app/teams/universidad-don-bosco/diagrams/dps/embed)

![Diagrama de Base de Datos](https://i.ibb.co/5WpqK0tf/Diagrama-BD-DPS.jpg)

### 🔍 Información General
- **Sistema de Gestión de Bases de Datos:** MySQL
- **Versión de MySQL:** 8.0.41
- **Nombre de la Base de Datos:** DPS

### 🗂️ Estructura de Tablas Principales

1. **Usuarios**
   - Gestiona la información de los usuarios del sistema
   - Campos clave: nombres, apellidos, correo, carnet_empresarial, rol

2. **Roles**
   - Define los roles de usuarios en el sistema
   - Roles predefinidos: Administrador, Gerente de Proyecto, Miembro del Equipo

3. **Permisos**
   - Gestiona los permisos específicos en el sistema
   - Incluye permisos como: Gestionar usuarios, Crear proyectos, Asignar tareas

4. **Proyectos**
   - Almacena información de los proyectos
   - Campos: nombre, descripción, fecha de inicio, fecha de fin, gerente

5. **Tareas**
   - Contiene las tareas asociadas a proyectos
   - Estados: Pendiente (por defecto)
   - Relacionada con Proyectos y Usuarios

6. **Comentarios**
   - Registro de comentarios en tareas
   - Vinculada a Tareas y Usuarios

7. **Códigos_Verificacion**
   - Gestión de códigos de verificación para usuarios

### 🔗 Relaciones Principales
- Usuarios tienen Roles
- Roles tienen Permisos
- Proyectos tienen Gerentes (Usuarios)
- Tareas se asignan a Usuarios y pertenecen a Proyectos
- Comentarios se asocian a Tareas y Usuarios

### 🔒 Características de Seguridad
- Contraseñas encriptadas
- Sistema de roles y permisos
- Restricciones de integridad referencial
- Unicidad de correo y carnet empresarial

### 📋 Roles y Permisos Detallados

#### Administrador
- Permisos completos: gestión de usuarios, proyectos, tareas y configuración

#### Gerente de Proyecto
- Puede crear, editar y gestionar proyectos
- Asignar tareas
- Gestionar comentarios

#### Miembro del Equipo
- Ver proyectos asignados
- Actualizar estado de tareas
- Agregar comentarios

### 🛠️ Configuración Inicial

#### Requisitos
- MySQL 8.0 o superior
- Soporte para UTF-8 (utf8mb4)

#### Base de datos
```sql
-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 28-03-2025 a las 15:24:40
-- Versión del servidor: 8.0.41-0ubuntu0.20.04.1
-- Versión de PHP: 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `DPS`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Codigos_Verificacion`
--

CREATE TABLE `Codigos_Verificacion` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `expiracion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Codigos_Verificacion`
--

INSERT INTO `Codigos_Verificacion` (`id`, `usuario_id`, `codigo`, `expiracion`) VALUES
(7, 3, '385343', '2025-03-20 17:26:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Comentarios`
--

CREATE TABLE `Comentarios` (
  `id` int NOT NULL,
  `tarea_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `comentario` text,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Permisos`
--

CREATE TABLE `Permisos` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Permisos`
--

INSERT INTO `Permisos` (`id`, `nombre`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Proyectos`
--

CREATE TABLE `Proyectos` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `gerente_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles`
--

CREATE TABLE `Roles` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Roles`
--

INSERT INTO `Roles` (`id`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Gerente de Proyecto'),
(3, 'Miembro del Equipo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Roles_Permisos`
--

CREATE TABLE `Roles_Permisos` (
  `id` int NOT NULL,
  `rol_id` int NOT NULL,
  `permiso_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Roles_Permisos`
--

INSERT INTO `Roles_Permisos` (`id`, `rol_id`, `permiso_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 2, 2),
(14, 2, 3),
(15, 2, 5),
(16, 2, 6),
(17, 2, 7),
(18, 2, 8),
(19, 2, 9),
(20, 2, 10),
(21, 2, 11),
(22, 2, 12),
(23, 3, 9),
(24, 3, 10),
(25, 3, 11),
(26, 3, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Tareas`
--

CREATE TABLE `Tareas` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `estado` varchar(20) NOT NULL DEFAULT 'Pendiente',
  `proyecto_id` int NOT NULL,
  `asignado_a` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `id` int NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `carrera_profesional` varchar(100) DEFAULT NULL,
  `pais` varchar(50) DEFAULT NULL,
  `carnet_empresarial` varchar(20) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `rol_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`id`, `nombres`, `apellidos`, `correo`, `telefono`, `carrera_profesional`, `pais`, `carnet_empresarial`, `contraseña`, `rol_id`) VALUES
(1, 'Isidro', 'Marroquin Echeverria', 'marroquin9953@gmail.com', '50377933141', 'Ingeniero en sistemas', 'SV', 'IM-1742453693192', '$2b$10$AK5/Lsz0ZxvVbsbSfxlCHeBo4IP2WTUSVhNgwcjHZZ18IcIcWRxHq', 1),
(2, 'Mar', 'Marroquin', 'alexandermarqn@gmail.com', '50372064733', 'Ingeniera Biomedica', 'SV', 'MM-1742454285449', '$2b$10$dQ2fuDFEwmPoB05mpCnnx.6ZZM0cje250Eg8WGn9h6l9rJMUc8T/i', 3),
(3, 'Marts', 'Cabrera', 'isidro.marroquin@udb.edu.sv', '50372064733', 'Ingeniera', 'SV', 'MC-1742480257977', '$2b$10$32D5yk1tvnLOLUCq4Z0qau/gZfwwx6zoSVQOKAhBqGaL/NEtaEI4u', 3),
(4, 'Juan Carlos', 'Rodríguez López', 'juancarlos@ejemplo.com', '+51987654321', 'Ingeniería de Software', 'Perú', 'JR-1742482532097', '$2b$10$Rn6FpTca6wZaUG2j9CmIl.2JMN.4ifWl9RWgrbAmGyNB7LoZ.oPXu', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios_Proyectos`
--

CREATE TABLE `Usuarios_Proyectos` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `proyecto_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Codigos_Verificacion`
--
ALTER TABLE `Codigos_Verificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tarea_id` (`tarea_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `Permisos`
--
ALTER TABLE `Permisos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Proyectos`
--
ALTER TABLE `Proyectos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gerente_id` (`gerente_id`);

--
-- Indices de la tabla `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Roles_Permisos`
--
ALTER TABLE `Roles_Permisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_id` (`rol_id`),
  ADD KEY `permiso_id` (`permiso_id`);

--
-- Indices de la tabla `Tareas`
--
ALTER TABLE `Tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proyecto_id` (`proyecto_id`),
  ADD KEY `asignado_a` (`asignado_a`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `carnet_empresarial` (`carnet_empresarial`),
  ADD KEY `rol_id` (`rol_id`);

--
-- Indices de la tabla `Usuarios_Proyectos`
--
ALTER TABLE `Usuarios_Proyectos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `proyecto_id` (`proyecto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Codigos_Verificacion`
--
ALTER TABLE `Codigos_Verificacion`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Proyectos`
--
ALTER TABLE `Proyectos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Roles_Permisos`
--
ALTER TABLE `Roles_Permisos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `Tareas`
--
ALTER TABLE `Tareas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Usuarios_Proyectos`
--
ALTER TABLE `Usuarios_Proyectos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Codigos_Verificacion`
--
ALTER TABLE `Codigos_Verificacion`
  ADD CONSTRAINT `Codigos_Verificacion_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `Comentarios`
--
ALTER TABLE `Comentarios`
  ADD CONSTRAINT `Comentarios_ibfk_1` FOREIGN KEY (`tarea_id`) REFERENCES `Tareas` (`id`),
  ADD CONSTRAINT `Comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `Proyectos`
--
ALTER TABLE `Proyectos`
  ADD CONSTRAINT `Proyectos_ibfk_1` FOREIGN KEY (`gerente_id`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `Roles_Permisos`
--
ALTER TABLE `Roles_Permisos`
  ADD CONSTRAINT `Roles_Permisos_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `Roles` (`id`),
  ADD CONSTRAINT `Roles_Permisos_ibfk_2` FOREIGN KEY (`permiso_id`) REFERENCES `Permisos` (`id`);

--
-- Filtros para la tabla `Tareas`
--
ALTER TABLE `Tareas`
  ADD CONSTRAINT `Tareas_ibfk_1` FOREIGN KEY (`proyecto_id`) REFERENCES `Proyectos` (`id`),
  ADD CONSTRAINT `Tareas_ibfk_2` FOREIGN KEY (`asignado_a`) REFERENCES `Usuarios` (`id`);

--
-- Filtros para la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `Roles` (`id`);

--
-- Filtros para la tabla `Usuarios_Proyectos`
--
ALTER TABLE `Usuarios_Proyectos`
  ADD CONSTRAINT `Usuarios_Proyectos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `Usuarios` (`id`),
  ADD CONSTRAINT `Usuarios_Proyectos_ibfk_2` FOREIGN KEY (`proyecto_id`) REFERENCES `Proyectos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
```
   
## 📝 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.
[![Apache License-2.0](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://www.apache.org/licenses/LICENSE-2.0)

[imagen-proyecto]:https://www.wimi-teamwork.com/static/medias/logiciels-gestion-des-taches-1280x640-1.png
[imagen-API-DOCS]:https://i.ibb.co/r2KYSQPP/Captura-de-pantalla-2025-03-20-212229.jpg
