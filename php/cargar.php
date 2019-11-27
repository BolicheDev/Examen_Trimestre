<?php
$conn = new mysqli('localhost', 'root', '', 'mizoo');
mysqli_set_charset($conn, "utf8");

if ($conn->connect_errno) {
    print("Error: $conn->connect_error");
    die();
}
if (!$stmt = $conn->prepare("select * from animales")) {
    print "Error al preparar la consulta {$conn->error}";
}

if (!$stmt->execute()) {
    print "Error al ejecutar la consulta {$stmt->error}";
}

$result = $stmt->get_result();
$conn->close();
$arr_imagenes = array();

while ($img = $result->fetch_assoc()) {
    $arr_imagenes[] = $img;
}
print json_encode($arr_imagenes);