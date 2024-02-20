using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBAccess
{
    public class DBActions
    {
        static string connString;
        IConfiguration config;

        public DBActions(IConfiguration config)
        {
            this.config = config;
        }
        public string GetConnectionString(string connStrNameInCnfig)
        {
            if (connString != null)
            {
                return connString;
            }
            string connStr = config.GetConnectionString(connStrNameInCnfig);
            connStr = ReplaceWithCurrentLocation(connStr);
            return connStr;
        }

        private string ReplaceWithCurrentLocation(string connStr)
        {
            string str = AppDomain.CurrentDomain.BaseDirectory;
            string directryAboveBin = str.Substring(0, str.IndexOf("\\bin"));
            string twoDirectoriesAboveBin = directryAboveBin.Substring(0, directryAboveBin.LastIndexOf("\\"));
            string threeDirectoriesAboveBin = twoDirectoriesAboveBin.Substring(0, twoDirectoriesAboveBin.LastIndexOf("\\"));
            connStr = string.Format(connStr, threeDirectoriesAboveBin);
            return connStr;
        }
    }
}
