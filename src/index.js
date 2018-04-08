import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {getDeviceInfo} from './api/mobApi'
import React from 'react'
import ReactDOM from 'react-dom'


function FaultControl(props) {
  if (props.active === true) {
    return (
      <button type="button" className="btn btn-primary active" data-toggle="button" aria-pressed="true" onClick={props.onClick}>
        {props.name} On
      </button>
    );
  }
  else {
    return (
      <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" onClick={props.onClick}>
        {props.name} Off
      </button>
    );
  }
}

class FaultControls extends React.Component {
  constructor(props) {
    super(props);
    let state = {
      faultControls: []
    };
    this.state = FaultControls.getDerivedStateFromProps(props, null);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {
      faultControls: []
    };
    nextProps.controls.map( (control) => {
      newState.faultControls.push({
        name: control.name,
        active: control.value === 0 ? false : true
      });
    });
    return newState;
  }


  onClick(i) {
    let newFaultControls = this.state.faultControls
    newFaultControls[i].active = newFaultControls[i].active ? false : true;
    this.setState({
      faultControls: newFaultControls
    });
  }

  render() {
    return (
      <div className = "btn-group-vertical">
        {
          this.state.faultControls.map( (control, index) => 
              <FaultControl 
                key={index} 
                id={index} 
                active={control.active} 
                name={control.name}
                onClick={this.onClick.bind(this, index)}
                />)
        }
      </div> 
    );
  }
}
	
class DeviceControl extends React.Component {
  constructor(props) {
    super(props);
    const state = {
      name: null,
      controls: [],
    };
    this.state = state;

    getDeviceInfo(props.id).then( result => {
      let newState = {};
      newState.name = result.name;
      newState.controls = result.controls
      this.setState(newState);
    });
  }


  render() {
    return (
      <div className="row">
        <div className="col-3" >
          <FaultControls controls={this.state.controls}/> 
        </div>
        <div className="col-9" >
          100%
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <DeviceControl id = "1"/>,
  document.getElementById('root')
);