

CREATE TABLE `animales` (
  `id_animal` int(11) NOT NULL,
  `img_animal` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `animales` (`id_animal`, `img_animal`) VALUES
(1, 'uno'),
(2, 'dos'),
(3, 'tres'),
(4, 'cuatro'),
(5, 'cinco'),
(6, 'seis'),
(7, 'siete'),
(8, 'ocho'),
(9, 'nueve'),
(10, 'diez');


ALTER TABLE `animales`
  ADD PRIMARY KEY (`id_animal`);
  


ALTER TABLE `animales`
  MODIFY `id_animal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

