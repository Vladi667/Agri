<%@ Page Title="Table" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="table.aspx.cs" Inherits="newproject.Pages.WebForm6" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../css/StyleSheet1.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <br />
    <label for="Columns">sort by columns</label> &nbsp &nbsp <br />
    <select id="Columns" runat="server">
        <option value="Id">userId</option>
        <option value="use1">username</option>
        <option value="pass">password</option>
        <option value="tele">phone</option>
        <option value="email">email</option>
    </select>           &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
    <input type="radio" id="ASC" name="order" value="ASC" checked/>
    <label for="ASC">ASC</label>        &nbsp &nbsp
    <input type="radio" id="DESC" name="order" value="DESC" checked/>
    <label for="DESC">DESC</label>        <br /><br />
    <br /><br /> 






    <br />
    <label for="fil">filter</label> &nbsp &nbsp <br />
    <select id="Select2" runat="server">
    <option value="Id">userId</option>
    <option value="use1">username</option>
    <option value="pass">password</option>
    <option value="tele">phone</option>
    <option value="email">email</option>
    </select>           &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
    <input type="text" name="Filter" id="Filter" />
    
    
    <input type="submit" value ="filter" name="btnfilter" id="btnfilter" runat="server" onserverclick="Click_Fliter" />
    <br /><br />
    <input type="submit" value="delete" name="btndelete" id="btndelete" runat="server" onserverclick="Delete" />
    <input type="submit" value ="edit" name="btnedit" id="Button2" runat="server" onserverclick="Edit" />
    <br /><br /><br />

<div runat="server" id="tableDiv">
    
</div>
</asp:Content>
