import React, {Component} from "react";
import api_sender from "../api_sender";
import './Auth.css'
import {Navigate} from "react-router-dom";


export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            nav_main: false,
            wrong_auth: false,
            show_content: false,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({show_content: true})
        }, 300)
    }
    handleInput = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let request = api_sender('Auth', 2, {
            'login': this.state.login,
            'password': this.state.password,
        });
        request.then((response) => {
            if (response.error === undefined) {
                this.setState({show_content: false}, () => {
                    setTimeout(() => {
                        this.setState({nav_main: true})
                    }, 300)
                })
            }
            else {
                this.setState({wrong_auth: true}, () => {
                    setTimeout(() => {
                        this.setState({wrong_auth: false})
                    }, 1500)
                });
            }
        });
    }
    render() {
        return (
            <div className={this.state.show_content ? 'auth' : 'auth hidden'}>
                {this.state.wrong_auth ? <p className="auth__wrong">Неправильный логин или пароль</p> : <p className="auth__wrong" style={{transform: 'translateY(-60px)'}}>Неправильный логин или пароль</p>}
                <form action="" method="POST" className="auth__form" onSubmit={this.handleSubmit}>
                    <h1 className="auth__title">Авторизация</h1>
                    <input required name="login" type="text" className="auth__input" value={this.state.login} onChange={this.handleInput}/>
                    <input required name="password" type="password" className="auth__input" value={this.state.password} onChange={this.handleInput}/>
                    <div>
                        <button type="submit" className="auth__submit">Войти</button>
                    </div>
                </form>
                {this.state.nav_main && <Navigate to="/" />}
            </div>
        );
    }
}