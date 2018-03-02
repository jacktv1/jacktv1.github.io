<?php
require_once "session.php";

if (isset($_POST['txt-session-id'])) {

    $sessionID = $_POST['txt-session-id'];
    
    
    session_id($sessionID);
    $session = new SessionDB();
    
    $session->startSession('_s', false);
   

    echo $_SESSION[$sessionID];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form method="POST" action="index.php">
        <label>Session ID</label>
        <input type="text" name="txt-session-id">

       
        <br>
        <button type="submit">Read session</button>
    </form>

</body>
</html>