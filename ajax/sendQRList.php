<?php
	include("../connections_db.php");
	date_default_timezone_set('UTC');
	user = ':user';
	name = ':name';
	price = ':price';
	shopname = ':shopname';
	sdate = ':date';
	
	$dataChecked = $_POST['dataChecked'];
	$shopname = mb_substr($_POST['shopname'],0,2,'utf8');
	$datelong = $_POST['date'];
	
	$date = sprintf('%04d-%02d-%02d', substr($datelong,0,4),substr($datelong,4,2),substr($datelong,6,2));
	
	$userid = $_POST['userid'];
	$point = $_POST['point'];
	$shopid = 0;
	$today = date("Y-m-d");
	switch ($shopname) {
		case '全聯':
			  $shopid = 1;
			  $shopname = '全聯';
			  break;
		case '家福':
			  $shopid = 2;
			  $shopname = '家樂福';
			  break;
		case '大潤':
			  $shopid = 3;
			  $shopname = '大潤發';
			  break;
		default:
	}
	
	for($i=0;$i<count($dataChecked);$i++){
		$productName = $dataChecked[$i]['description'];
		$productPrice = $dataChecked[$i]['unitPrice'];
		$sql = "SELECT SL.id, SL.date, SL.price
				FROM `buy_product` P
				LEFT JOIN `buy_salelist` SL ON P.id=SL.productid
				LEFT JOIN `buy_shop` S ON S.id=SL.shopid
				WHERE (SL.name = :sname || P.name = :pname) && S.id = :id";
		$sth = $conn->prepare($sql);
		$sth->bindParam(":sname", $productName);
		$sth->bindParam(":pname", $productName);
		$sth->bindParam(":id", $shopid);
		$sth->execute();
		$aaa = $sth->fetch();
		echo $shopid;
		if ($aaa['id'] == ""){
			$sql = "INSERT INTO `buy_checklist`(`id`, `userid`, `name`, `barcode`, `price`, `shopname`, `picture`, `date`, `state`, `remarks`, `point`) 
					VALUES (null,:user,:name,null,:price,:shopname,null,:date,'QR新增資料',null,0)";
			$sth = $conn->prepare($sql);
			$sth->bindParam(user, $userid);
			$sth->bindParam(name, $productName);
			$sth->bindParam(price, $productPrice);
			$sth->bindParam(shopname, $shopname);
			$sth->bindParam(sdate, $date);
			$sth->execute();
		} else if($aaa['date'] < $date && $productPrice > 0 && $aaa['price'] != $productPrice) {
			$sql = "INSERT INTO `buy_checklist`(`id`, `userid`, `name`, `barcode`, `price`, `shopname`, `picture`, `date`, `state`, `remarks`, `point`) 
					VALUES (null,:user,:name,null,:price,:shopname,'cat002bra022bk0056.gif',:date,'價格更新',null,2)";
			$sth = $conn->prepare($sql);
			$sth->bindParam(user, $userid);
			$sth->bindParam(name, $productName);
			$sth->bindParam(price, $productPrice);
			$sth->bindParam(shopname, $shopname);
			$sth->bindParam(sdate, $date);
			$sth->execute();	
			
			$point+=2;
			
			$sql = "UPDATE `buy_user` SET `point`=:point
					WHERE id=:id";
			$sth = $conn->prepare($sql);
			$sth->bindParam(":id", $userid);
			$sth->bindParam(":point", $point);
			$sth->execute();
			
			$sql = "UPDATE `buy_salelist` SET `price`=:price,`date`=:date
					WHERE id=:id";
			$sth = $conn->prepare($sql);
			$sth->bindParam(":id", $aaa['id']);
			$sth->bindParam(price, $productPrice);
			$sth->bindParam(price, $productPrice);
			$sth->bindParam(sdate, $date);
			$sth->execute();
		}
	}
?>