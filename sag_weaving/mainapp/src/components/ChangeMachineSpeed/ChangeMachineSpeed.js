import React, {Component} from 'react';
import './ChangeMachineSpeed.css'
import api_sender from "../api_sender";
import {Navigate, useParams} from "react-router-dom";

export default function ChangeMachineSpeed(props) {
    let params = useParams()
    return <ChangeMachineSpeedClass {...props} params={params}/>
}


class ChangeMachineSpeedClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_auth: false,
            nav_settings: false,
            speed: '',
            show_content: false,
            machine_speed: {
                speed: '',
                machine: {
                    name: '',
                },
            }
        }
    }
    componentDidMount() {
        let auth = api_sender('AuthCheck', 1)
        auth.then((response) => {
            if (response.error !== undefined) {
                this.setState({nav_auth: true})
            }
            else {
                let request = api_sender('SpeedGetList', 1, {'machine': this.props.params.machine_id})
                request.then((response) => {
                    if (response.error === undefined) {
                        this.setState({machine_speed: response.result[0]}, () => {
                            setTimeout(() => {
                                this.setState({show_content: true})
                            }, 300)
                        })
                    }
                })
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
    handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let request = api_sender('SpeedCreate', 2, {
            'speed': this.state.speed,
            'machine': this.props.params.machine_id
        });
        request.then((response) => {
            if (response.error === undefined) {
                this.setState({show_content: false}, () => {
                    setTimeout(() => {
                        this.setState({nav_settings: true});
                    }, 300)
                })
            }
        });
    }
    render() {
        return (
            <div className={this.state.show_content ? 'changemachinespeed form__wrapper' : 'changemachinespeed form__wrapper hidden'}>
                <form className="form" action="" method="POST" onSubmit={this.handleSubmit}>
                    <label className="form__label" htmlFor="speed">Станок: {this.state.machine_speed.machine.name} Текущая скорость: {this.state.machine_speed.speed}</label>
                    <input className="form__input" name="speed" id="speed" type="number" value={this.state.speed} onChange={this.handleInput}/>
                    <div className="form__buttons">
                        <button className="form__button form__button_submit" type="submit">Создать</button>
                        <button className="form__button form__button_cancel" type="reset" onClick={() => {this.navi('nav_settings')}}>Отмена</button>
                    </div>
                </form>
                {this.state.nav_auth && <Navigate to="/auth/" />}
                {this.state.nav_settings && <Navigate to="/settings/" />}
            </div>
        )
    }
}
