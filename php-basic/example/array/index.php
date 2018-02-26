<?php

$animals = ["Dog", "Cat", "Pig"];

// Add element to the start of array
array_unshift($animals, "Lion");


// Add element to the end of array
array_push($animals, "Chicken");

var_dump($animals);

echo "<br>array_shift -- array_pop<br>";

// Get first elemnet and remove it
$firstAnimal = array_shift($animals);

echo "First Animal: $firstAnimal<br>";
var_dump($animals);
// Get last element and remove it
$lastAnimal = array_pop($animals);

echo "<br>Last Animal: $lastAnimal<br>";
var_dump($animals);

echo "<br>array_slice<br>";

// Remove element one or more element
array_splice($animals,1,1);
var_dump($animals);
echo "<br>--- for and foreach ----<br>";

// Iterate array

$numberOfAnimals = count($animals);

// for
for ($i = 0; $i < $numberOfAnimals; $i++) {
    echo $animals[$i]. ",";
}

echo "<br>";

// foreach array

foreach ($animals as $animal) {
    echo $animal . ",";
}

echo "<br>";

// Array sort
echo "--- sort by value ----<br>";
$animals = [
    'a' => "dog",
    'c' => "cat",
    'b' => "pig"
];

sort($animals);

var_dump($animals);
echo "<br>--- sort by key ----<br>";

$animals = [
    'a' => "dog",
    'c' => "cat",
    'b' => "pig"
];
ksort($animals);

var_dump($animals);

echo "<br>Reverse array<br>";

$animals = [
    'a' => "dog",
    'c' => "cat",
    'b' => "pig"
];

$animalsArrayReverse = array_reverse($animals);

var_dump($animalsArrayReverse);

echo "<br>";

// Remove unique value in array
echo "Array unique<br>";

$numbers = [1, 3, 5, 1, 4];

$numbersUnique = array_unique($numbers);
var_dump($numbersUnique);
echo "<br>";

// Reverse key and value

$animals = [
    'a' => "dog",
    'c' => "cat",
    'b' => "pig"
];

$flipAnimals = array_flip($animals);

echo "---- Flip array ----<br>";
var_dump($flipAnimals);

echo "<br>---- Convert array to string -----<br>";

// Convert array to string

$animals = ["dog", "cat", "pig"];
$animalString = implode(',', $animals);

echo $animalString;
echo "<br>---- Convert string to array -----<br>";

// Convert array to string
$animalString = "dog,cat,pig";
$animalArray = explode(',', $animalString);

var_dump($animalArray);

// Array Key, Array value
$animals = [
    'a' => "dog",
    'c' => "cat",
    'b' => "pig"
];

echo "<br>Array key<br>";

$keys = array_keys($animals);
var_dump($keys);

echo "<br>Array value<br>";

$values = array_values($animals);

var_dump($values);

// in_array

echo "<br>--- in Array --- <br>";
$animals = ["dog", "cat", "pig"];
$found = in_array("dog", $animals);

var_dump($found);

// array_key_exists

echo "<br>--- array_key_exists --- <br>";
$animals = [
    'a' => "dog",
    'c' => "cat",
    'b' => "pig"
];
$found = array_key_exists("a", $animals);

var_dump($found);

// array_diff

echo "<br>--- array_diff --- <br>";

$animals1 = ["dog", "cat", "pig"];
$animals2 = ["cat", "pig", "monkey"];

$result = array_diff($animals1, $animals2);

var_dump($result);

// array_diff_key

echo "<br>--- array_diff_key --- <br>";


$animals1 = [
    'a' => "dog",
    'c' => "cat",
    'b' => "pig"
];

$animals2 = [
    'a' => "cat",
    'd' => "chicken",
    'e' => "monkey"
];

$result = array_diff_key($animals1, $animals2);

var_dump($result);


// array_intersect

echo "<br>--- array_intersect --- <br>";


$animals1 = [
    'a' => "pig",
    'c' => "cat",
    'b' => "dog"
];

$animals2 = [
    'a' => "pig",
    'd' => "cat",
    'e' => "chicken"
];

$result = array_intersect($animals1, $animals2);

var_dump($result);

// array_intersect_key

echo "<br>--- array_intersect_key --- <br>";


$animals1 = [
    'a' => "pig",
    'c' => "cat",
    'b' => "dog"
];

$animals2 = [
    'a' => "pig",
    'd' => "cat",
    'e' => "chicken"
];

$result = array_intersect_key($animals1, $animals2);

var_dump($result);

// array_merge

echo "<br>--- array_merge --- <br>";


$animals1 = [
    'a' => "pig",
    'c' => "cat",
    'b' => "dog"
];

$animals2 = [
    'a' => "dog",
    'd' => "cat",
    'e' => "chicken"
];

$result = array_merge($animals1, $animals2);

var_dump($result);

// array_merge_recursive

echo "<br>--- array_merge_recursive --- <br>";


$animals1 = [
    'a' => "pig",
    'c' => "cat",
    'b' => "dog"
];

$animals2 = [
    'a' => "dog",
    'd' => "cat",
    'e' => "chicken"
];

$result = array_merge_recursive($animals1, $animals2);

var_dump($result);

// array1 + array2

echo "<br>--- array1 + array2 --- <br>";


$animals1 = [
    'a' => "pig",
    'c' => "cat",
    'b' => "dog"
];

$animals2 = [
    'a' => "dog",
    'd' => "cat",
    'e' => "chicken"
];

$result = $animals1 + $animals2;

var_dump($result);

// array_filter

echo "<br>--- array_filter --- <br>";


$numbers = [1,3,9,6,4,7];

$filterNumbers = array_filter($numbers, function($value) {
    return $value > 4;
});

var_dump($filterNumbers);

// array_map

echo "<br>--- array_map --- <br>";


$numbers = [1,3,9,6,4,7];

$mapNumbers = array_map(function($value) {
    return ++$value;
}, $numbers);

var_dump($mapNumbers);

// array_walk

echo "<br>--- array_walk --- <br>";


$numbers = [1,3,9,6,4,7];

array_walk($numbers, function(&$value, $key) {
   $value++;
});

var_dump($numbers);