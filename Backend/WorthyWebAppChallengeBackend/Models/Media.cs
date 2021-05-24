using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorthyWebAppChallengeBackend.Models
{
    public class Media
    {
        public int Id { get; set; }

        public int Type { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; }

        public string Caption { get; set; }

        public string Url { get; set; }

        public IList<string> Tags { get; set; }
    }
}
