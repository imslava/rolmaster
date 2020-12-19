<?php

  $mail->SMTPDebug = 0;
  // $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'ilyr.dev';
  $mail->Password = 'qAqvAoKb';
  $mail->SMTPSecure = 'ssl'; 
  $mail->Port = 465;

  // Адреса
  $mail->setFrom('info@iloveyourings.ru', 'ILYR'); // От кого
  $mail->addAddress('slava.cpa@yandex.ru'); // Кому

?>