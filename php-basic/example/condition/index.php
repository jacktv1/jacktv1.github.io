<?php

    // if, elseif, else
    $firstNumber = 5;
    $secondNumber = 10;

    if ($firstNumber > $secondNumber) {

        echo "first number is bigger than second number";

    } elseif ($firstNumber < $secondNumber) {

        echo "first number is smaller than second number";

    } else {

        echo "first number is equal second number";

    }

    echo "<br>";

    // ternary operator
    // if firstNumber equal secondNumber echo "equal" else echo "not equal";

    echo ($firstNumber === $secondNumber) ? "equal" : "not equal";

    // for/foreach

    echo "<br>";

    // print the numbers from 0 to 4
    for ($i = 0; $i < 5; $i++) {
        echo $i . ",";
    }

    echo "<br>";

    $animalArray = ["dog", "cat", "pig"];

    // loop array with foreach
    foreach ($animalArray as $index => $animal) {
        echo $animal. ",";
    }

    // While, do...while

    echo "<br>";

    $count = 0;

    // loop while count < 4
    While ($count < 4) {
        echo $i . ",";
        $count++;
    }

    echo "<br>";

    $count = 0;

    // do...while
    do {
        echo $i . ",";
        $count++;
    } while ($count < 0);

    echo "<br>";

    // switch case
    $gender = "Male";

    switch($gender) {
        case "Male":
            echo "You are male";
            break;
        case "Female":
            echo "You are female";
            break;
        case "Unknown";
            echo "You are 3D";
    }
