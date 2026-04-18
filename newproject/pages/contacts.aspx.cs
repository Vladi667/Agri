using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace newproject.pages
{
    public partial class contacts : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!(bool)Session["Login"])
            {
                Response.Redirect("/pages/homepage.aspx");
            }
        }
    }
}