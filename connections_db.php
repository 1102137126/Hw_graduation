<?php
	header("Access-Control-Allow-Origin: *");
	$db_host = 'db.mis.kuas.edu.tw';    
    $db_name = 's1102137126';    
    $db_user = 's1102137126';    
    $db_password = '1234';
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
	try {
        $conn = new PDO($dsn, $db_user, $db_password);
	} catch (Exception $exc) {
        echo $exc->getMessage();
    }

	/*$db_host = 'localhost';
	$db_name = 's1102137126';
	$db_user = 's1102137126';
	$db_password = '1234';
	$dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8";
	try {
		$conn = new PDO($dsn, $db_user, $db_password);
	} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
		die();
	}*/
?>