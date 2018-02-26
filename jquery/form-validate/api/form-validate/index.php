<?php
require_once("validate.php");

use Api\FormValidate\Validate;

$validate = new Validate();

$userInfo = $_POST["userInfo"];
$validate->validateUserInfo($userInfo);