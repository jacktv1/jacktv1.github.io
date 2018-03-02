<?php

include "vendor/log/LoggerInterface.php";
include "vendor/log/Logger.php";

use Vendor\Log\Logger;

Logger::$path = 'storage/log/debug.log';

$os = PHP_OS;

Logger::info('user1', "access on $os");

Logger::debug('$userInfo', [
    'name' => 'Quoc Anh',
    'Age' => 22,
    'gender' => 'male'
    ]);

Logger::warning('This is warning','abnormal traffic');

Logger::error('Error', 'runtime error');
