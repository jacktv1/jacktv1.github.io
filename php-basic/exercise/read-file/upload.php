<?php

if (isset($_FILES)) {
   
  
    $fileName = basename($_FILES["file"]["name"]);
    $fileExtension = $_FILES["file"]["tmp_name"];
    $desDir = "upload";
    
    move_uploaded_file($fileExtension, "$desDir/$fileName");
    
    $file = fopen("$desDir/$fileName",'r');

    while (!feof($file)) {
        echo fgets($file);
    }
   
} else {
    echo "file not found";
}
