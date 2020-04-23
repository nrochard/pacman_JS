<?php
include '../helpers.php';

$score = $_POST['score'];
$name = $_POST['name'];

echo sendScore();
header('Location:../index.php');
exit;

function sendScore()
{

    $db = dbConnect();
    $query = $db->prepare('SELECT count(*) from pacman where name = ?') ;
    $query->execute(
        [
        $_POST['name']
        ]
    );
    $data = $query->fetchColumn();

    if($data == 0) {
        $query = $db->prepare('INSERT INTO pacman (name, score) VALUES (?, ?)');
        $result = $query->execute(
            [
                $_POST['name'],
                $_POST['score']
            ]
        );
    }
    else {
        $url = 'https://webstart-dev.ovh/~dv19musso/views/game_over.php';
        $data = array('score' => $_POST['score'], 'name' => $_POST['name'], 'error' => 'true');


        $options = array(
            'http' => array(
                'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($data)
            )
        );
        $context  = stream_context_create($options);
        $result = file_get_contents($url, false, $context);


        echo $result;
        exit;
    }
}