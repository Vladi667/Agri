<%@ Page Title="Contacts" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="contacts.aspx.cs" Inherits="newproject.pages.contacts" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../css/StyleSheet1.css" rel="stylesheet" />
    <link href="../css/cont.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="contact-container">
        <div class="profile-card">
            <h1 class="name-title">Shmuel Friedman</h1>
            <div class="credentials">M.A.Adm., M.A.Sc.Agr., B.A.Sc.Agr.</div>
            
            <div class="position-section">
                <div class="former-position">The Former Chief of Staff for the Minister of Agriculture, Israel</div>
            </div>

            <div class="current-role">CEO</div>
            <div class="company-name">Green Wadi – Advanced Agriculture and Know-How Ltd.</div>

            <ul class="contact-list">
                <li>
                    <strong>Address</strong>
                    Sde Yaakov, 3658600 Israel
                </li>
                <li>
                    <strong>Tel.</strong>
                    +972-50-6241818
                </li>
                <li>
                    <strong>Email</strong>
                    Sam@green-wadi.com
                </li>
            </ul>
        </div>
    </div>
</asp:Content>