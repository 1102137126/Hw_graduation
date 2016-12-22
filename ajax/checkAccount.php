<?php		
	//
	include("../connections_db.php");
	$account = $_GET['account'];
	$sql = "SELECT COUNT(*)
			FROM `buy_user` P
			WHERE P.account=:account";			
	$sth = $conn->prepare($sql);
	$sth->bindParam(":account", $account);
	$sth->execute();
	$aaa = $sth->fetchColumn();
	
	echo json_encode($aaa);
?>