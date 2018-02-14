<?php
require_once("validate.php");

use Api\FormValidate\Validate;

$validate = new Validate();

$userInfo = $_POST["userInfo"];
var_dump($userInfo);
$validate->validateUserInfo($userInfo);
