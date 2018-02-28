<?php
$recipient = '110114008@sv.tvu.edu.vn';
$headers = 'From: ngoquocanh111@gmail.com';
$subject = 'Hello World';
$message = 'This is a test';
var_dump(mail('ngoquocanh111@gmail.com', 'My Subject', $message));