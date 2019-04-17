import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import VideoMain from './components/youtube/video_main';
import MediaMain from './containers/media/media_main';
import MainPage from './components/main_page';
import VideoPlayer from './components/media/video_player';
import Settings from './containers/settings.jsx';
import './style/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery/dist/jquery.min';

import reducers from './reducers';

const reduxStore = createStore(reducers);

// Create a new component. This component should produce some HTML
class App extends Component{
    componentDidMount(){
        // Disable right mouseclick
        document.addEventListener('contextmenu', event => event.preventDefault());
    }
        
    render(){
        return (
            <Provider store={reduxStore}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/youtube' component={VideoMain} />
                        <Route exact path='/media' component={MediaMain} />
                        <Route exact path='/media/player' component={VideoPlayer} />
                        <Route exact path='/settings' component={Settings} />
                        <Route exact path='/' component={MainPage} />
                        <Route component={MainPage} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.root'));