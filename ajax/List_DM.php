<?php        
    //DM
    include("../connections_db.php");
    $sql = "SELECT `id`, `name`, `dmURL` ,`picture`
            FROM `buy_shop`";
    $sth = $conn->prepare($sql);
    $sth->execute();
    $aaa = $sth->fetchAll();
    echo json_encode($aaa);
?>