using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    public class DiscoverController : ControllerBase
    {
        IDataAccess dataAccess = new JsonDataAccess();

        // GET: api/<DiscoverController>
        [HttpGet]
        public IList<Media> Get()
        {
            Dictionary<string, List<Media>> mediaJson = this.dataAccess.Read<Dictionary<string, List<Media>>>("Media");
            Dictionary<string, List<string>> mediaTagMapJson = this.dataAccess.Read<Dictionary<string, List<string>>>("MediaTagMap");
            List <Media> medias = mediaJson["Media"];
            medias.ForEach(media => media.Tags = mediaTagMapJson.GetValueOrDefault(media.Id.ToString(), new List<string>()));
            return medias.ToList();
        }

        // GET api/<DiscoverController>/5
        [HttpGet("{id}")]
        public int Get(int id)
        {
            Dictionary<string, Dictionary<string, int[]>> mediaLikeMapJson = this.dataAccess.Read<Dictionary<string, Dictionary<string, int[]>>>("MediaLikeMap");
            Dictionary<string, int[]> likeMap = mediaLikeMapJson["MediaLikeMap"];

            if (likeMap.TryGetValue(id.ToString(), out int[] likes))
            {
                return likes.Length;
            }
            else
            {
                return 0;
            }
        }

        // POST api/<DiscoverController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DiscoverController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DiscoverController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
