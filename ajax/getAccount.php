<?php        
    //
    include("../connections_db.php");
    $userid = $_GET['userid'];
    
    $sql = "SELECT name, account, point
            FROM `buy_user`
            WHERE id=:userid";            
    $sth = $conn->prepare($sql);
    $sth->bindParam(":userid", $userid);
    $sth->execute();
    $bbb = $sth->fetch();
    
    echo json_encode($bbb);
?>