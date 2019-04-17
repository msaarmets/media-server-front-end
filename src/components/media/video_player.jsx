import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const baseUrl = "http://localhost:3000/video"

export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state={
            videourl: props.location.state.currentMovie,
            videoFolder: props.location.state.currentFolder
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Link to={{ pathname: '/media', state: {currentFolder: this.state.videoFolder}}}>
                        <img className="clickable" src={require('../../img/arrow-circle-o-left.svg')} width="40px"/>
                    </Link>
                </div>
                <div className="row">
                    <div className="embed-responsive embed-responsive-16by9">
                        <video className="embed-responsive-item" width="800" height="600" controls>
                            <source src={`${baseUrl}?video=${this.state.videourl}`} />
                        </video>
                    </div>
                </div>
            </div>
        );
    }
}