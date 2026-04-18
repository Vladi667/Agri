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
    public partial class WebForm4 : System.Web.UI.Page
    {
        // פונקציה שמריצה בכל טעינה של הדף (האירוע Page_Load)
        protected void Page_Load(object sender, EventArgs e)
        {
            // אם מדובר בבקשה חזרה לדף (לא טעינה ראשונית)
            if (IsPostBack)
            {
                // בניית שאילתת SQL לבדיקת שם משתמש וסיסמה שנשלחו מהטופס
                string SQL = $"SELECT * FROM Users " +
                    $"WHERE use1='{Request.Form["username"]}' AND pass ='{Request.Form["password"]}'";

                // קריאה לפונקציה לקבלת נתונים מהטבלה של המשתמשים
                DataSet ds = RetreieveUsersTable(SQL);

                // אם נמצאו נתונים (המשתמש נמצא)
                if (ds.Tables[0].Rows.Count > 0)
                {
                    // שמירת פרטי המשתמש ב-session כדי להשתמש בהם בהמשך
                    Session["username"] = Request.Form["username"];
                    Session["Login"] = true;
                    Session["Admin"] = ds.Tables["Users"].Rows[0]["admin"];

                    // ניקוי הודעות שגיאה
                    euse.InnerHtml = "";

                    // מעבר לדף הבית
                    Response.Redirect("/pages/homepage.aspx");
                }
                else
                {
                    // אם לא נמצא משתמש מתאים, הגדרת session כלא מחובר
                    Session["Login"] = false;
                    Session["username"] = "Guest";
                    Session["Admin"] = false;

                    // הצגת הודעת שגיאה
                    euse.InnerHtml = "Wrong Username or Password";
                }
            }
        }

        // פונקציה שמחזירה את טבלת המשתמשים מתוך מאגר הנתונים על פי שאילתה שנשלחת
        public DataSet RetreieveUsersTable(string SQLStr)
        {
            // מחרוזת חיבור למסד נתונים מקומי
            string connectionString = @"Data Source = (LocalDB)\MSSQLLocalDB; AttachDbFilename = |DataDirectory|\Database1.mdf; Integrated Security = True";
            SqlConnection con = new SqlConnection(connectionString);

            // יצירת פקודת SQL
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = SQLStr;
            cmd.Connection = con;

            // יצירת SqlDataAdapter לשליפת נתונים
            SqlDataAdapter ad = new SqlDataAdapter(cmd);

            // יצירת אובייקט DataSet לאחסון הנתונים
            DataSet ds = new DataSet();

            // ביצוע השאילתה והכנסת התוצאות ל-DataSet
            ad.Fill(ds, "Users");

            // החזרת הנתונים
            return ds;
        }
    }
}