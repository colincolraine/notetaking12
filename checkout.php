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