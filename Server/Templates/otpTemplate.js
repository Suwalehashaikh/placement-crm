export const otpTemplate=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>OTP Verification</title>

<style>
    body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, sans-serif;
    }

    .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    .header {
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        text-align: center;
        padding: 30px;
    }

    .header h1 {
        margin: 0;
        font-size: 28px;
    }

    .content {
        padding: 40px 30px;
        text-align: center;
        color: #333;
    }

    .content h2 {
        margin-bottom: 15px;
    }

    .content p {
        color: #666;
        line-height: 1.6;
    }

    .otp-box {
        display: inline-block;
        margin: 25px 0;
        padding: 15px 35px;
        font-size: 32px;
        font-weight: bold;
        letter-spacing: 8px;
        color: #4f46e5;
        border: 2px dashed #4f46e5;
        border-radius: 10px;
        background: #f8f8ff;
    }

    .warning {
        color: #e63946;
        font-size: 14px;
        margin-top: 15px;
    }

    .footer {
        background: #f9fafb;
        text-align: center;
        padding: 20px;
        font-size: 13px;
        color: #777;
    }

    @media(max-width:600px){
        .content{
            padding: 25px 15px;
        }

        .otp-box{
            font-size: 24px;
            letter-spacing: 4px;
            padding: 12px 25px;
        }
    }
</style>
</head>

<body>

<div class="container">

    <div class="header">
        <h1>Your App Name</h1>
    </div>

    <div class="content">
        <h2>Email Verification</h2>

        <p>
            Use the following One-Time Password (OTP) to verify your account.
        </p>

        <div class="otp-box">
           {OTP}
        </div>

        <p>
            This OTP is valid for <strong>10 minutes</strong>.
        </p>

        <p class="warning">
            Do not share this OTP with anyone.
        </p>
    </div>

    <div class="footer">
        © 2026 Your App Name. All Rights Reserved.
    </div>

</div>

</body>
</html>`