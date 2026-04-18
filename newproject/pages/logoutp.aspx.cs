using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace newproject.pages
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // עדכון ה-Session כדי לציין שהמשתמש התנתק
            Session["Login"] = false;
            Session["username"] = "Guest";
            Session["Admin"] = false;

            // הפניית המשתמש לדף הבית לאחר היציאה
            Response.Redirect("/pages/login.aspx");
        }
    }
}