<%@ Page Title="Login" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="newproject.Pages.WebForm4" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../css/StyleSheet1.css" rel="stylesheet" />
    <script src="../js/JavaScript.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1 id="titles">Log In</h1>

        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username" onchange="logch()"><br>

        <label for="password">Password:</label><br>
        <input type="password" id="password" name="password" onchange="logch()"><br>
        <input type="submit" value="Submit">
            <div id="euse" runat="server" style="color:red">
            <br />
        </div>

<p id="sign">Don't Have an Acount?<a href="signup2.aspx"> Sign Up</a></p>
</asp:Content>
