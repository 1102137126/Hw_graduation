<?php        
    //Shop
    include("../connections_db.php");
    $shopid = $_GET['shopid'];
    $sql = "SELECT S.`name` shopname, `positionX`, `positionY`, SL.name name
            FROM `buy_shoplist` SL 
            JOIN `buy_shop` S ON S.id=SL.shopid
            WHERE shopid=:shopid";
    $sth = $conn->prepare($sql);
    $sth->bindParam(":shopid", $shopid);
    $sth->execute();
    $aaa = $sth->fetchAll();
    echo json_encode($aaa);
?>