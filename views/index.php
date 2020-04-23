<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAOX/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAABAQEBAQEBAQEBAAAAAAABAQEBAQEBAQEBAQEAAAAAAQEBAQEBAQEBAQAAAAAAAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEAAAAAAAAAAAABAQEBAQEAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAEBAQEBAQEAAAAAAAAAAAABAQEBAQEBAQEAAAAAAAAAAAEBAQEBAQEBAQEAAAAAAAABAQEBAQAAAQEBAQEAAAAAAAEBAQEAAAEBAQEAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAPgfAADgBwAAwAMAAIABAACAAwAAAA8AAAA/AAAA/wAAAP8AAAA/AAAADwAAgAMAAIABAADAAwAA4AcAAPgfAAA=" rel="icon" type="image/x-icon" />
    <title>Pac-Man</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/fontawesome-free-5.11.2-web/css/all.css">
</head>
<body>

<div class="main">
    <div class="title">
        <center><img src="assets/img/pacmanLogo.png"></center>
    </div>


    <div class="table">
    <table class="highscore">
        <h1>Top 10 Score</h1>
        <?php
        foreach($results as $result):?>
            <tr>
                <td><?= $result['name'] ?></td>
                <td><?= $result['score'] ?></td>
            </tr>
            <?php endforeach; ?>
    </table>
    </div>

    <div class="button">
        <div class="button2">
            <img src="assets/img/ghost1.png">
            <a href="index.php?page=instructions"><button>Next</button></a>
            <img src="assets/img/ghost2.png">
        </div>
    </div>

</div>
</body>
</html>