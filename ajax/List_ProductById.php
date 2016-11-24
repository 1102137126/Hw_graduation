<?php		
	//Product
	$productid = $_GET['productid'];
	include("../connections_db.php");
	/*$sql = "SELECT P.`id`, P.`name`, S.`name` shopname, P.`picture`, `price`
			FROM `buy_product` P
 			LEFT JOIN `buy_salelist` SL ON P.`id`=SL.`productid` AND P.id=:productid
 			LEFT JOIN `buy_shop` S ON S.id=SL.shopid";*/
	$sql = "SELECT P.`id`, P.`name`, S.`name` shopname, P.`picture`, `price`
			FROM `buy_product` P
 			LEFT JOIN `buy_salelist` SL ON P.`id`=SL.`productid`
 			LEFT JOIN `buy_shop` S ON S.id=SL.shopid
			WHERE P.id=:productid";
	$sth = $conn->prepare($sql);
	$sth->bindParam(":productid", $productid);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>