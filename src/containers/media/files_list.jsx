import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import folderIcon from "../../img/folder-o.svg";
import movieIcon from "../../img/file-movie-o.svg";
import upArrowIcon from "../../img/chevron-up.svg";
import { baseDir } from "../../../constants";

const filesUrl = "http://localhost:3000/files";
const dirsUrl = "http://localhost:3000/dirs";
const settingsUrl = "http://localhost:3000/settings";
let userSettings = {};

const slashes = /Linux/.test(window.navigator.platform) ? "/" : "\\";

export default class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      moviesListLength: "",
      foldersList: [],
      foldersListLength: "",
      currentFolder: "",
      currentMovie: "",
      currentComponent: "list",
      top: "0px",
      baseDir: ""
    };
    this.goFolderUp = this.goFolderUp.bind(this);
    this.renderFolderUpBtn = this.renderFolderUpBtn.bind(this);
    this.getFilesAndFoldersList = this.getFilesAndFoldersList.bind(this);
    this.extractFileOrFolderName = this.extractFileOrFolderName.bind(this);
  }

  componentWillMount() {
    // If last folder comes back from video component
    if (this.props.videoFolder != "") {
      this.setState({ currentFolder: this.props.videoFolder });
      this.getFilesAndFoldersList(this.props.videoFolder);
    } else {
      // Get an initial list of files and folders from base directory before any component renders
      axios
        .get(settingsUrl)
        .then(res => {
          userSettings = res.data;
          baseDir = res.data.baseDir;
          this.setState({ currentFolder: baseDir });
          this.getFilesAndFoldersList(baseDir);
        })
        .catch(err => console.log(err));
    }
  }
  componentDidMount() {}

  getFilesList(folder) {
    this.setState({ currentFolder: folder });
    // Get a list of files inside this folder
    axios.get(`${filesUrl}?dir=${folder}`).then(res => {
      this.setState({
        movies: res.data.list,
        moviesListLength: res.data.listLength
      });
    });
  }

  getFoldersList(baseDirectory) {
    axios.get(`${dirsUrl}?base=${baseDirectory}`).then(res => {
      this.setState({
        foldersList: res.data.list,
        foldersListLength: res.data.listLength
      });
      //console.log('getFolders list: ',res.data.list);
    });
  }

  getFilesAndFoldersList(dir) {
    this.getFilesList(dir);
    this.getFoldersList(dir);
  }

  goFolderUp() {
    let currentFolder = this.state.currentFolder;
    console.log("currentFolder: ", currentFolder);
    let the_arr = currentFolder.split(slashes);
    the_arr.pop(); // Remove slash from the end
    the_arr.pop(); //Remove last folder from the list
    let folderUp = the_arr.join(slashes);
    console.log("folderUp: ", folderUp);
    this.setState(
      {
        currentFolder: folderUp,
        moviesListLength: "",
        foldersListLength: ""
      },
      function() {
        console.log("uus currentFolder state: ", this.state.currentFolder);
      }
    );
    this.getFilesAndFoldersList(folderUp + slashes);
  }

  renderFolderUpBtn() {
    // Render folder-up button only if there's current folder set
    // or user is already in root folder
    if (this.state.currentFolder != "" && this.state.currentFolder != baseDir) {
      return (
        <img
          src={upArrowIcon}
          onClick={this.goFolderUp}
          className="img-link folders-list my-3"
        />
      );
    }
  }

  extractFileOrFolderName(fullPath) {
    //console.log('fullpath: ',fullPath);
    let arr = fullPath.split(slashes);
    //console.log('arr: ',arr);
    let name = arr.splice(-1, 1);
    //console.log('name: ',name);
    return name;
  }

  render() {
    // Display a list of files and folders of base directory or current directory
    if (this.state.movies != "" || this.state.foldersList != "") {
      return (
        <div
          className="py-4"
          id="media-files-list"
          style={{ top: this.props.listTop }}
        >
          {this.renderFolderUpBtn()}
          <ul className="list-group folders">
            <li
              className="list-group-item active current-folder"
              id="listCurrentPath"
            >
              {this.state.currentFolder}
            </li>
            {this.state.foldersList.map(folder => (
              <li
                className="folders-list list-group-item"
                onClick={() => this.getFilesAndFoldersList(folder + slashes)}
                key={folder}
              >
                <img src={folderIcon} className="folder-list-icon mr-3" />
                {this.extractFileOrFolderName(folder)}
              </li>
            ))}

            {this.state.movies.map(file => (
              <li className="movies-list list-group-item" key={file}>
                <Link
                  to={{
                    pathname: "/media/player",
                    state: {
                      currentMovie: file,
                      currentFolder: this.state.currentFolder
                    }
                  }}
                >
                  <img src={movieIcon} className="files-list-icon mr-3 ml-2" />
                  {this.extractFileOrFolderName(file)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (
      this.state.foldersListLength == "0" &&
      this.state.moviesListLength == "0"
    ) {
      return (
        <div>
          <div className="row d-flex justify-content-center">
            {this.renderFolderUpBtn()}
          </div>
          <div className="row d-flex justify-content-center">
            <p className="display-3 mt-5 text-center">No items found</p>
          </div>
        </div>
      );
    }
    return (
      <div className="row d-flex justify-content-center align-items-center mt-5">
        <p className="display-4 text-center mt-4">Loading...</p>
      </div>
    );
  }
}
