using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace newproject
{
    public partial class Site1 : System.Web.UI.MasterPage
    {
        // פונקציה שמריצה בכל טעינה של הדף (האירוע Page_Load)
        protected void Page_Load(object sender, EventArgs e)
        {
            // אם המשתמש לא בעל הרשאות אדמין, מסתירים את האלמנט עם מזהה 'table'
            if (!(bool)Session["Admin"])
            {
                table.Style.Add("display", "none");
            }
            else
            {
                // אם המשתמש בעל הרשאות אדמין, מציגים את האלמנט עם מזהה 'table'
                table.Style.Add("display", "block");
            }

            // אם המשתמש לא מחובר (Session["Login"] שווה ל-false), מסתירים את האלמנט עם מזהה 'page1'
            if (!(bool)Session["Login"])
            {
                page1.Style.Add("display", "none");
                logoutq.Style.Add("display", "none");
            }
            else
            {
                // אם המשתמש מחובר, מציגים את האלמנט עם מזהה 'page1' ומסתירים את האלמנט עם מזהה 'login'
                page1.Style.Add("display", "block");
                login.Style.Add("display", "none");
            }
        }
    }
}