<?php
         $to = "amdcolraine777@gmail.com";
         $subject = "This is subject";
         
         $message = "<b>This is HTML message.</b>";
         
         //$headers = "From:ann@ogilviejerome.com \r\n";
         //$headers .= "Reply-To:amdcolraine777@gmail.com \r\n";
         
         $headers .= "MIME-Version: 1.0\r\n";
         $headers .= "Content-type: text/html\r\n";
         $headers .= 'From: ann@ogilviejerome.com' . "\r\n" .
         'Reply-To: amdcolraine777@gmail.com' . "\r\n" .
         'X-Mailer: PHP/' . phpversion();

         mail($to,$subject,$message,$headers);
         
         header('Location: thank-you.html');
      ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>Thank you</p>
</body>
</html>