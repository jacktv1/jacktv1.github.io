<?php

$txtFile = @tempnam("./files/txt/",'txt');

file_put_contents($txtFile.'.txt', 'demo create text file');
unlink($txtFile);

echo "create file success";