-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2025 at 09:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `note_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `text` varchar(255) DEFAULT NULL,
  `tanggal dibuat` datetime NOT NULL,
  `tanggal diubah` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `title`, `category`, `text`, `tanggal dibuat`, `tanggal diubah`) VALUES
(1, 'Gacha Collector YSS', 'Penting', 'Pliss maiiii tanggal 1 jangan lupa gachaaa', '2025-02-26 16:45:34', '2025-02-26 16:45:34'),
(8, 'Lebaran Pake Jakjur', 'Sedang', 'Jo ngasi lali cak', '2025-02-27 07:35:28', '2025-02-27 07:35:28'),
(9, 'Tugas Prak CC DL 2 Maretttt', 'Penting', 'DISURUH BUAT FE dan BE HARUS NYAMBUNG DAN UDAH KEHUBUNG KE GCP', '2025-02-27 16:48:38', '2025-02-27 16:48:38'),
(10, 'METOPEN Progress Mingguan', 'Sedang', 'JANGAN lupa ya ISI DRAFT PRA TA WOII SUKIIIJANSJFNJANSF AJKNks iJSDJKASJD JADJKAF J asd JSF JAOFAS FAJS NJSJA HJSAHDJAHDBHB UHFAHJSF HHAHFWAJFJ', '2025-02-27 16:50:06', '2025-02-27 16:50:06'),
(12, 'Kerja Kelompok Cyber Security Anjay', 'Penting', 'Instal Software jangan lupa', '2025-02-27 16:54:23', '2025-02-28 17:23:00'),
(14, 'Belanja buat sahur', 'Sedang', 'Beli air putih + Nasi bungkus + Tiramiss u', '2025-02-28 17:23:59', '2025-03-01 07:45:06'),
(17, 'Tugas TCC Web Serive 1 Rest', 'Penting', 'DL 2 Maret Plisss jangan lupaa, terus ada makalah juga lekkuuu bakarrrr', '2025-03-01 09:36:02', '2025-03-01 09:36:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
