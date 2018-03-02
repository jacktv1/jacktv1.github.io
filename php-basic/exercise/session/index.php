<?php
require_once "session.php";

$session = new SessionDB();
$session->startSession('_s', false);

session_id("user");
$_SESSION["id"] = "jacktv1";

echo $_SESSION["id"];
