import React, {Component} from 'react';
import './Settings.css'
import {Navigate} from "react-router-dom";
import api_sender from "../api_sender";


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_auth: false,
            nav_machine_create: false,
            nav_machine_list: false,
            nav_change_speed: false,
            nav_main: false,
            show_content: false,
        }
    }
    componentDidMount() {
        let auth = api_sender('AuthCheck', 1)
        auth.then((response) => {
            if (response.error !== undefined) {
                this.setState({nav_auth: true})
            }
            else {
                setTimeout(() => {
                    this.setState({show_content: true})
                }, 300)
            }
        })
    }
    navi = (nav_state) => {
        this.setState({show_content: false}, () => {
            setTimeout(() => {
                this.setState({[nav_state]: true})
            }, 300)
        })
    }
    render() {
        return (
            <div className={this.state.show_content ? 'settings button__wrapper' : 'settings button__wrapper hidden'}>
                <button className="button" onClick={() => {this.navi('nav_machine_create')}}>Добавить новый станок</button>
                <button className="button" onClick={() => {this.navi('nav_machine_list')}}>Изменить настройки станка</button>
                <button className="button" onClick={() => {this.navi('nav_change_speed')}}>Изменить скорость станка</button>
                <button className="button" onClick={() => {this.navi('nav_main')}}>Назад на главную</button>
                {this.state.nav_auth && <Navigate to="/auth/" />}
                {this.state.nav_machine_create && <Navigate to="/settings/machines/create/" />}
                {this.state.nav_machine_list && <Navigate to="/settings/machines/" />}
                {this.state.nav_change_speed && <Navigate to="/settings/change-speed/" />}
                {this.state.nav_main && <Navigate to="/" />}
            </div>
        )
    }
}
