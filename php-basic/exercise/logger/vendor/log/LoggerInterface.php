<?php
namespace Vendor\Log;

interface LoggerInterface
{

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param string $message
     * @param * $context
     * @return void
     */
    public static function info($message, $context);


    /**
     * Detailed debug information
     * @param string $message
     * @param * $context
     * @return void 
     */
    public static function debug($message, $context);

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param string $message
     * @param * $context
     * @return void
     */
    public static function error($message, $context);

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesirable things
     * that are not necessarily wrong.
     *
     * @param string $message
     * @param * $contexts
     * @return void
     */
    public static function warning($message, $context);
}