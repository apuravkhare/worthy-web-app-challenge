import React, {Component} from 'react';
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
} from "@progress/kendo-react-listview";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardActions,
  CardSubtitle,
  Avatar,
} from "@progress/kendo-react-layout";
import { Media } from './models/Media';
import { ReactTinyLink } from 'react-tiny-link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser, faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { User } from './models/User';
import { AppNav } from './AppNav';
import AppConfig from './AppConfig';
import { AppTag } from './AppTags';

export class AppDiscover extends Component {
  constructor(props) {
    super(props);

    this.state = { mediaList: [], loggedInUserId: props.loggedInUserId };
  }

  componentDidMount() {
    if (AppConfig.useApi) {
      fetch(AppConfig.apiUrl + "/Discover", {
        method: 'GET',
        crossDomain: true,
        headers: { 'Content-Type':'application/json'},
        mode: 'cors',
        cache: 'default',
      })
      .then(function(result) {
        return result.json();
      })
      .then((result) => {
        this.setState({ mediaList: result })
      })
      .catch(function(errorMsg) {
        console.error(errorMsg);
      });
    } else {
      const apiData = this.fetchData();
      this.setState({ mediaList: apiData });
    }
  }

  header = () => {
    return (
      <ListViewHeader className="h-25">
        <h3>Recommended for you</h3>
      </ListViewHeader>
    )
  }

  footer = () => {
    return (
      <ListViewFooter>
        Load more
      </ListViewFooter>
    )
  }

  /**
   * Creates HTML for a media item to render.
   * @param {Media} item An object of type Media to be rendered
   * @returns HTML of one rendered item
   */
  itemRenderer = (item) => {
    var dataItem = item.dataItem;
    var user = this.fetchUser(dataItem.userId);
    return (
      <div key={dataItem.id} className="w-50 mt-4 mb-4" style={{ marginLeft: "25%" }}>
        <Card>
          <CardHeader className="k-hbox" style={{ background: 'transparent' }}>
            <Avatar type='image' size='medium' shape='circle'>
              {this.fetchUserImage(dataItem.userId)}
            </Avatar>
            <div>
              <CardTitle className="text-left" style={{ marginBottom: '4px' }}>{dataItem.title}</CardTitle>
              <CardSubtitle className="text-left"><p>{user.userName}</p></CardSubtitle>
            </div>
          </CardHeader>
          <CardBody>
            <ReactTinyLink
                cardSize="small"
                showGraphic={true}
                maxLine={2}
                minLine={1}
                url={dataItem.url}
            />
            <div className="mt-2 ml-2 text-left">
              <AppTag disableToggle={true} tagsToRender={dataItem.tags} />
            </div>
            <div className="mt-2 ml-2 text-left">
              <p>{dataItem.caption}</p>
            </div>
          </CardBody>
          <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <button title="Like" className="k-button k-flat"
                onClick={() => this.toggleLike(this.state.loggedInUserId, dataItem.id)} 
                style={{color: this.hasUserLikedMedia(this.state.loggedInUserId, dataItem.id) ? "#cc1516" : ""}}
              >
                <FontAwesomeIcon icon={faHeart} size="lg" /> 
              </button>
              <button className="k-button k-flat" >
                <FontAwesomeIcon icon={faBookmark} size="lg" title="Save" /> 
              </button>
            </div>
            <span className="mr-5" style={{ fontSize: '13px', alignSelf: 'center', color: '#656565' }}>{this.fetchLikeCount(dataItem.id)} likes</span>
          </CardActions>
        </Card>
      </div>
    )
  }

  render() {
    return (
      <div className="h-100">
        <AppNav renderHome={true} renderShare={true} />
        <ListView
          data = {this.state.mediaList}
          item = {this.itemRenderer}
          header = {this.header}
          footer = {this.footer}
        />
      </div>
    )
  }

  fetchData = (f) => {
    // TODO: fetch data via api call

    return [
      new Media(1, 1, 1, "Title", "Caption", "https://www.youtube.com/watch?v=Du74op2yMQc", ["Song", "Music"]),
      new Media(2, 1, 1, "Title", "Caption", "https://www.imdb.com/title/tt12343534/", ["Anime"]),
      new Media(3, 1, 1, "Title", "Caption", "https://www.youtube.com/watch?v=Du74op2yMQc", ["Song"]),
      new Media(4, 1, 1, "Title", "Caption", "https://www.imdb.com/title/tt12343534/", ["Anime"]),
      new Media(5, 1, 1, "Title", "Caption", "https://www.youtube.com/watch?v=Du74op2yMQc", ["Song", "Music", "Live Performance"]),
      new Media(6, 1, 1, "Title", "Caption", "https://www.imdb.com/title/tt12343534/", ["Anime"]),
      new Media(7, 1, 1, "Title", "Caption", "https://www.youtube.com/watch?v=Du74op2yMQc", ["Song"]),
      new Media(8, 1, 1, "Title", "Caption", "https://www.imdb.com/title/tt12343534/", ["Anime"]),
      new Media(9, 1, 1, "Title", "Caption", "https://www.youtube.com/watch?v=Du74op2yMQc", ["Song"]),
      new Media(10, 1, 1, "Title", "Caption", "https://www.imdb.com/title/tt12343534/", ["Anime"])
    ];
  }

  fetchUserImage(userId) {
    // TODO: fetch image via api call
    return (<FontAwesomeIcon className="mt-2" icon={faUser} size="2x" />);
  }

  fetchUser(userId) {
    // TODO: fetch user via api call
    return new User(userId, "Sample User");
  }

  fetchLikeCount(mediaId) {
    // TODO: fetch like count via api call
    return Math.floor(Math.random() * 100);
  }

  hasUserLikedMedia(userId, mediaId) {
    // TODO: fetch boolean via api call
    return Math.floor(Math.random() * 10) % 2 === 0;
  }

  toggleLike(userId, mediaId) {
    // TODO: Add api call
  }
}
