import React, {Component} from 'react';
import './AddMachineData.css'
import api_sender from "../api_sender";
import {Navigate, useParams} from "react-router-dom";

export default function AddMachineData(props) {
    let params = useParams()
    return <AddMachineDataClass {...props} params={params}/>
}


class AddMachineDataClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_auth: false,
            nav_main: false,
            pixels: '',
            show_content: false,
            speed: {
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
                        this.setState({speed: response.result[0]}, () => {
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
        let request = api_sender('DataCreate', 2, {
            'pixels': this.state.pixels,
            'machine': this.props.params.machine_id
        });
        request.then((response) => {
            if (response.error === undefined) {
                this.setState({show_content: false}, () => {
                    setTimeout(() => {
                        this.setState({nav_main: true});
                    }, 300)
                })
            }
        });
    }
    render() {
        return (
            <div className={this.state.show_content ? 'addmachinedata form__wrapper' : 'addmachinedata form__wrapper hidden'}>
                <form className="form" action="" method="POST" onSubmit={this.handleSubmit}>
                    <label htmlFor="pixels" className="form__label">Станок: {this.state.speed.machine.name} Скорость: {this.state.speed.speed}</label>
                    <input required className="form__input" id="pixels" name="pixels" type="number" value={this.state.pixels} onChange={this.handleInput}/>
                    <div className="form__buttons">
                        <button className="form__button form__button_submit" type="submit">Добавить</button>
                        <button className="form__button form__button_cancel" type="reset" onClick={() => {this.navi('nav_main')}}>Отмена</button>
                    </div>
                </form>
                {this.state.nav_auth && <Navigate to="/auth/" />}
                {this.state.nav_main && <Navigate to="/" />}
            </div>
        )
    }
}
