<?php
         $to = "amdcolraine777@gmail.com";
         $subject = "This is subject";
         
         $message = "<b>This is HTML message.</b>";
         
         $headers = "From:ann@ogilviejerome.com \r\n";
         $headers .= "Cc:colinco83@hotmail.co.uk \r\n";
         
         mail($to,$subject,$message,$headers);
         
         header('Location: thank-you.html');
      ?>