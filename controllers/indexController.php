<?php


 require_once('models/highScores.php');

$topScores = getTopScores();
$results = $topScores;

include 'views/index.php';
