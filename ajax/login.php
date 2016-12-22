<?php        
    //
    include("../connections_db.php");
    $account = $_GET['account'];
    $pp = $_GET['password'];
    $sql = "SELECT COUNT(*)
            FROM `buy_user`
            WHERE account=:account && password=:pp";            
    $sth = $conn->prepare($sql);
    $sth->bindParam(":account", $account);
    $sth->bindParam(":pp", $pp);
    $sth->execute();
    $aaa = $sth->fetchColumn();
    $result[0] = $aaa;
    
    $sql = "SELECT id, name, account, point
            FROM `buy_user`
            WHERE account=:account && password=:pp";            
    $sth = $conn->prepare($sql);
    $sth->bindParam(":account", $account);
    $sth->bindParam(":pp", $pp);
    $sth->execute();
    $bbb = $sth->fetch();
    $result[1] = $bbb;
    
    echo json_encode($result);
?>