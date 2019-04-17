import React from 'react';

// Component to play video and display video title and dexcription

const VideoDetail = ({video}) => {

    // If no data is not yet received from API
    if (!video){
        return <div className="mx-5">Loading...</div>
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    return(
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>
            <div className="details">
                <div>
                    {video.snippet.title}
                </div>
                <div>
                    {video.snippet.description}
                </div>
            </div>
        </div>
    )
};

export default VideoDetail;