<!DOCTYPE html>
<html lang="fr-FR">

<head>
    <meta charset="UTF-8">
    <title>Vanilla Pac-Man</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Coda+Caption:800&display=swap" rel="stylesheet">
</head>

<body>
    <div class="title">PACMAN</div>


    <div class="menu" id="menu">
        <form method="get" action="">
            <div class="input">
                <p>
                    <label for="name">Name : </label>
                    <input type="text" name="name" id="name" require minlength="3" placeholder="Write here" required>
                </p>
            </div>
                <div class="button">
                    <input type="submit" value="Start" class="start">
                </div>
        </form>
    </div>

    <?php if(isset($_GET['name'])) : ?>
        <p class="player">You are : <span style="color: #ffe01b"><?= $_GET['name']?></span></p>
        <p class="score">Your score is : <span id="playerScore"></span> </p>
        <div class="map" id="map">
            <img src="./img/pacman.gif" alt="Pac-Man">
            <img src="./img/redghost.png" alt="Red Ghost">
            <img src="./img/blueghost.png" alt="Blue Ghost">
            <img src="./img/greenghost.png" alt="Green Ghost">
            <img src="./img/background.svg" alt="Labyrinthe">
        </div>
        <script src="main.js"></script>
    <?php endif;?>



</body>



</html>