using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorthyWebAppChallengeBackend.DataAccess
{
    public interface IDataAccess
    {
        T Read<T>(string tableName);
        
        bool Create<T>(string tableName, T item);

        int GetNextKey<T>(string tableName, string propertyName = "Id");
    }
}
