using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorthyWebAppChallengeBackend.DataAccess;
using WorthyWebAppChallengeBackend.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorthyWebAppChallengeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShareController : ControllerBase
    {
        IDataAccess dataAccess = new JsonDataAccess();

        // GET: api/<ShareController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ShareController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ShareController>
        [HttpPost]
        public void Post([FromBody] Media value)
        {
            int newId = this.dataAccess.GetNextKey<Media>("Media");
            value.Id = newId;
            Dictionary<string, List<Media>> mediaJson = this.dataAccess.Read<Dictionary<string, List<Media>>>("Media");
            List<Media> medias = mediaJson["Media"];
            medias.Add(value);
            this.dataAccess.Create("Media", mediaJson);
        }

        // PUT api/<ShareController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ShareController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
