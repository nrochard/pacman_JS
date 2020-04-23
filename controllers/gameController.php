<?php

if(isset($_GET['game']) ) {

    if (!ctype_digit($_GET['game'])) {
        header('Location:index.php');
        exit;
    }
}
include 'views/game.html';