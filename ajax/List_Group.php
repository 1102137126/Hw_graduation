<?php		
	//Group
	include("../connections_db.php");
	$sql = "SELECT G.`id`, G.`name`, G.`picture`
			FROM `buy_group` G";
	$sth = $conn->prepare($sql);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>