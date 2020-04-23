<?php

if(isset($_GET['instructions']) ) {

    if (!ctype_digit($_GET['instructions'])) {
        header('Location:index.php');
        exit;
    }
}

include 'views/instructions.php';