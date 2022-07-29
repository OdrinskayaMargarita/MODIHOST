<?php

//VALIDATING THE INPUT AND CAPTCHA
if (count($_POST)) {
    //HONEYPOT FIELD
    if ($_POST['require_attention']) {
        header("HTTP/1.0 400 Bad Request");
        die('Protection fail');
    }

} else {
    header("HTTP/1.0 400 Bad Request");
    die('Empty');
}


//CHECKING FORM TYPE
if($_POST['formType'] == 'register') {
    //Contact Form

    //Checking if required fields not empty
    if (!$_POST['hotel_name'] || !$_POST['hotel_type'] || !$_POST['location_country'] || !$_POST['rooms_number'] || !$_POST['name'] || !$_POST['tel'] || !$_POST['email'] || !$_POST['name'] || !$_POST['name'] || !$_POST['name']) {
        header("HTTP/1.0 400 Bad Request");
        die('Required fields are missing');
    }

    $data['Hotel or Host name'] = htmlspecialchars($_POST['hotel_name'], ENT_QUOTES);
    $data['Hotel type'] = htmlspecialchars($_POST['hotel_type'], ENT_QUOTES);
    $data['Location country'] = htmlspecialchars($_POST['location_country'], ENT_QUOTES);
    $data['Number of rooms'] = htmlspecialchars($_POST['rooms_number'], ENT_QUOTES);
    $data['Contact name'] = nl2br(htmlspecialchars($_POST['name'], ENT_QUOTES));
    $data['Phone number'] = nl2br(htmlspecialchars($_POST['tel'], ENT_QUOTES));
    $data['Email'] = nl2br(htmlspecialchars($_POST['email'], ENT_QUOTES));
    $data['Hotel website'] = nl2br(htmlspecialchars($_POST['hotel_website'], ENT_QUOTES));
    if (htmlspecialchars($_POST['hotel_chain_check'], ENT_QUOTES) == 'true') {
        $data['My accommodation is a part of hotel chain'] = 'Yes';
        $data['Hotel chain name'] = nl2br(htmlspecialchars($_POST['hotel_chain_name'], ENT_QUOTES));
    } else {
        $data['My accommodation is a part of hotel chain'] = 'No';
    }
    $data['Approximate annual turnover'] = nl2br(htmlspecialchars($_POST['turnover'], ENT_QUOTES));
    $data['Approximate occupancy rate'] = "Rate " . number_format(htmlspecialchars($_POST['occupancy_rate'], ENT_QUOTES), 0, '.', ',');
    $data['How did you hear about ModiHost?'] = nl2br(htmlspecialchars($_POST['options_about'], ENT_QUOTES));

    //$clientSubject = 'Enquiry Confirmation';
    //$emailTemplate = '/emails/enquiry.html';
    //$clientReplaceSubject = 'Register';

    $adminSubject = 'Modihost Website Hotel Registration';
    $filename = '/.forms/hotels.csv';

    //Loc
    //$adminEmail = 'ovla.labtop.digital@gmail.com';
    //Prod
    $adminEmail = 'hotels@modihost.io';
}

elseif ($_POST['formType'] == 'contact'){
    if (!$_POST['name'] || !$_POST['email'] || !$_POST['recipient'] || !$_POST['message']) {
        header("HTTP/1.0 400 Bad Request");
        die('Required fields are missing');
    }
    $data['Name'] = htmlspecialchars($_POST['name'], ENT_QUOTES);
    $data['E-mail'] = htmlspecialchars($_POST['email'], ENT_QUOTES);
    $data['Phone number'] = htmlspecialchars($_POST['tel'], ENT_QUOTES);
    $data['Recipient'] = htmlspecialchars($_POST['recipient'], ENT_QUOTES);
    $data['Message'] = nl2br(htmlspecialchars($_POST['message'], ENT_QUOTES));

    //$clientSubject = 'Enquiry Confirmation';
    //$emailTemplate = '/emails/enquiry.html';

	if (strpos($data['Recipient'], 'modihost.io') !== false) {
		$adminEmail = $data['Recipient'];
	    $adminSubject = 'Modihost Website Contact Form';
	}
    $filename = '/.forms/contacts.csv';
}

elseif ($_POST['formType'] == 'tokensale'){
    if (!$_POST['name'] || !$_POST['phone_number'] || !$_POST['location_country'] || !$_POST['email'] || !$_POST['investments'] || !$_POST['agreement_check_1'] || !$_POST['agreement_check_2'] || !$_POST['agreement_check_3'] || !$_POST['agreement_check_4']) {
        header("HTTP/1.0 400 Bad Request");
        die('Required fields are missing');
    }
    $data['Name'] = htmlspecialchars($_POST['name'], ENT_QUOTES);
    $data['Phone number'] = htmlspecialchars($_POST['phone_number'], ENT_QUOTES);
    $data['Country of Residence'] = htmlspecialchars($_POST['location_country'], ENT_QUOTES);
    $data['Email'] = htmlspecialchars($_POST['email'], ENT_QUOTES);
    $data['Investment size'] = nl2br(htmlspecialchars($_POST['investments'], ENT_QUOTES));

    //$clientSubject = 'Enquiry Confirmation';
    //$emailTemplate = '/emails/enquiry.html';
    //$clientReplaceSubject = 'Contacts';

    $adminSubject = 'Modihost Website Tokensale Registration';
    $filename = '/.forms/tokensale.csv';

    //Loc
    //$adminEmail = 'ovla.labtop.digital@gmail.com';
    //Prod
    $adminEmail = 'contact@modihost.io';
}


elseif ($_POST['formType'] == 'subscribe') {
    $data['E-mail'] = htmlspecialchars($_POST['email'], ENT_QUOTES);

    $adminSubject = 'Modihost Website Newsletter Signup';
    $filename = '/.forms/subscribe.csv';
	
	
	//SENDING TO MAILOCTOPUS

	// The data to send to the API
	$postData = array(
		'api_key' => 'bf417e03-d54d-11e9-be00-06b4694bee2a',
		'email_address' => $data['E-mail'],
	);

	// Setup cURL
	$ch = curl_init('https://emailoctopus.com/api/1.5/lists/d652c35f-d54c-11e9-be00-06b4694bee2a/contacts');

	curl_setopt_array($ch, array(
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array("Content-Type: application/json"),
		CURLOPT_POSTFIELDS => json_encode($postData)
	));
	echo json_encode($postData);
	// Send the request
	$response = curl_exec($ch);

	// Check for errors
	if($response === FALSE){
		header('HTTP/1.1 503 Service Temporarily Unavailable');	
		die(curl_error($ch));
	}

	if (curl_getinfo($ch, CURLINFO_HTTP_CODE) != 200) {
		header('HTTP/1.1 503 Service Temporarily Unavailable');
		print_r($response);
	}

    //Loc
    //$adminEmail = 'ovla.labtop.digital@gmail.com';
    //Prod
    $adminEmail = 'contact@modinori.com';
}


else {
    header("HTTP/1.0 400 Bad Request");
    die('Unknown Form');
}


//PROCESSING RESULTS
$data['Datetime'] = date('Y-m-d H:i:s');
$message_to_send = '';

foreach ($data as $key => $value) {
    $message_to_send .= '<p><strong>' . $key . ':</strong> ' . $value . "</p>";
    $csv[] = $value;
}

//WRITING TO FILE
//$file = fopen($filename, 'a');
$file = fopen($_SERVER['DOCUMENT_ROOT'] . $filename, 'a');
fputcsv($file, $csv);
fclose($file);



// SENDING EMAIL TO ADMIN
/*
if ($adminSubject) {
    $to = $adminEmail;
    $headers = "From: noreply@modihost.io" . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
    mail($to, $adminSubject, $message_to_send, $headers, "-f noreply@modihost.io");
}*/


if ($adminSubject) {
    require 'SMTPMailer.php';
    $mail = new SMTPMailer('smtp-pulse.com', 587, 'tls');
    $mail->Auth('contact@modihost.io', '3GeqQFGXKt5');
    
    $mail->addTo($adminEmail);
    if ($data['E-mail']) $mail->addReplyTo($data['E-mail'], $data['Name']);

    $mail->Subject($adminSubject);
    $mail->Body($message_to_send);

    if ($mail->Send()) echo 'Mail sent successfully';
    else               echo 'Mail failure';
}


// SENDING EMAIL TO CLIENT
//Html
//if ($clientSubject) {
//
//	$htmlContent = file_get_contents($emailTemplate);
//
//	$replacements = array(
//		'{{subject}}' => $clientReplaceSubject,
//		'{{name}}' => $data['Name'],
//		'{{phone}}' => $data['Phone number'],
//		'{{message}}' => $data['Message'],
//	);
//
//	$htmlContent = str_replace(array_keys($replacements), array_values($replacements), $htmlContent);
//
//	$to = $data['E-mail'];
//	$headers = "From: \"Modihost\" <info@modihost.com>" . "\r\n";
//	$headers .= "MIME-Version: 1.0\r\n";
//	$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
//	mail($to, $clientSubject, $htmlContent, $headers, "-f info@modihost.com");
//}

//Text
//if ($clientSubject) {
//    $to = $data['E-mail'];
//    $headers = "From: \"Modihost\" <noreply@modihost.com>" . "\r\n";
//    $headers .= "MIME-Version: 1.0\r\n";
//    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
//    mail($to, $clientSubject, $message_to_send, $headers, "-f noreply@modihost.com");
//}