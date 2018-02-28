<?php

if (isset($_FILES['fileUpload'])) {
    var_dump($_FILES);
    $fileName = basename($_FILES["fileUpload"]["name"]);
    $fileExtension= $_FILES["fileUpload"]["tmp_name"];
    $desDir = "upload";
    
    var_dump(move_uploaded_file($fileExtension, "$desDir/$fileName"));
   
} else {
    echo "file not found";
}