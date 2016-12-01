<?php		
	//Shop
	include("../connections_db.php");
	$sql = "SELECT `id`, `name`, `picture`
			FROM `buy_shop` S";
	$sth = $conn->prepare($sql);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>