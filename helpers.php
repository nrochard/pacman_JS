<?php

function dbConnect()
{
  try{
		$db = new PDO('mysql:host=localhost:3306;dbname=dv19musso;charset=utf8', 'dv19musso', 'Oee7&51t', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));

	}
	catch (Exception $exception) //$e contiendra les éventuels messages d’erreur
	{
		die( 'Erreur : ' . $exception->getMessage() );
	}

  return $db;
}