import React, {Component} from 'react';
import './MachineCreate.css'
import api_sender from "../api_sender";
import {Navigate} from "react-router-dom";


export default class MachineCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_auth: false,
            nav_machinelist: false,
            nav_settings: false,
            name: '',
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
    handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let request = api_sender('MachineCreate', 2, {
            'name': this.state.name,
        });
        request.then((response) => {
            if (response.error === undefined) {
                this.setState({show_content: false}, () => {
                    setTimeout(() => {
                        this.setState({nav_machinelist: true});
                    }, 300)
                })
            }
        });
    }
    render() {
        return (
            <div className={this.state.show_content ? 'machinecreate form__wrapper' : 'machinecreate form__wrapper hidden'}>
                <form className="form" action="" method="POST" onSubmit={this.handleSubmit}>
                    <label className="form__label" htmlFor="name">Введите название</label>
                    <input className="form__input" name="name" id="name" type="text" value={this.state.name} onChange={this.handleInput}/>
                    <div className="form__buttons">
                        <button className="form__button form__button_submit" type="submit">Создать</button>
                        <button className="form__button form__button_cancel" type="reset" onClick={() => {this.navi('nav_settings')}}>Отмена</button>
                    </div>
                </form>
                {this.state.nav_auth && <Navigate to="/auth/" />}
                {this.state.nav_settings && <Navigate to="/settings/" />}
                {this.state.nav_machinelist && <Navigate to="/settings/machines/" />}
            </div>
        )
    }
}
