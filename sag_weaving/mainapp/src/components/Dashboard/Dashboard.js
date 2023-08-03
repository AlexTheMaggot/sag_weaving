import React, {Component} from "react";
import './Dashboard.css'
import api_sender from "../api_sender";
import {Navigate} from "react-router-dom";
import MachineChart from "../MachineChart/MachineChart";


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboard: {
                shift_1: [],
                shift_2: [],
                shift_3: [],
            },
            nav_auth: false,
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
                let request = api_sender('DashboardGet', 3)
                request.then((response) => {
                    if (response.error === undefined) {
                        this.setState({dashboard: response.result}, () => {
                            setTimeout(() => {
                                this.setState({show_content:true})
                            }, 300)
                            setInterval(() => {
                                request = api_sender('DashboardGet', 3)
                                request.then((response) => {
                                    if (response.error === undefined) {
                                        this.setState({dashboard: response.result})
                                    }
                                });
                            }, 10000)
                        })
                    }
                });
            }
        })
    }

    render() {
        return (
            <div className={this.state.show_content ? 'dashboard' : 'dashboard hidden'}>
                <div className="dashboard__shift">
                    <p className="dashboard__shift-title">I - смена</p>
                    <div className="dashboard__table">
                        {this.state.dashboard.shift_1.map(item => (
                            <div className="dashboard__machinechart" key={'1_' + item.machine.id}>
                                <MachineChart item={item} position={{top: (-50 + (item.percent / 2)) + 'px' }}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dashboard__shift">
                    <p className="dashboard__shift-title">II - смена</p>
                    <div className="dashboard__table">
                        {this.state.dashboard.shift_2.map(item => (
                            <div className="dashboard__machinechart" key={'2_' + item.machine.id}>
                                <MachineChart item={item} position={{top: (-50 + (item.percent / 2)) + 'px' }}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dashboard__shift">
                    <p className="dashboard__shift-title">III - смена</p>
                    <div className="dashboard__table">
                        {this.state.dashboard.shift_3.map(item => (
                            <div className="dashboard__machinechart" key={'3_' + item.machine.id}>
                                <MachineChart item={item} position={{top: (-50 + (item.percent / 2)) + 'px' }}/>
                            </div>
                        ))}
                    </div>
                </div>
                {this.state.nav_auth && <Navigate to="/auth/" />}
            </div>
        );
    }
}
