-- Movies

CREATE TABLE `movies` (
  `idMovies` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `genre` varchar(45) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `category` varchar(45) NOT NULL,
  `year` char(4) DEFAULT NULL,
  PRIMARY KEY (`idMovies`),
  UNIQUE KEY `title_UNIQUE` (`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Users
  CREATE TABLE `neflix`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `plan_details` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUser`));

-- Actors
CREATE TABLE `neflix`.`actors` (
  `idActor` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `birthday` DATE NULL,
  PRIMARY KEY (`idActor`));