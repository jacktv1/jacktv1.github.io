<?php

define('SINGLE_QUOTE',false);
define('DOUBLE_QUOTE',true);

// exercise 1

exercise1(SINGLE_QUOTE);
exercise1(DOUBLE_QUOTE);

// exercise 2
findSubStringInString("hello", "ll");

// exercise 3

$mulipleByteString = "\x00\x81";
$encoding = "Hello";
echo "<br>";

checkMultipleByteString($mulipleByteString);

// exercise 4
$trim = 'trim';
echo "<br>";
rtrimM($trim);
echo "<br>";
revStringAndLtrimM($trim);

/**
 * This function is print the string "Money $__$ money" with single quote or double quote
 * @param bool $type SINGLE_QUOTE or DOUBLE_QUOTE
 */

function exercise1($type = SINGLE_QUOTE)
{
    if ($type === DOUBLE_QUOTE) {
        echo "Money $__$ money<br>";
    } else {
        echo 'Money $__$ money<br>';
    }
}

/**
 * This function is check input string is valid or not, if not throw login exception and return false
 * @param string $string
 * @return bool
 */

function checkString($string) {
    try {
        if (is_string($string))
            return true;
        throw new LogicException("<br>Invalid parameter");
    } catch(Exception $e) {
        echo $e->getMessage();
        return false;
    }
}

/**
 * This function find substring in a string 
 * @param string $string
 * @param string $subString
 */

function findSubStringInString($string, $subString)
{
    if (checkString($string) && checkString($subString))
        var_export(!strpos($string, $subString) == false);
   
}

/**
 * This function check is string is multiple byte or not
 * @param string $string
 */

function checkMultipleByteString($string)
{
    if (checkString($string))
        var_export(mb_check_encoding($string, "UTF-8"));
}

/**
 * This function check is remove char 'm' in the right of string
 * @param string $string
 */

function rtrimM($string) {
    if (checkString($string)) {
        $string = rtrim($string, 'm');
        var_export($string);
    }
}

/**
 * This function check is reverse string and remove char 'm' in the left of string
 * @param string $string
 */

function revStringAndLtrimM($string) {
    if (checkString($string)) {
        $string = strrev($string);
        $string = ltrim($string, 'm');
        var_export($string);
    }
}