<?php

function getTopScores()
    {
        $db = dbConnect();

        $query = $db->query('SELECT * FROM pacman ORDER BY score DESC LIMIT 10');
        $topScores = $query->fetchAll(PDO::FETCH_ASSOC);

        return $topScores;
    }