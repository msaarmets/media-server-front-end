import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import settingsBtnIcon from '../img/settings.svg';

export default class MainPage extends Component {

    render() {
        return (
            <div id="start-page">
                <div className="container-fluid">
                    <div className="row justify-content-center" style={{ paddingTop: 100 + 'px' }}>
                        <div className="col-md-3">
                            <Link to={'/youtube'}>
                                <div className="main-page-card  d-flex align-items-center justify-content-center">
                                    <img src={require('../img/yt_logo_rgb_light.png')} alt="youtube"
                                        style={{ height: 50 + 'px' }} />
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-3">
                            <Link to={'/media'}>
                                <div className="main-page-card d-flex align-items-center justify-content-center">
                                    <img src={require('../img/play-circle-o.svg')} alt="media" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <Link to={'/settings'}>
                            <div className="col-md-1 settings-btn">
                                <img src={settingsBtnIcon} alt="Settings" style={{ width: 48, height: 48 }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}