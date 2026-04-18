using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace newproject.pages
{
    public partial class signup2 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // אם מדובר בבקשה חזרה לדף (לא טעינה ראשונית)
            if (IsPostBack)
            {
                if (true)
                {
                    // חיבור למסד הנתונים המקומי
                    string connectionstring = @"Data Source = (LocalDB)\MSSQLLocalDB; AttachDbFilename = |DataDirectory|\Database1.mdf; Integrated Security = True";
                    SqlConnection con = new SqlConnection(connectionstring);

                    // יצירת שאילתת SQL שלא מחזירה שום תוצאה, רק לשליפת נתונים
                    string SQLStr = $"SELECT * FROM Users WHERE 0=1";
                    SqlCommand cmd = new SqlCommand(SQLStr, con);

                    // יצירת אובייקט DataSet לאחסון הנתונים
                    DataSet ds = new DataSet();

                    // יצירת SqlDataAdapter לשליפת הנתונים
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(ds, "Users");

                    // שאילתת SQL שנועדה לבדוק אם כבר קיים שם משתמש כזה
                    string SQL = $"SELECT COUNT (admin) FROM Users " + $"WHERE use1='{Request.Form["use"]}'";

                    // קריאה לפונקציה לקבלת תוצאה בודדה (כמות של admin) ולחסוך ביצוע שני שלבים (קונקטיביות)
                    int count = (int)GetScalar(SQL);

                    // אם לא נמצאה הרשמה כזו (count == 0), המשך בהוספת משתמש חדש
                    if (count == 0)
                    {
                        // יצירת שורה חדשה בטבלת המשתמשים
                        DataRow dr = ds.Tables["Users"].NewRow();
                        dr["use1"] = Request.Form["use"];
                        dr["pass"] = Request.Form["pass"];
                        dr["tele"] = Request.Form["tele"];
                        dr["email"] = Request.Form["email"];
                        ds.Tables["Users"].Rows.Add(dr);

                        // יצירת SqlCommandBuilder למבנה שאילתת SQL של עדכון
                        SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
                        adapter.UpdateCommand = builder.GetInsertCommand();

                        // ביצוע עדכון למסד הנתונים עם המשתמש החדש
                        adapter.Update(ds, "Users");

                        // הפנייה לדף הבית לאחר ההרשמה
                        Response.Redirect("/pages/homepage.aspx");
                    }
                    else
                    {
                        // הצגת הודעת שגיאה אם שם המשתמש כבר תפוס
                        usemsg.InnerHtml = "Username is taken";
                    }
                }
            }
        }

        // פונקציה שמבצעת שאילתת SQL ומחזירה תוצאה בודדת (למשל, סכום או ספירה)
        public object GetScalar(string SQL)
        {
            // חיבור למסד הנתונים המקומי
            string connectionstring = @"Data Source = (LocalDB)\MSSQLLocalDB; AttachDbFilename = |DataDirectory|\Database1.mdf; Integrated Security = True";
            SqlConnection con = new SqlConnection(connectionstring);

            // יצירת פקודת SQL
            SqlCommand cmd = new SqlCommand(SQL, con);

            // פתיחת חיבור למסד הנתונים, ביצוע השאילתה וסגירת החיבור
            con.Open();
            object scalar = cmd.ExecuteScalar();
            con.Close();

            // החזרת התוצאה
            return scalar;
        }
    }
}