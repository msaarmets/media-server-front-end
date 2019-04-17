import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import _ from "lodash";

import SearchBar from "./search_bar";
import VideoList from "./video_list";
import VideoDetail from "./video_detail";
import youtubeLogo from "../../img/yt_logo_rgb_light.png";
import { HomeButton } from "../../containers/media/media_main.jsx";

import { API_KEY } from "../../../constants";

// Create a new component. This component should produce some HTML
// This ise the main component of Youtube video page
export default class VideoMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("top 10 this week music");
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, data => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }
  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div className="py-4" id="youtube-main">
        <div className="row justify-content-between">
          <div className="col-md-1 d-flex justify-content-end">
            <HomeButton />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <span id="youtube-logo">
              <img src={youtubeLogo} alt="youtube logo" />
            </span>
          </div>
        </div>
        <SearchBar onSearchTermChange={videoSearch} />
        <div className="row">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList
            onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
            videos={this.state.videos}
          />
        </div>
      </div>
    );
  }
}
