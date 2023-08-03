import React, {Component} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
import Dashboard from '../Dashboard/Dashboard'
import Auth from '../Auth/Auth'
import Main from '../Main/Main'
import Settings from "../Settings/Settings";
import MachineCreate from "../MachineCreate/MachineCreate";
import MachineList from "../MachineList/MachineList";
import MachineEdit from "../MachineEdit/MachineEdit";
import ChangeSpeed from "../ChangeSpeed/ChangeSpeed";
import ChangeMachineSpeed from "../ChangeMachineSpeed/ChangeMachineSpeed";
import AddData from "../AddData/AddData";
import AddMachineData from "../AddMachineData/AddMachineData";


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Main />}></Route>
                        <Route exact path="/auth/" element={<Auth />}></Route>
                        <Route exact path="/dashboard/" element={<Dashboard />}></Route>
                        <Route exact path="/settings/" element={<Settings />}></Route>
                        <Route exact path="/settings/machines/" element={<MachineList />}></Route>
                        <Route exact path="/settings/machines/create/" element={<MachineCreate />}></Route>
                        <Route exact path="/settings/machines/:machine_id/edit/" element={<MachineEdit />}/>
                        <Route exact path="/settings/change-speed/" element={<ChangeSpeed />}/>
                        <Route exact path="/settings/change-speed/:machine_id/" element={<ChangeMachineSpeed />}/>
                        <Route exact path="/add-data/" element={<AddData />}/>
                        <Route exact path="/add-data/:machine_id/" element={<AddMachineData />}/>
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);