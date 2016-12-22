<?php
	//Category
	include("../connections_db.php");
	$sql = "SELECT `id`, `name`, `groupid`
			FROM `buy_category`";
	$sth = $conn->prepare($sql);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>