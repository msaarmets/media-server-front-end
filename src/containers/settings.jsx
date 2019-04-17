/* Container for user settings view */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeButton } from './media/media_main.jsx';
import { throws } from 'assert';
import axios from 'axios';

const settingsUrl = "http://localhost:3000/settings";

const FormView = (props) => {
    if (props.formMode == 'view') {
        return (
            <form>
                <div className="form-group row">
                    <label htmlFor="staticBaseDir" className="col-sm-4 col-form-label text-right">
                        Base Directory
                </label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control-plaintext" id="staticBaseDir" value={props.userSettings.baseDir} />
                    </div>
                </div>
            </form>
        )
    }
    else if (props.formMode == 'edit') {
        return (
            <form>
                <div className="form-group row">
                    <label htmlFor="baseDir" className="col-sm-4 col-form-label text-right">
                        Base Directory
                    </label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="baseDir"
                         value={props.userSettings.baseDir} onChange={event => props.inputChange(event.target.value)} />
                    </div>
                </div>
            </form>
        )
    }
}

const FormButton = (props) => {
    if (props.formMode == 'view') {
        return (
            <div className="row mt-4">
                <div className="col-md-2 offset-md-3">
                    <button type="button" className="btn btn-light btn-lg"
                        id="edit-settings-btn"
                        onClick={()=>props.editview()}>Edit</button>
                </div>
            </div>
        )
    }
    else if (props.formMode == 'edit') {
        return (

            <button type="button" className="btn btn-light btn-lg"
                id="edit-settings-btn"
                onClick={()=>props.save()}>Save</button>
        )
    }
}

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formMode: 'view',
            userSettings: {}
        }
        this.editFormBtn = this.editFormBtn.bind(this);
        this.saveFormBtn = this.saveFormBtn.bind(this);
        this.setInputValue = this.setInputValue.bind(this);
    }
    componentWillMount() {
        // Get initial settings from settings file
        axios.get(settingsUrl)
            .then(res => this.setState({ userSettings: res.data }))
            .catch(err => console.log(err))
    }

    editFormBtn() {
        this.setState({ formMode: 'edit' });
    }
    saveFormBtn() {
        axios.put(`${settingsUrl}?baseDir=${this.state.userSettings.baseDir}`)
        .catch(err=>console.log(err)
        );
        this.setState({
            formMode: 'view'
        });
    }
    setInputValue(val){
        this.setState({userSettings: {baseDir: val}});
    }

    render() {
        if (this.state.formMode == 'view' || this.state.formMode == 'edit') {
            return (
                <div>
                    <div className="row p-4">
                        <div className="col-md-1">
                            <HomeButton />
                        </div>
                    </div>
                    <div className="row pb-4">
                        <div className="col-md-4 offset-md-4">
                            <div className="display-4 text-center">Settings</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 settings-form">
                            <FormView formMode={this.state.formMode}
                             userSettings={this.state.userSettings}
                             inputChange={this.setInputValue} />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-2 offset-md-3">
                            <FormButton editview={this.editFormBtn} save={this.saveFormBtn}
                            formMode={this.state.formMode}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props
    // inside of files list
    return {
        settings: state.settings
    }
}

export default connect(mapStateToProps)(Settings);