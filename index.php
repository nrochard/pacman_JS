<?php
require('helpers.php');

if(isset($_GET['page'])):
    switch ($_GET['page']):
        case 'instructions' :
            require 'controllers/instructionsController.php';
            break;

        case 'game' :
            require 'controllers/gameController.php';
            break;

        case 'game_over' :
            require 'controllers/game_overController.php';
            break;

        default :
            require 'controllers/indexController.php';
    endswitch;
else:
    require 'controllers/indexController.php';
endif;