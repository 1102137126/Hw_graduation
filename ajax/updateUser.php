<?php        
    //
    include("../connections_db.php");
    $id = $_GET['userid'];
    $account = $_GET['account'];
    $password = $_GET['password'];
    
    $sql = "UPDATE `buy_user` SET 
            `password`=:password
            WHERE account=:account && id=:id";            
    $sth = $conn->prepare($sql);
    $sth->bindParam(":id", $id);
    $sth->bindParam(":account", $account);
    $sth->bindParam(":password", $password);
    $sth->execute();
    echo $sth->rowCount();
?>