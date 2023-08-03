import React, {Component} from 'react';
import './ChangeSpeed.css'
import api_sender from "../api_sender";
import {Navigate} from "react-router-dom";


export default class ChangeSpeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_auth: false,
            nav_settings: false,
            nav_change_machine_speed: false,
            machines: [],
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
                let machines = api_sender('MachineGetList', 3)
                machines.then((response) => {
                    if (response.error === undefined) {
                        this.setState({machines: response.result}, () => {
                            setTimeout(() => {
                                this.setState({show_content: true})
                            }, 300)
                        })
                    }
                });
            }
        })
    }
    navi = (nav_state, nav_id = undefined) => {
        if (nav_id !== undefined) {
            this.setState({show_content: false}, () => {
                setTimeout(() => {
                    let nav_path = '/settings/change-speed/' + nav_id + '/'
                    this.setState({nav_id: nav_path}, () => {this.setState({[nav_state]: true}, () => {
                    })})
                }, 300)
            })
        }
        else {
            this.setState({show_content: false}, () => {
                setTimeout(() => {
                    this.setState({[nav_state]: true})
                }, 300)
            })
        }
    }
    render() {
        return (
            <div className={this.state.show_content ? 'changespeed machine-button__wrapper' : 'changespeed machine-button__wrapper hidden'}>
                {this.state.machines.map(item => (
                    <button className="machine-button" key={item.id} onClick={() => {this.navi('nav_change_machine_speed', item.id)}}>{item.name}</button>
                ))}
                <button className="machine-button" onClick={() => {this.navi('nav_settings')}}>Назад</button>
                {this.state.nav_auth && <Navigate to="/auth/" />}
                {this.state.nav_settings && <Navigate to="/settings/" />}
                {this.state.nav_change_machine_speed && <Navigate to={this.state.nav_id} />}
            </div>
        )
    }
}
