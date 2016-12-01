<?php		
	//Category
	include("../connections_db.php");
	$str = $_GET['str'];
	$str =  explode(" ", $str);
	$sqlstr = "";
	$sqlstr = "%".$str[0]."%";
	for ($i = 1; $i < count($str); $i++) {
		$sqlstr .= " AND P.name like %".$str[$i]."%";
	}
	
	
	$sql = "SELECT G.`id`, G.`name`
			FROM `buy_product` P
			JOIN `buy_category` C ON P.categoryid=C.id
			JOIN `buy_group` G ON C.groupid = G.id
			WHERE P.`name` like :name
            GROUP BY G.`id`, G.`name`";
	$sth = $conn->prepare($sql);
	$sth->bindParam(":name", $sqlstr);
	$sth->execute();
	$aaa = $sth->fetchAll();
	$result[0] = $aaa;
	
	$sql = "SELECT P.`id`, P.`name`, P.`picture`, G.`id` groupid
			FROM `buy_product` P
			JOIN `buy_category` C ON P.categoryid=C.id
			JOIN `buy_group` G ON C.groupid = G.id
			WHERE P.name like :name
            ORDER BY G.`id`, C.`id`";
	$sth = $conn->prepare($sql);
	$sth->bindParam(":name", $sqlstr);
	$sth->execute();
	$bbb = $sth->fetchAll();
	$result[1] = $bbb;
	echo json_encode($result);
	//echo $sqlstr;
?>