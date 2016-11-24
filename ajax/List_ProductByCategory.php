<?php		
	//Product
	$categoryid = $_GET['categoryid'];
	include("../connections_db.php");
	$sql = "SELECT `id`, `name`, `categoryid`, `picture`
			FROM `buy_product`
			WHERE `categoryid` = :categoryid";
	$sth = $conn->prepare($sql);
	$sth->bindParam(":categoryid", $categoryid);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>