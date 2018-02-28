<?php

if (isset($_FILES)) {
   
  
    $fileName = basename($_FILES["file"]["name"]);
    $fileExtension = $_FILES["file"]["tmp_name"];
    $desDir = "upload";
   
    move_uploaded_file($fileExtension, "$desDir/$fileName");
    echo "upload success";
} else {
    echo "file not found";
}
