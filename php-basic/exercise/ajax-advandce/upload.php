<?php

if (isset($_FILES)) {
   
    var_dump($_FILES);
    $fileName = basename($_FILES["file"]["name"]);
    $fileExtension = $_FILES["file"]["tmp_name"];
    $desDir = "upload";
    var_dump($fileExtension);
    var_dump(move_uploaded_file($fileExtension, "$desDir/$fileName"));
} else {
    echo "file not found";
}
