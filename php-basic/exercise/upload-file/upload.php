<?php

if (isset($_FILES['fileUpload'])) {

    $fileName = basename($_FILES["fileUpload"]["name"]);
    $fileExtension= $_FILES["fileUpload"]["tmp_name"];
    $desDir = "upload";
    
    var_dump(move_uploaded_file($fileExtension, "$desDir/$fileName"));
   
} else {
    echo "file not found";
}