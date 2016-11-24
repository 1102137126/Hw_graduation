<?php		
	//Category by Group
	$groupid = $_GET['groupid'];
	include("../connections_db.php");
	$sql = "SELECT `id`, `name`, `groupid` 
			FROM `buy_category`
			WHERE `groupid` = :groupid";
	$sth = $conn->prepare($sql);
	$sth->bindParam(":groupid", $groupid);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>