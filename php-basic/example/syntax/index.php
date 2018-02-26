<?php 
    //  init variable
    $name = "Quoc Anh";

    //  define constrant
    define("APP_URL","http://localhost/jacktv1.github.io/php-basic/syntax");

    // init variables with list function
    $animalArray = ["Dog","Cat","Pig"];
    list($dog, $cat, $pig) = $animalArray; 

?>


<?= $name; ?>
<?= "<br>"; ?>

<?= "List animal: $dog, $cat, $pig"; ?>
<?= "<br>"; ?>

<?= "Constrant: " . APP_URL; ?>