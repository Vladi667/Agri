<%@ Page Title="Who Are We" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="HtmlPage1.aspx.cs" Inherits="newproject.Pages.WebForm3" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../css/StyleSheet1.css" rel="stylesheet" />
    <link href="../css/who.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="hero-section">
        <h1 class="organic-title">Who We Are</h1>
        
        <div class="floating-content">
            <div class="history-item">
                <div class="history-year"></div>
                <p><span class="highlight-phrase">"Green Wadi Ltd."</span> started as a one-man operation when Mr. Friedman left the Ministry of Agriculture of Israel to become an independent consultant 10 years ago.</p>
            </div>
            
            <div class="nature-divider"></div>
            
            <div class="history-item">
                <div class="history-year"></div>
                <p>In 2018, due to the expansion of projects, Green Wadi became a limited company employing experts as needed to be efficient and successful. We are committed to providing our clients with quick answers and solutions.</p>
            </div>
            
            <div class="nature-divider"></div>
            
            <div class="history-item">
                <p>Private investors, governments, and development funds around the world have trusted Green Wadi to realize their agricultural and rural development vision.</p>
            </div>
            
            <div class="nature-divider"></div>
            
            <div class="history-item">
                <p>We offer diverse services, technology, know-how, and training required for the upgrading and construction of existing and new agricultural and agro-industrial enterprises.</p>
            </div>
            
            <div class="nature-divider"></div>
            
            <div class="history-item">
                <p>Our successful projects have earned Green Wadi a reputation for delivering measurable value for the long term.</p>
            </div>
        </div>
    </div>
</asp:Content>
