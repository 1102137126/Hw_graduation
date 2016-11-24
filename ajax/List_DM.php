<?php		
	//DM
	include("../connections_db.php");
	$sql = "SELECT A.name singer, B.name song, B.number,B.click_through_rate
			FROM `html5_singer` A JOIN  `html5_song` B ON A.id = B.singerid 
			ORDER BY B.click_through_rate DESC
			LIMIT 20";
	$sth = $conn->prepare($sql);
	$sth->execute();
	$aaa = $sth->fetchAll();
	echo json_encode($aaa);
?>