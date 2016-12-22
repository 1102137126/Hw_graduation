<?php        
    //
    include("../connections_db.php");
    $account = $_GET['account'];
    $password = $_GET['password'];
    $name = $_GET['name'];
    
    $sql = "INSERT INTO `buy_user`(`id`, `account`, `password`, `name`, `telephone`, `cellphone`, `point`) 
            VALUES (null,:account,:password,:name,null,null,0)";            
    $sth = $conn->prepare($sql);
    $sth->bindParam(":account", $account);
    $sth->bindParam(":password", $password);
    $sth->bindParam(":name", $name);
    $sth->execute();
    $aaa = $sth->rowCount();
    
    echo json_encode($aaa);
?>