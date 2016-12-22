<?php		
	//Product
	$barcode = $_GET['barcode'];
	include("../connections_db.php");
	$sql = "SELECT P.`id`, P.`name`, P.`picture`
			FROM `buy_product` P
			WHERE P.barcode=:barcode";			
	$sth = $conn->prepare($sql);
	$sth->bindParam(":barcode", $barcode);
	$sth->execute();
	$aaa = $sth->fetch();
	$result[0] = $aaa;
	
	$sql = "SELECT S.`name` shopname, SL.`price`, SL.`discount`, SL.`remarks`
			FROM `buy_product` P
 			LEFT JOIN `buy_salelist` SL ON P.`id`=SL.`productid`
 			LEFT JOIN `buy_shop` S ON S.id=SL.shopid
			WHERE P.barcode=:barcode";			
	$sth = $conn->prepare($sql);
	$sth->bindParam(":barcode", $barcode);
	$sth->execute();
	$bbb = $sth->fetchAll();
	$result[1] = $bbb;	
	
	echo json_encode($result);
?>