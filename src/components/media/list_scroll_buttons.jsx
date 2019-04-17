import React, { Component } from 'react';

import upArrowIcon from '../../img/chevron-up.svg';
import downArrowIcon from '../../img/chevron-down.svg';

export default class ListScrollBtns extends Component {
    constructor(props) {
        super(props);
        this.state={
            viewportHeight: 800
        }
    };

    componentDidMount(){
        // style: top value for scroll buttons
        this.setState({viewportHeight: document.documentElement.clientHeight/2-88})
    }

    render(){
        let moveList = this.props.moveList;
    return(
        <div style={{position:'relative',top: this.state.viewportHeight+'px'}}>
            <div className="list-scroll scroll-up d-flex justify-content-center" 
            onClick={()=>moveList(-250)}>
                <img src={upArrowIcon} alt="scroll up" />
            </div>
            <div className="list-scroll scroll-down d-flex justify-content-center" 
            onClick={()=>moveList(250)}>
                <img src={downArrowIcon} alt="scroll down" />
            </div>
        </div>
    )
}
};