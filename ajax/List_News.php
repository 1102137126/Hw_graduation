<?php        
    //Product
    include("../connections_db.php");
    $sql = "SELECT distinct P.`id`, P.`name`, P.`categoryid`, P.`picture`
            FROM `buy_product` P
            JOIN `buy_salelist` SL on P.id = SL.productid
            WHERE month(NOW( )) = month(date)";
    $sth = $conn->prepare($sql);
    $sth->execute();
    $aaa = $sth->fetchAll();
    echo json_encode($aaa);
?>