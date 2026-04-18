<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="signup2.aspx.cs" Inherits="newproject.pages.signup2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="../js/JavaScript.js"></script>
    <link href="../css/StyleSheet1.css" rel="stylesheet" />
    <title>Sign Up</title>
</head>
<body>
    <div>
        <h1 id="titles">Sign Up</h1>
    <form method="post" onsubmit="return validateForm()" runat="server">
        <div>
                

        <!--username-->
        <label for="use">Username:</label><br>
        <input type="text" id="use" name="use" onchange="usech()" required><br>
        <div id="usemsg" runat="server">
            <br />
        </div>

        <!--password-->
        <label for="pass">Password:</label><br>
        <input type="password" id="pass" name="pass" onchange="passch()" required><br>
        <div id="passmsg">
            <br />
        </div>

        <!--con password-->
        <label for="password">Conffirm Password:</label><br>
        <input type="password" id="password" name="password" onchange="passwordch()" required><br>
        <div id="passwordmsg">
            <br />
        </div>



        <!--telephone-->
        <label for="tele">Telephone:</label><br>
        <input type="text" id="tele" name="tele" onchange="telech()" required><br>
        <div id="telemsg">
            <br />
        </div>

        <!--email-->
        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" required><br>
        <div id="emailmsg">
            <br />
        </div>


        <div id="finmsg">
        <br />
        </div>

        <!--submit-->
        <input type="submit" value="submit">
        <br />

    
        </div>
    </form>
        <a href="login.aspx"><p>Return to log in</p></a>
        </div>
</body>
</html>
