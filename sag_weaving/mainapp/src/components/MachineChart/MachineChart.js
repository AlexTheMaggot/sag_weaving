import React, {Component} from "react";
import './MachineChart.css'
import api_sender from "../api_sender";
import {Navigate} from "react-router-dom";


export default class MachineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div className="machinechart">
                <div className="machinechart__table">
                    <div className="machinechart__line" style={{height: this.props.item.percent + '%', background: 'hsl(' + this.props.item.percent * 1.2 + ', 100%, 40%)'}}>
                        <svg viewBox="0 0 1000 1000" className='machinechart__smile' style={this.props.position}>
                        <circle fill={'hsl(' + this.props.item.percent * 1.2 + ', 100%, 40%)'} cx="500" cy="500" r="500"/>
                        <circle className="machinechart__white" cx="670" cy="350" r="75"/>
                        <circle className="machinechart__white" cx="330" cy="350" r="75"/>
                        <g>
                            {this.props.item.percent <= 33 && <path className="machinechart__white" d="M651,766.4c-82.3-90.9-219.7-90.9-302,0c-12.5,14.8-37,32.7-57.3,23l0,0c-24.5-14.3-11.2-52.4,3.5-69c109.7-123.4,299.9-123.4,409.6,0c13.8,16.8,28.7,54.7,3.5,69l0,0C688,799,663.5,781.1,651,766.4z"/>}
                            {this.props.item.percent >= 66 && <path className="machinechart__white" d="M704.8,725.5c-109.7,123.4-299.9,123.4-409.6,0c-14.6-16.5-28-54.6-3.5-69l0,0c20.3-9.7,44.8,8.2,57.3,23c82.3,90.9,219.7,90.9,302,0c12.5-14.8,37-32.7,57.3-23l0,0C733.5,670.8,718.6,708.7,704.8,725.5z"/>}
                            {this.props.item.percent > 33 && this.props.item.percent < 66 && <path className="machinechart__white" d="M700,725c-133.3,0-266.7,0-400,0c-14.6-0.8-48.9-3.7-50-25l0,0c1.1-21.3,35.4-24.2,50-25c133.3,0,266.7,0,400,0c14.6,0.8,48.9,3.7,50,25l0,0C748.9,721.3,714.6,724.2,700,725z"/>}
                        </g>
                        </svg>
                    </div>
                </div>
                <p className="machinechart__name">{this.props.item.machine.name}</p>
            </div>
        );
    }
}
