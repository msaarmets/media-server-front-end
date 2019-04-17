/* Container for files and folders list */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWindowHeight } from "../../actions/index";
import homeIcon from "../../img/home.svg";

import ListScrollBtns from "../../components/media/list_scroll_buttons.jsx";
import FilesList from "./files_list.jsx";

export const HomeButton = () => {
  return (
    <Link to={{ pathname: "/" }}>
      <img src={homeIcon} id="home-btn" width="48px" height="48px" />
    </Link>
  );
};

class MediaMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTop: 0, // "Style: top" value of files list
      windowHeight: ""
    };
    this.videoFolder = ""; // Path sent from video player component - last video played
    this.setTop = this.setTop.bind(this);
  }
  componentWillMount() {
    // Get folder from videoplayer
    if (this.props.location.state != undefined) {
      this.videoFolder = this.props.location.state.currentFolder;
    }
  }

  componentDidMount() {
    // Get the height of the document to limit files list scrolling
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    this.setState({ windowHeight: height });
    console.log("windowHeight: ", height);
    console.log("Redux windowHeight: ", this.props.windowHeight);
  }

  // Function to get files list "style: top" value from ListScrollBtns component
  setTop(val) {
    let initialVal = this.state.listTop;
    let newVal = initialVal + val;
    console.log("newVal: ", newVal);
    // Don't let scroll down if initial position is achieved (new value <= 0)
    // or if the list is scrolled down (new value > window height - viewport height)
    if (
      newVal <= 0 &&
      newVal >
        -(this.state.windowHeight - document.documentElement.clientHeight)
    ) {
      console.log(
        "arvutatud scrolli lõpp: ",
        -(this.state.windowHeight - document.documentElement.clientHeight)
      );
      this.setState({ listTop: newVal });
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-1 mt-5">
            <HomeButton />
          </div>
          <div className="col-md-1 offset-md1 d-flex justify-content-end">
            <ListScrollBtns
              moveList={this.setTop}
              windowHeigth={this.state.windowHeight}
            />
          </div>
          <div className="col-md-6">
            <FilesList
              videoFolder={this.videoFolder}
              listTop={this.state.listTop + "px"}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of files list
  return {
    windowHeight: state.fileslist.height
  };
}

export default connect(mapStateToProps)(MediaMain);
