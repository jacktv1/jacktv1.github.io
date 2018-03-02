<?php
namespace Vendor\Log;

class Logger implements LoggerInterface
{
    // storage path of log
    public static $path = "";

    /**
     * Write log to file
     * @param string $level
     * @param string $message
     * @param * $context
     * @return void
     */
    private static function log($level, $message, $context)
    {
        $streamFile = fopen(self::$path, 'a');
        $dateTime = date('d-m-Y H:i:s', time());
        
        $data = "[$dateTime] $level: $message " . print_r($context,true) . "\n";
        fwrite($streamFile, $data);
        fclose($streamFile);
    }

    public static function info($message, $context)
    {
        self::log('INFO', $message, $context);
    }

    public static function debug($message, $context)
    {
        self::log('DEBUG', $message, $context);
    }

    public static function warning($message, $context)
    {
        self::log('WARNING', $message, $context);
    }

    public static function error($message, $context)
    {
        self::log('ERROR', $message, $context);
    }

}
