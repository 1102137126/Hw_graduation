<?php		
	//Group
	include("../connections_db.php");
	
	groupid = 'groupid';
	
	$sql = "SELECT G.`id`, G.`name`, G.`picture`
			FROM `buy_group` G";
	$sth = $conn->prepare($sql);
	$sth->execute();
	$aaa = $sth->fetchAll();
	$result = $aaa;
	
	$sql = "SELECT `id`, `name`, `groupid` 
			FROM `buy_category`";
	$sth = $conn->prepare($sql);
	$sth->execute();
	$bbb = $sth->fetchAll();
	
	$str = "";
	$id = $bbb[0][groupid] ;
	for($j=0 ;$j<count($bbb);$j++ ){
		if($bbb[$j][groupid] == $id) {				
			$str .= $bbb[$j]['name']." ";
		} else {
			$result[$id-1]['content'] = $str;
			$str = $bbb[$j]['name']." ";
			$id = $bbb[$j][groupid];
		}			
	}
	$result[$id-1]['content'] = $str;
	
	
	echo json_encode($result);
?>