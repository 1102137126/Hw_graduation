<?php		
	//Record
	include("../connections_db.php");
	
	$userid = $_GET['userid'];
	
	$sql = 'SELECT `name`, `price`, `shopname`, `date`, `point`,
				CASE `state`
				WHEN "新增商品" THEN "審核中" 
				WHEN "QR新增資料" THEN "審核中" 
				WHEN "新增價格" THEN "審核中" 
				WHEN "價格更新" THEN "審核通過" 
				WHEN "新增成功" THEN "審核通過" 
				ELSE "Unknown" 
				END `state` 
			FROM `buy_checklist` 
			WHERE userid=:userid
			ORDER BY `state` DESC, `date` ASC';
	$sth = $conn->prepare($sql);
	$sth->bindParam(":userid", $userid);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>