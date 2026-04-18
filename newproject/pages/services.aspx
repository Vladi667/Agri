<%@ Page Title="Services" Language="C#" MasterPageFile="~/Site1.Master" AutoEventWireup="true" CodeBehind="services.aspx.cs" Inherits="newproject.pages.services" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../css/StyleSheet1.css" rel="stylesheet" />
    <link href="../css/ser.css" rel="stylesheet" />
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="services-container">
        <h1 class="main-title">Green Wadi Services</h1>
        
        <div class="services-grid">
         
            <div class="service-card">
                <div class="card-title">Agronomy</div>
                <ul class="service-list">
                    <li>Provide the best methodology and agricultural products</li>
                    <li>Support agronomic growth through R&D</li>
                    <li>Implement sustainable operations</li>
                </ul>
            </div>

           
            <div class="service-card">
                <div class="card-title">Planning</div>
                <ul class="service-list">
                    <li>Agricultural assessments & feasibility studies</li>
                    <li>Strategic planning & master plans</li>
                    <li>GIS & spatial analysis</li>
                    <li>Environmental protection</li>
                </ul>
            </div>

      
            <div class="service-card">
                <div class="card-title">Consulting</div>
                <ul class="service-list">
                    <li>Production guidance & supervision</li>
                    <li>Advanced technology adoption</li>
                    <li>Applied research & development</li>
                </ul>
            </div>

           
            <div class="service-card">
                <div class="card-title">Rural Development</div>
                <ul class="service-list">
                    <li>Regional production & employment</li>
                    <li>Sustainable economic growth</li>
                    <li>Food security & safety</li>
                    <li>Community infrastructure</li>
                </ul>
            </div>

            
            <div class="service-card">
                <div class="card-title">Agribusiness</div>
                <ul class="service-list">
                    <li>Field-to-fork value chains</li>
                    <li>Resource management</li>
                    <li>Productivity improvement</li>
                    <li>Value-added processing</li>
                </ul>
            </div>
        </div>

    </div>
</asp:Content>