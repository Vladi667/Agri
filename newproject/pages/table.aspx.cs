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
    public partial class WebForm6 : System.Web.UI.Page
    {
        // פונקציה שמריצה בכל טעינה של הדף (האירוע Page_Load)
        protected void Page_Load(object sender, EventArgs e)
        {
            // אם המשתמש אינו בעל הרשאות אדמין, מפנים אותו לדף הבית
            if ((bool)Session["Admin"] == false)
            {
                Response.Redirect("/pages/homepage.aspx");
            }

            // אם מדובר בטעינה ראשונית של הדף
            if (!IsPostBack)
            {
                // יצירת שאילתת SQL לשליפת כל הנתונים מהטבלה של המשתמשים
                string SQLStr = "SELECT * FROM Users";
                DataSet ds = RetreieveUsersTable(SQLStr);

                // המרת הנתונים מ-DataSet ל-DataTable
                DataTable dt = ds.Tables[0];

                // בניית הטבלה שתוצג בדף
                string table = BuildUsersTable(dt);

                // הצגת הטבלה בתוך האלמנט tableDiv
                tableDiv.InnerHtml = table;
            }
        }

        // פונקציה שמבצעת שליפת טבלת משתמשים מתוך מסד הנתונים
        public DataSet RetreieveUsersTable(string SQLStr)
        {
            string connectionString = @"Data Source = (LocalDB)\MSSQLLocalDB; AttachDbFilename = |DataDirectory|\Database1.mdf; Integrated Security = True";
            SqlConnection con = new SqlConnection(connectionString);

            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = SQLStr;
            cmd.Connection = con;

            SqlDataAdapter ad = new SqlDataAdapter(cmd);

            DataSet ds = new DataSet();

            ad.Fill(ds, "Users");

            return ds;
        }

        // פונקציה שבונה את הטבלה HTML של המשתמשים
        public string BuildUsersTable(DataTable dt)
        {
            string str = "<table class='usersTable' align='center'>";
            str += "<tr>";
            str += "<td> </td>"; // יצירת עמודה עבור תיבות הבחירה
            foreach (DataColumn column in dt.Columns)
            {
                str += "<td>" + column.ColumnName + "</td>"; // הוספת כותרות עמודות
            }

            foreach (DataRow row in dt.Rows)
            {
                str += "<tr>";
                str += "<td>" + CreateRadioBtn(row["Id"].ToString()) + "</td>"; // הוספת תיבת בחירה לכל משתמש
                foreach (DataColumn column in dt.Columns)
                {
                    str += "<td>" + row[column] + "</td>"; // הצגת נתוני המשתמש
                }
                str += "</tr>";
            }
            str += "</tr>";
            str += "</table>";
            return str;
        }

        // פונקציה שמייצרת תיבת רדיו עבור כל משתמש
        public string CreateRadioBtn(string id)
        {
            return $"<input type='checkbox' name='chk{id}' id='chk{id}' runat='server' />";
        }

        // פונקציה שמבנה את שאילתת SQL עבור חיפוש ומיון
        public string BuildSQLStr2(string column, string order, string str, string xilter)
        {
            if (str.Length == 0)
            {
                string SQLstr = $"SELECT * FROM Users " + $"ORDER BY {column} {order}";
                return SQLstr;
            }
            string SQLStr = $"SELECT * FROM Users " + $"WHERE {xilter} LIKE '%{str}%' " + $"ORDER BY {column} {order}";
            return SQLStr;
        }

        // פונקציה שמבצעת מחיקה של משתמשים שנבחרו
        public void Delete(object sender, EventArgs e)
        {
            string connectionString = @"Data Source=(LocalDB)\MSSQLLocalDB; AttachDbFilename=|DataDirectory|\Database1.mdf; Integrated Security=True";
            SqlConnection con = new SqlConnection(connectionString);

            string SQLStr = "SELECT * FROM Users";
            SqlCommand cmd = new SqlCommand(SQLStr, con);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            DataSet ds = new DataSet();
            adapter.Fill(ds, "Users");

            // עבור כל תיבת בחירה שנבחרה, מחיקת המשתמש המתאים
            for (int i = 1; i < Request.Form.Count; i++)
            {
                if (Request.Form.AllKeys[i].Contains("chk"))
                {
                    int Id = int.Parse(Request.Form.AllKeys[i].Remove(0, 3));
                    DataRow[] dr = ds.Tables["Users"].Select($"Id = {Id}");
                    dr[0].Delete();
                }
            }

            // עדכון הנתונים במסד הנתונים
            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.UpdateCommand = builder.GetDeleteCommand();
            adapter.Update(ds, "Users");

            // עדכון הטבלה המוצגת בדף
            string table = BuildUsersTable(ds.Tables["Users"]);
            tableDiv.InnerHtml = table;
        }

        // פונקציה שמבצעת סינון בעזרת שאילתת SQL
        public void Click_Fliter(object sender, EventArgs e)
        {
            string SQLStr = BuildSQLStr2(Columns.Value, Request.Form["order"], Request.Form["Filter"], Select2.Value);
            DataSet ds = RetreieveUsersTable(SQLStr);
            string table = BuildUsersTable(ds.Tables[0]);
            tableDiv.InnerHtml = table;
        }

        // פונקציה שמפנה לדף עדכון משתמש כאשר נבחר משתמש לעריכה
        public void Edit(object sender, EventArgs e)
        {
            for (int i = 1; i < Request.Form.Count; i++)
            {
                if (Request.Form.AllKeys[i].Contains("chk"))
                {
                    // שמירת מזהה המשתמש לעריכה
                    Session["userToUpdate"] = int.Parse(Request.Form.AllKeys[i].Remove(0, 3));
                    Response.Redirect("/pages/updateuser.aspx");
                }
            }
        }
    }
}