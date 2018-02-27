<?php

$numberArray1 = [11,222,333,7,12];
$numberArray2 = [2,333,4,55,222];
$numberArray3 = [2,12,50,23,55];

arrayExercise($numberArray1, $numberArray2, $numberArray3);

/**
 * This function check valide parameters if one is not array throw LoginException,
 * else find number 1 in array1, merge array2 and array3 and unique it (*),
 * print even number of (*),
 * print values of array1 is existed in (*) and ascending sort it,
 * print values of array1 if the key of it is not existed in (*) and sort decrement
 * @param array $array1
 * @param array $array2 
 * @param array $array3
 * @throws \LogicException If one or more parameter is not array
 */

function arrayExercise($array1, $array2, $array3)
{

    // Check valid parameters

    $listNotArrays = [];
    switch(true) {
        case !is_array($array1):
            array_push($listNotArrays, 1);
        case !is_array($array2):
            array_push($listNotArrays, 2);
        case !is_array($array3):
            array_push($listNotArrays, 3);
        default:
            break;
    }
    
    if (count($listNotArrays) > 0) {
        try {

            $stringNotArray = implode(", ",$listNotArrays);
            throw new LogicException("Invalid parameter $stringNotArray");

        } catch(Exception $e) {

            echo $e->getMessage();
            return;

        }
    }

    // Exercise 1

    $isFound = in_array(1, $array1, true);
    echo ($isFound) ? "Found" : "Not Found";

    // Exercise 2

    echo "<br>";

    $mergedArray = array_merge($array2, $array3);
    $mergedArray = array_unique($mergedArray);
    $stringMerged = implode(", ", $mergedArray);
    echo $stringMerged;

    // Exercise 3

    echo "<br>";

    $listArray = array_map('intval', explode(",", $stringMerged));
    $stringValues = "";
    
    $listValue = array_filter($listArray, function($value) {
        $sumDigits = array_sum(str_split($value));
        return ($sumDigits % 2 == 0);
    });
    $stringValues .= implode(", ", $listValue);
  
    echo $stringValues;

    // Exercise 4

    echo "<br>";

    $listArray = array_map('intval', explode(",", $stringMerged));
    
    $valueRangeArray =  array_filter($array1, function($value) use ($listArray) {
        return (in_array($value, $listArray, true));
    });

    sort($valueRangeArray);
    $valueRangeString = implode(", ", $valueRangeArray);

    echo $valueRangeString;

    // Exercise 5

    echo "<br>";

    $listArray = array_map('intval', explode(",", $stringMerged));
    
    $valueDescArray =  array_filter($array1, function($value, $key) use ($listArray) {
        return (!in_array($key, $listArray, true));
    }, ARRAY_FILTER_USE_BOTH);

    rsort($valueDescArray);

    $valueDescString = implode(", ", $valueDescArray);

    echo $valueDescString;
}
