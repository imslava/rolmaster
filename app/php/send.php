<?php

    // Подключение PHPMailer
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/PHPMailer.php';
    require 'phpmailer/Exception.php';
    require 'phpmailer/SMTP.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        //Переменные
        $name = $_POST['name'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $city = $_POST['city'];
        $date = $_POST['date'];
        $time = $_POST['time'];
        $form = $_POST['form'];

        if($name == ""){
            $name_str = "";
        }else{
            $name_str = "<b>Имя:</b><br>".$name."<br><br>";
        }

        if($email == ""){
            $email_str = "";
        }else{
            $email_str = "<b>E-mail:</b><br>".$email."<br><br>";
        }

        if($phone == ""){
            $phone_str = "";
        }else{
            $phone_str = "<b>Телефон:</b><br>".$phone."<br><br>";
        }

        if($city == ""){
            $city_str = "";
        }else{
            $city_str = "<b>Город:</b><br>".$city."<br><br>";
        }

        if($time == ""){
            $time_str = "";
        }else{
            $time_str = "<b>Время замера:</b><br>".$time." (".$date.")<br><br>";
        }

        date_default_timezone_set('Europe/Moscow');
        $datelead = date('d.m.Y H:i:s');

        if($form == 'Расчет - автоматические ворота'){
            $message = "<b>Форма:</b><br>".$form."<br><br>
                        <b>Время заявки:</b><br>".$datelead."
                        <hr>
                        <b>Высота проема, мм:</b><br>".$_POST['calc-1']."<br><br>
                        <b>Ширина проема, мм:</b><br>".$_POST['calc-2']."<br><br>
                        <b>Шит ворот:</b><br>".$_POST['calc-3']."<br><br>
                        <b>Обшивка:</b><br>".$_POST['calc-4']."<br><br>
                        <b>Материал обшивки:</b><br>".$_POST['calc-5']."<br><br>
                        <b>Тип покраски:</b><br>".$_POST['calc-6']."<br><br>
                        <b>Монтаж:</b><br>".$_POST['calc-7']."<br><br>
                        <b>Тип управления:</b><br>".$_POST['calc-8']."<br><br>
                        <b>Дополнительные аксессуары:</b><br>".implode(", ", $_POST['calc-9'])."<br><br>
                        <b>Дополнительные брелки:</b><br>".$_POST['calc-10']."<br><br>
                        <b>Адрес, где будет производится монтаж:</b><br>".$_POST['calc-11']."<br><br>
                        <b>Дополнительные пожелания по заказу:</b><br>".$_POST['calc-12']."<br><br>
                        <b>Номер телефона:</b><br>".$_POST['phone'];
        }elseif($form == 'Расчет - рольставни'){
            $message = "<b>Форма:</b><br>".$form."<br><br>
                        <b>Время заявки:</b><br>".$datelead."
                        <hr>
                        <b>Высота проема, мм:</b><br>".$_POST['calc-1']."<br><br>
                        <b>Ширина проема, мм:</b><br>".$_POST['calc-2']."<br><br>
                        <b>Тип профиля:</b><br>".$_POST['calc-3']."<br><br>
                        <b>Как будут ставиться рольставни:</b><br>".$_POST['calc-4']."<br><br>
                        <b>Защитный короб:</b><br>".$_POST['calc-5']."<br><br>
                        <b>Тип привода:</b><br>".$_POST['calc-6']."<br><br>
                        <b>Тип покраски:</b><br>".$_POST['calc-7']."<br><br>
                        <b>Монтаж:</b><br>".$_POST['calc-8']."<br><br>
                        <b>Дополнительные аксессуары:</b><br>".implode(", ", $_POST['calc-9'])."<br><br>
                        <b>Дополнительные брелки:</b><br>".$_POST['calc-10']."<br><br>
                        <b>Адрес, где будет производится монтаж:</b><br>".$_POST['calc-11']."<br><br>
                        <b>Дополнительные пожелания по заказу:</b><br>".$_POST['calc-12']."<br><br>
                        <b>Номер телефона:</b><br>".$_POST['phone'];
        }else{
            $message = "<b>Форма:</b><br>".$form."<br><br><b>Время заявки:</b><br>".$datelead."<hr>".$name_str.$email_str.$phone_str.$city_str.$time_str;
        }

        //Отправка на почту
        $mail = new PHPMailer(true);
        $mail->CharSet = 'UTF-8';

        try {

            // Настройки сервера
            require_once('setting.php');

            for ($ct = 0; $ct < count($_FILES['userfile']['tmp_name']); $ct++) {
                // $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['userfile']['name'][$ct]));
                $uploadfile = '../upload/'.sha1($_FILES['userfile']['name'][$ct]);
                $filename = $_FILES['userfile']['name'][$ct];
                if (move_uploaded_file($_FILES['userfile']['tmp_name'][$ct], $uploadfile)) {
                    $mail->addAttachment($uploadfile, $filename);
               } else {
                    $msg .= 'Неудалось прикрепить файл ' . $uploadfile;
                }
            }

            // Письмо
            $mail->isHTML(true); 
            $mail->Subject = $form;
            $mail->Body = $message;

            if ($mail->send()) {    
                $files = glob('../upload/*'); 
                foreach($files as $file){
                  if(is_file($file))
                    unlink($file);
                }
    
            } else {
                echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
            }

        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }

    }

?>