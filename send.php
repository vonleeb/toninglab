<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){
$data['name'] = trim(array_key_exists('name', $_POST) ? $_POST['name'] : null);
$data['phone'] = trim(array_key_exists('phone', $_POST) ? $_POST['phone'] : null);
$data['msg'] = trim(array_key_exists('msg', $_POST) ? $_POST['msg'] : null);

    if(!is_null($data['phone'])
    && preg_match("/^((\+?375)?(\s|-)?(17|29|33|44)(\s|-)?)?(\s|-)?\d{3}(\s|-)?\d{2}(\s|-)?\d{2}$/",$data['phone']) == 1) {


        $to      = 'pavlikdoctor@yandex.ru';
        $subject = 'Новый заказ';
        $message = '';
        $message .= 'Заказчик: ' . $data['name'] . "\r\n";
        $message .= 'Телефон: ' . $data['phone'] . "\r\n";
        $message .= 'Сообщение: ' . $data['msg'] . "\r\n";
        $headers = 'From: ' . $to . "\r\n" .
            'Reply-To: your@site.com' . "\r\n";

    if(mail($to, $subject, $message, $headers) === TRUE){
        echo json_encode('Спасибо! Ваша заявка принята.');
    }else echo json_encode('Ошибка. Попробуйте еще раз, после перезагузки страницы!');
//        echo json_encode('Спасибо! Ваша заявка принята.');

    }else echo json_encode("Ошибка. Проверьте введенный телефон!");



}else {
    header("Location: /",true,307);
}