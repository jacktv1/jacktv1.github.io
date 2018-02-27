<?php
    $number = 1;
    $string = "1";

    // operator ==
    echo "operator ==: ";
    var_dump($number == $string);

    // oeprator ===
    echo "<br>operator ===: ";
    var_dump($number === $string);

    echo "<br><br>****** isset and empty ******<br>";

    echo "<br>-- ham isset --<br>";

    // $name not define
    echo "<br>Bien name chua duoc khoi tao: ";
    var_dump(isset($name));

    // $name defined
    echo "<br>Bien name da duoc khoi tao: ";
    $name = "Messi";
    var_dump(isset($name));

    echo "<br><br>-- ham empty --<br>";

    echo "<br>-- ham empty return false <br>";

    // $gender defined
    echo "<br>Bien gender da duoc khoi tao: ";
    $gender = "man";
    var_dump(empty($gender));

    echo "<br><br>-- ham empty return true <br>";
    
    // $age not define
    echo "<br>Bien age chua duoc khoi tao: ";
    var_dump(empty($age));


    // $age = 0
    echo "<br>Bien age 0: ";
    $age = 0;
    var_dump(empty($age));

    // $age = "0"
    echo "<br>Bien age \"0\": ";
    $age = "0";
    var_dump(empty($age));

    // $age = ""
    echo "<br>Bien age \"\": ";
    $age = "";
    var_dump(empty($age));

    // $age = false
    echo "<br>Bien age false: ";
    $age = false;
    var_dump(empty($age));