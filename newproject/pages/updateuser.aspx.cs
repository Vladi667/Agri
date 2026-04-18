using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace newproject.Pages
{
    public partial class WebForm7 : System.Web.UI.Page
    {
        // פונקציה שמריצה בכל טעינה של הדף (האירוע Page_Load)
        protected void Page_Load(object sender, EventArgs e)
        {
            // אם מדובר בטעינה ראשונית של הדף
            if ((!IsPostBack) && (bool)Session["Admin"])
            {
                // חיבור למסד הנתונים המקומי
                string connectionString = @"Data Source = (LocalDB)\MSSQLLocalDB; AttachDbFilename = |DataDirectory|\Database1.mdf; Integrated Security = True";
                SqlConnection con = new SqlConnection(connectionString);

                // שליפת נתוני המשתמש שברצוננו לעדכן, לפי מזהה המשתמש ששמור ב-Session
                string SQLstr = $"SELECT * FROM Users Where Id={(int)Session["userToUpdate"]}";
                SqlCommand cmd = new SqlCommand(SQLstr, con);

                // יצירת אובייקט DataSet לאחסון הנתונים
                DataSet ds = new DataSet();

                // יצירת SqlDataAdapter לשליפת הנתונים
                SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                adapter.Fill(ds, "Users");

                // שליפת השורה הראשונה מתוך טבלת המשתמשים
                DataRow dr = ds.Tables["Users"].Rows[0];

                // הצגת נתוני המשתמש בעמוד, למשל בתיבות טקסט
                use.Value = dr["use1"].ToString().Trim();
                pass.Value = dr["pass"].ToString().Trim();
                tele.Value = dr["tele"].ToString().Trim();
                email.Value = dr["email"].ToString().Trim();
            }
        }

        // פונקציה שמתבצעת בעת שליחת הטופס לעדכון המשתמש
        public void updateUser(object sender, EventArgs e)
        {
            // חיבור למסד הנתונים המקומי
            string connectionString = @"Data Source = (LocalDB)\MSSQLLocalDB; AttachDbFilename = |DataDirectory|\Database1.mdf; Integrated Security = True";
            SqlConnection con = new SqlConnection(connectionString);

            // שליפת נתוני המשתמש שברצוננו לעדכן, לפי מזהה המשתמש ששמור ב-Session
            string SQLstr = $"SELECT * FROM Users Where Id={(int)Session["userToUpdate"]}";
            SqlCommand cmd = new SqlCommand(SQLstr, con);

            // יצירת אובייקט DataSet לאחסון הנתונים
            DataSet ds = new DataSet();

            // יצירת SqlDataAdapter לשליפת הנתונים
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(ds, "Users");

            // שליפת השורה הראשונה מתוך טבלת המשתמשים
            DataRow dr = ds.Tables["Users"].Rows[0];

            // עדכון שדות המשתמש בטבלה עם הערכים החדשים מתוך הטופס
            dr["use1"] = use.Value;
            dr["pass"] = pass.Value;
            dr["tele"] = tele.Value;
            dr["email"] = email.Value;

            // יצירת SqlCommandBuilder למבנה שאילתת SQL של עדכון
            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.UpdateCommand = builder.GetUpdateCommand();

            // ביצוע עדכון למסד הנתונים
            adapter.Update(ds, "Users");

            // הפנייה לדף הצגת המשתמשים לאחר עדכון המידע
            Response.Redirect("/pages/table.aspx");
        }
    }
}