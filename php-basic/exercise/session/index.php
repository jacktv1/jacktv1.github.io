<?php
require_once "session.php";

$session = new SessionDB();


$session->startSession('_s', false);

$_SESSION["user"] = "jacktv1";

echo $_SESSION["user"];
$a = ['aa' => 'bb', 'cc' => 'dd'];
var_dump($a);