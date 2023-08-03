import React, {Component} from 'react';
import './Main.css'
import {Navigate} from "react-router-dom";
import api_sender from "../api_sender";


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_auth: false,
            nav_settings: false,
            nav_dashboard: false,
            nav_add_data: false,
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
    quit_app = () => {
        let request = api_sender('Logout', 3)
        request.then(() => {
            if (request.error === undefined) {
                this.setState({show_content: false}, () => {
                    setTimeout(() => {
                        this.setState({nav_auth: true})
                    }, 300)
                })
            }
        });
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
            <div className={this.state.show_content ? 'main button__wrapper' : 'main button__wrapper hidden'}>
                <button className="button" onClick={() => {this.navi('nav_dashboard')}}>Главная панель</button>
                <button className="button" onClick={() => {this.navi('nav_add_data')}}>Добавить данные</button>
                <button className="button" onClick={() => {this.navi('nav_settings')}}>Настройки</button>
                <button className="button" onClick={this.quit_app}>Выход</button>
                {this.state.nav_auth && <Navigate to="/auth/" />}
                {this.state.nav_settings && <Navigate to="/settings/" />}
                {this.state.nav_dashboard && <Navigate to="/dashboard/" />}
                {this.state.nav_add_data && <Navigate to="/add-data/" />}
            </div>
        )
    }
}
