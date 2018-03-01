<?php

$to = "110114002@sv.tvu.edu.vn";

$subject = "Demo send mail in PHP";

$message = "こんにちは";


$send = mb_send_mail ($to,$subject,$message);

if ( $send == true) {
    echo "Email successfully sent";
} else {
    echo "cannot send email ...";
}
