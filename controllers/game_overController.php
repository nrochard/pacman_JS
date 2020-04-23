<?php
require '../models/TopTen.php';

if(isset($_GET['game_over']) ) {

    if (!ctype_digit($_GET['game_over'])) {
        header('Location:index.php');
        exit;
    }
}
include 'views/game_over.php';