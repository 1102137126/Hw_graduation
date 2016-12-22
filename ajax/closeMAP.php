<?php    
    //close
    include("../connections_db.php");
    $lat = $_GET['lat'];
    $lon = $_GET['lon'];
    
    $lat_plus = (double)$lat + 0.05;
    $lat_minus = (double)$lat - 0.05;
    $lon_plus = (double)$lon + 0.05;
    $lon_minus = (double)$lon - 0.05;
    
    $sql = "SELECT S.`name` shopname, `positionX`, `positionY`, S.`name` name
            FROM `buy_shoplist` SL 
            JOIN `buy_shop` S ON S.id=SL.shopid
            WHERE positionX < :lat_plus AND positionX >= :lat_minus AND positionY < :lon_plus AND positionY >= :lon_minus ";
    $sth = $conn->prepare($sql);
    $sth->bindParam(":lat_plus", $lat_plus);
    $sth->bindParam(":lat_minus", $lat_minus);
    $sth->bindParam(":lon_plus", $lon_plus);
    $sth->bindParam(":lon_minus", $lon_minus);
    $sth->execute();
    $aaa = $sth->fetchAll();
    echo json_encode($aaa);
?>