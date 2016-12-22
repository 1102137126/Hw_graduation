<?php
	include("../connections_db.php");
	date_default_timezone_set('UTC');
	
	$name = $_POST['name'];
	$barcode = $_POST['barcode'];
	$shop = $_POST['shop'];
	$price = $_POST['price'];
	$userid = $_POST['userid'];
	$today = date("Y-m-d");
	if (!empty($_FILES['uploadFile']['name'])) {
		if ($_FILES['uploadFile']['error'][0] != UPLOAD_ERR_OK) {  
			echo "上傳失敗";
			return;
		}
		$file = $_FILES['uploadFile'];
		$sql = "SELECT `id` FROM `buy_product` ORDER BY `id` DESC LIMIT 1";					//取得最後的id
		$sth = $conn->prepare($sql);
		$sth->execute();
		$id = $sth->fetchColumn()+1;
		
		$str = sprintf('bk%04d', $id);														//新檔名
		
		$tmp_name = $file['name'][0];														//取得檔名 	
		$uploaddir = 'images/product/';       												//設定主機要上傳的目錄 
		$exten = strtolower(strrchr($tmp_name, ".")) ;    									//取得上傳的副檔名   
		$refile_name = $str.$exten;															//設定檔案新檔名為 $str
		$uploadfile = $uploaddir . basename($file['tmp_name'][0]);  						//設定上傳檔案正確的路徑及檔名   
		
		$sourse = $file['tmp_name'][0];
		
		if(!move_uploaded_file($sourse, $uploaddir . $tmp_name)){
				echo "移動檔案失敗";
				return;
			}
			rename($uploaddir.$tmp_name,$uploaddir.$refile_name);							//在上傳目錄後更改原檔名為新檔名 
			//return $refile_name;
		$picture = $refile_name;
	}else {
		$picture = "cat002bra022bk0056.gif";
	}
	$state = "新增商品";
	$sql = "INSERT INTO `buy_checklist`(`id`, `userid`, `name`, `barcode`, `price`, `shopname`, `picture`, `date`, `state`, `remarks`, `point`) 
			VALUES (null, :userid,:name,:barcode,:price,:shopname,:picture,:date,:state,null,0)";
	$sth = $conn->prepare($sql);
	$sth->bindParam(":userid", $userid);
	$sth->bindParam(":name", $name);
	$sth->bindParam(":barcode", $barcode);
	$sth->bindParam(":price", $price);
	$sth->bindParam(":shopname", $shop);
	$sth->bindParam(":picture", $picture);
	$sth->bindParam(":state", $state);
	$sth->bindParam(":date", $today);
	$sth->execute();
	echo $sth->rowCount();
?>