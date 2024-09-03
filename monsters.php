<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "project3";

    // Create a new PDO instance
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get Number from query parameters
    $number = isset($_GET['Number']) ? $_GET['Number'] : null;

    // Prepare and execute SQL query
    $stmt = $conn->prepare("SELECT * FROM Pokedex WHERE Number = :number");
    $stmt->execute(['number' => $number]);

    // Fetch the result as an associative array
    $pokemon = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$pokemon) {
        throw new Exception("Pokemon with Number $number not found.");
    }

    // Return the result as JSON
    header('Content-Type: application/json');
    echo json_encode($pokemon);

} catch(PDOException $e) {
    // Handle database errors
    echo "Database Error: " . $e->getMessage();
} catch(Exception $e) {
    // Handle other errors
    echo "Error: " . $e->getMessage();
}

// Close the connection
$conn = null;
?>
