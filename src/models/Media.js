export class Media {
  constructor(id, type, userId, title, caption, url, tags) {
    this.id = id; // int
    this.type = type; // int
    this.userId = userId; // int
    this.title = title; // string
    this.caption = caption; // string
    this.url = url; // string
    this.tags = tags; // string[]
  }
}