<?php

$csvFile = @tempnam("./files/csv/",'csv');

file_put_contents($csvFile . '.csv', 'demo create csv file');
unlink($csvFile);

header('Content-Type: application/csv; charset=UTF-8');
header("Content-Disposition: attachment; filename=\"$csvFile.csv\"");
