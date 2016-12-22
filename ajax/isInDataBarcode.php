<?php		
	//
	$barcode = $_GET['barcode'];
	include("../connections_db.php");
	$sql = "SELECT count(*)
			FROM `buy_product` P
			WHERE P.barcode=:barcode";			
	$sth = $conn->prepare($sql);
	$sth->bindParam(":barcode", $barcode);
	$sth->execute();
	$aaa = $sth->fetchColumn();
	
	echo json_encode($aaa);
?>