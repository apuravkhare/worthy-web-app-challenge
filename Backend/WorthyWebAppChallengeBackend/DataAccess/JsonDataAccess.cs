using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace WorthyWebAppChallengeBackend.DataAccess
{
    public class JsonDataAccess : IDataAccess
    {
        private readonly string filePath = "./Data/";
        private static object lockObject = new object();

        public bool Create<T>(string tableName, T tableData)
        {
            lock (lockObject)
            {
                JObject keyValuePairs = JObject.FromObject(tableData);
                File.WriteAllText(filePath + tableName + ".json", keyValuePairs.ToString());
            }

            return true;
        }

        public int GetNextKey<T>(string tableName, string propertyName = "Id")
        {
            lock (lockObject)
            {
                IDictionary<string, IEnumerable<T>> json = JsonConvert.DeserializeObject<IDictionary<string, IEnumerable<T>>>(System.IO.File.ReadAllText(filePath + tableName + ".json"));

                // Assuming Id is of type int
                PropertyInfo propertyInfo = typeof(T).GetProperty(propertyName);
                object max = json[tableName].Select(item => propertyInfo.GetValue(item)).Max();
                return int.Parse(max.ToString()) + 1;
            }
        }

        public T Read<T>(string tableName)
        {
            lock (lockObject)
            {
                return JsonConvert.DeserializeObject<T>(System.IO.File.ReadAllText(filePath + tableName + ".json"));
            }
        }
    }
}
