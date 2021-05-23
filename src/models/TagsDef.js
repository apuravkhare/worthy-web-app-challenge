export class TagsDef {
  getAllTags(f) {
    fetch("mediaTags.json", { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
      .then(function(response) {
        return response.json();
      })
      .then(function(responseJson) {
        f(responseJson.tags);
      })
      .catch(function(msg) {
        console.error(msg);
      });
  }
}