<%@ Page Title="" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="updateuser.aspx.cs" Inherits="newproject.Pages.WebForm7" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../css/StyleSheet1.css" rel="stylesheet" />
    <script src="../js/JavaScript.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <h1 id="titles">Update User</h1>


    <!--username-->
    <label for="use">Username:</label><br>
    <input type="text" id="use" name="use" onchange="usech()" required runat="server"><br>
    <div id="usemsg">
        <br />
    </div>

    <!--password-->
    <label for="pass">Password:</label><br>
    <input type="text" id="pass" name="pass" onchange="passch()" required runat="server"><br>
    <div id="passmsg">
        <br />
    </div>

    <!--telephone-->
    <label for="tele">Telephone:</label><br>
    <input type="text" id="tele" name="tele" onchange="telech()" required runat="server"><br>
    <div id="telemsg">
        <br />
    </div>

    <!--email-->
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" onchange="emailch()" required runat="server"><br>
    <div id="emailmsg">
        <br />
    </div>

    <!--submit-->
    <input type="submit" value="Submit" runat="server" onserverclick="updateUser">
    <br />

</asp:Content>
