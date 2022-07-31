<?php
if (isset($_POST['SubscribeEmail'])) {

    // EDIT THE 2 LINES BELOW AS REQUIRED
    // $email_to = "rupikon@gmail.com";
    $email_to = "contact@konorska.com";
    $email_subject = "Subscribe email from webpage (konorska.com)";

    function problem($error)
    {
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br><br>";
        echo $error . "<br><br>";
        echo "Please go back and fix these errors.<br><br>";
        die();
    }

    // validation expected data exists
    if (
        !isset($_POST['SubscribeEmail'])
    ) {
        problem('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $email = $_POST['SubscribeEmail']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if (!preg_match($email_exp, $email)) {
        $error_message .= 'The Email address you entered does not appear to be valid.<br>';
    }

    if (strlen($error_message) > 0) {
        problem($error_message);
    }

    $email_message = "Subscribe details below.\n\n";

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $email_message .= "Email: " . clean_string($email) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    @mail($email_to, $email_subject, $email_message, $headers);
?>

    <!-- include your success message below -->

    <div style="margin:0 auto;text-align: center;max-width: 400px;">
        <br>
        <p style="font-family: Lato, sans-serif;">Thank you for subscribing to my newsletter! I will be in touch with You very soon.</p>
        <div style="text-align: right">
            <a style="font-family: Lato, sans-serif;text-decoration: none;" href="https://konorska.com">Return to my webpage</a>
        </div>
        <br>
        <img style="max-height: 500px;" src="images/doti_flag.jpg">
    </div>

<?php
}
?>