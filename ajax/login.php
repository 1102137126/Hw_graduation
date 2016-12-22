<?php        
    //
    include("../connections_db.php");
    $account = $_GET['account'];
    $password = $_GET['password'];
    $sql = "SELECT COUNT(*)
            FROM `buy_user`
            WHERE account=:account && password=:password";            
    $sth = $conn->prepare($sql);
    $sth->bindParam(":account", $account);
    $sth->bindParam(":password", $password);
    $sth->execute();
    $aaa = $sth->fetchColumn();
    $result[0] = $aaa;
    
    $sql = "SELECT id, name, account, point
            FROM `buy_user`
            WHERE account=:account && password=:password";            
    $sth = $conn->prepare($sql);
    $sth->bindParam(":account", $account);
    $sth->bindParam(":password", $password);
    $sth->execute();
    $bbb = $sth->fetch();
    $result[1] = $bbb;
    
    echo json_encode($result);
?>