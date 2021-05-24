using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WorthyWebAppChallengeBackend.Models;

namespace WorthyWebAppChallengeBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // GenerateRandomMedia();
            // GenerateMediaTagMap();
            // GenerateMediaLikeMap();
            CreateHostBuilder(args).Build().Run();
        }

        private static void GenerateMediaLikeMap()
        {
            IDictionary<string, int[]> mediaLikeMap = new Dictionary<string, int[]>();
            Random randomLikesCount = new Random(0);

            for (int i = 0; i < 109; i++)
            {
                int likesCount = randomLikesCount.Next(5);
                mediaLikeMap.Add(i.ToString(), Enumerable.Range(0, likesCount).ToArray());
            }

            IDictionary<string, IDictionary<string, int[]>> mediaLikeMapJson = new Dictionary<string, IDictionary<string, int[]>>();
            mediaLikeMapJson.Add("MediaLikeMap", mediaLikeMap);
            JObject keyValuePairs = JObject.FromObject(mediaLikeMapJson);
            File.WriteAllText("./Data/MediaLikeMap.json", keyValuePairs.ToString());
        }

        private static void GenerateMediaTagMap()
        {
            string[] tags = new string[]
            {
                "Album",
                "Anime",
                "Art",
                "Book",
                "Comic",
                "Game",
                "Live Performance",
                "Live-action show",
                "Manga",
                "Movie",
                "Music",
                "Show",
                "Song",
                "TV Series",
                "Video Game"
            };

            Random randomCount = new Random(1);
            Random randomIndex = new Random(0);
            IDictionary<string, IList<string>> mediaTagMap = new Dictionary<string, IList<string>>();

            for (int i = 0; i < 100; i++)
            {
                int count = randomCount.Next(1, 5);
                mediaTagMap.Add(i.ToString(), new List<string>());

                for (int j = 0; j < count; j++)
                {
                    string tag = tags[randomIndex.Next(tags.Length)];
                    mediaTagMap[i.ToString()].Add(tag);
                }
            }

            JObject keyValuePairs = JObject.FromObject(mediaTagMap);
            File.WriteAllText("./Data/MediaTagMap.json", keyValuePairs.ToString());
        }

        private static void GenerateRandomMedia()
        {
            IList<Tuple<string, string>> urls = new List<Tuple<string, string>>()
            {
                Tuple.Create("https://www.youtube.com/watch?v=sxxLJlPs0kY", "My current favorite guitarist!"),
                Tuple.Create("https://www.youtube.com/watch?v=Du74op2yMQc", "Loving this remastered song"),
                Tuple.Create("https://www.youtube.com/watch?v=FNdC_3LR2AI", "Metal doesn't get any better"),
                Tuple.Create("https://www.youtube.com/watch?v=LYU-8IFcDPw", "Old school classics"),
                Tuple.Create("https://www.youtube.com/watch?v=LrHfrncvODQ", "This helped me improve my technique a lot"),
                Tuple.Create("https://www.imdb.com/title/tt12343534/", "My new favorite show!!"),
                Tuple.Create("https://www.imdb.com/title/tt1375666/", "A must watch imo"),
                Tuple.Create("https://www.imdb.com/title/tt0103359", "Classic Batman!"),
                Tuple.Create("https://www.instagram.com/p/CAspk61AsLd/", "A cute sketch of a cat!"),
                Tuple.Create("https://www.instagram.com/p/CN-ZP_8jBRO/", "This might be the best line art that I've seen"),
                Tuple.Create("https://animal-crossing.com/new-horizons/", "Check out this amazing game!"),
            };

            string[] captions = new string[]
            {
                "",
                "This is the best thing I've seen in a while",
                "Do you guys know any of other art like this?",
                "My go to when I'm feeling down",
                "I love this! I hope you guys enjoy it too!",
                "Hope we get more content from them soon!",
            };

            IList<Media> medias = new List<Media>();
            Random randomMedia = new Random(0);
            Random randomUser = new Random(0);
            Random randomCaption = new Random(0);

            for (int i = 0; i < 100; i++)
            {
                int next = randomMedia.Next(urls.Count);
                Tuple<string, string> nextRandom = urls[next];

                Media media = new Media()
                {
                    Caption = captions[randomCaption.Next(captions.Length)],
                    Id = i,
                    Title = nextRandom.Item2,
                    Type = 0,
                    Url = nextRandom.Item1,
                    UserId = randomUser.Next(5),
                };

                medias.Add(media);
            }

            IDictionary<string, IList<Media>> jobjectData = new Dictionary<string, IList<Media>>()
            {
                { "media", medias }
            };

            JObject keyValuePairs = JObject.FromObject(jobjectData);
            File.WriteAllText("./Data/Media.json", keyValuePairs.ToString());
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
