<?php

// init cookie and set timelife one hour

setcookie('cookie_php', 'quocanh',time() + 3600, 0);

// check existed cookie and print cookie value

if (isset($_COOKIE["cookie_php"])) {

    echo $_COOKIE["cookie_php"];

} else {
    echo 'cookie php not existed';
}

// delete cookie

setcookie('cookie_php', '',time() - 60);
