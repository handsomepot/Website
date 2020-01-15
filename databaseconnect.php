<?php
$servername = "localhost";
$database = "u906139772_db";
$username = "u906139772_tingriley";
$password = "haha6603";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);
?>