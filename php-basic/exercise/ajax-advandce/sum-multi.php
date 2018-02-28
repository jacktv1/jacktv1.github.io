<?php

if (isset($_POST["data"])) {
    $data = json_decode($_POST["data"]);
    $sum = 0;
    $multiple = 1;

    foreach ($data as $number) {
        $sum += $number;
        $multiple *= $number;
    }

    $result = compact('sum','multiple');
   
    echo json_encode($result);
} 