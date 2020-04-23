<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAOX/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAABAQEBAQEBAQEBAAAAAAABAQEBAQEBAQEBAQEAAAAAAQEBAQEBAQEBAQAAAAAAAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAEBAQEBAQEAAAAAAAAAAAABAQEBAQEBAQEAAAAAAAAAAAEBAQEBAQEBAQEAAAAAAAABAQEBAQAAAQEBAQEAAAAAAAEBAQEAAAEBAQEAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAPgfAADgBwAAwAMAAIABAACAAwAAAA8AAAA/AAAA/wAAAP8AAAA/AAAADwAAgAMAAIABAADAAwAA4AcAAPgfAAA=" rel="icon" type="image/x-icon" />
    <title>Game-Over</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/fontawesome-free-5.11.2-web/css/all.css">
</head>
<body>

<div class="main">
    <div class="title">
        <center><img src="../assets/img/pacmanLogo.png"></center>
    </div>
    <h1 id="gameOver">GAME OVER</h1>
    <h3>To submit your score enter your name and <span>validate</span></h3>

    <form action="../models/TopTen.php" method="post">
        <?php if(isset($_POST['error'])):?>
            <?='<h4 class="pseudo_used" >Name already used</h4>' ?>
        <?php endif; ?>
        <label for="nameTitle">Name :</label>
        <input id="name" oninput="validation()" type="text" name="name" placeholder="..." size="10" required class="space_name"><br>

        <label for="scoreTitle">Score :</label>
        <input id="score" type="text" name="score" class="space_score" placeholder= "<?php echo $_POST['score'] ?>" value="<?php echo $_POST['score'] ?>" readonly><br>
        <div class="button4">
            <div class="button2">

                <button class="buttonValidate" type="submit" name="validate" id="validate">Validate</button>
            </div>
        </div>

    </form>
    <div>
                    <a href="https://webstart-dev.ovh/~dv19musso/index.php?page=game"><button class="buttonReplay">Replay</button></a>
    </div>

    <!--    APPARITION BOUTTON VALIDATE-->
    <script>
        var validation = function(){
            if (document.getElementById('name').value)
                document.getElementById('validate').style.visibility='visible';
            else {
                document.getElementById('validate').style.visibility='hidden';
            }
        }
    </script>
    <!--    FONCTION POUR FAIRE CLIGNOTER LE GAME OVER-->
    <script>

        var clignotement = function(){
            if (document.getElementById('gameOver').style.visibility==='visible'){
                document.getElementById('gameOver').style.visibility='hidden';
            }
            else{
                console.log('visible');
                document.getElementById('gameOver').style.visibility='visible';
            }
        };
        periode = setInterval(clignotement, 800);
    </script>

</div>
</body>
</html>