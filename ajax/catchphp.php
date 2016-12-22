<?php
	header('Access-Control-Allow-Origin: *');
	
	$myvars = 'type=' . $_POST['type'] . '&number=' . $_POST['number'] . '&date=' . $_POST['date'] . '&random=' . $_POST['random'];
	function getter($url, $myvars) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		
		curl_setopt( $ch, CURLOPT_POST, 1);
		curl_setopt( $ch, CURLOPT_POSTFIELDS, $myvars);
		curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
		
		curl_setopt($ch, CURLOPT_HEADER, 0);
		$data = curl_exec($ch);
		curl_close($ch);
		return $data;
	}
	echo getter('https://www.cetustek.com.tw/common/invoice/queryInv.php', $myvars);
?>