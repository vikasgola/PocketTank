<?php 
  session_start(); 
    $username = $_SESSION['username'];

  if (!isset($_SESSION['username'])) {
  	$_SESSION['msg'] = "You must log in first";
  	header('location: php/login.php');
  }
  if (isset($_GET['logout'])) {
  	session_destroy();
  	unset($_SESSION['username']);
  	header("location: php/login.php");
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Pocket Tank</title>
    <link rel="stylesheet" href="css/main.css">
    <script src="js/easeljs.js" ></script>
    <script src="js/tweenjs.js"></script>
    <script src="js/soundjs.js"></script>
    <script src="js/preloadjs.js"></script>
    <script src="js/matter.js"></script>
</head>

<body onload="loadAssests('<?php echo $username; ?>')">
    <canvas id = "canvas" width="0" height="0"></canvas>

    <script>
    <?php include('js/main.js') ?>
    </script>
</body>
</html>