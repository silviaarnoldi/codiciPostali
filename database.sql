-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 20, 2024 alle 08:56
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS codicipostali;
CREATE DATABASE codicipostali;
USE codicipostali;
CREATE TABLE `codicipostali` (
  `CodicePostale` int(5) NOT NULL,
  `Comune` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `codicipostali` (`CodicePostale`, `Comune`) VALUES
(67100, "L'Aquila"),
(24000, "BG"),
(88100, "Catanzaro"),
(80054, "Gragnano"),
(06081, "Assisi");

ALTER TABLE `codicipostali`
  ADD PRIMARY KEY (`CodicePostale`);
COMMIT;

