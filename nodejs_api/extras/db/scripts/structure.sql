CREATE SCHEMA `crud-node-reactjs` ;

CREATE TABLE `usuario` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(15) NOT NULL,
	`apellido` VARCHAR(20) NOT NULL,
	`mail` VARCHAR(25) NULL,
	`celular` BIGINT NULL,
	`fechaNacimiento` DATE NOT NULL,
	`calle` VARCHAR(30) NOT NULL,
	`numero` BIGINT NOT NULL,
	`codigoPostal` BIGINT NOT NULL,
PRIMARY KEY (`id`));