import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import {getDeviceInfo} from './api/mobApi'
import React from 'react'
import ReactDOM from 'react-dom'


function ToggleControl(props) {
  if (props.active === true) {
    return (
      <button type="button" className="btn btn-info btn-block active" onClick={props.onClick}>
        {props.name} On
      </button>
    );
  }
  else {
    return (
      <button type="button" className="btn btn-secondary btn-block" onClick={props.onClick}>
        {props.name} Off
      </button>
    );
  }
}

class DeviceControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = DeviceControls.getDerivedStateFromProps(props, null);
  }
  
  static getDerivedStateFromProps(nextProps, prevState) { // eslint-disable-line no-unused-vars
    let newState = {
      deviceControls: []
    };
    nextProps.controls.map( (control) => {
      newState.deviceControls.push({
        name: control.name,
        active: control.value === 0 ? false : true
      });
    });
    return newState;
  }

  onClick(i) {
    let newDeviceControls = this.state.deviceControls
    newDeviceControls[i].active = newDeviceControls[i].active ? false : true;
    this.setState({
      faultControls: newDeviceControls
    });
  }

  render() {
    return (
      <div className = "btn-group-vertical btn-block">
        {
          this.state.deviceControls.map( (control, index) => 
              <ToggleControl 
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

    getDeviceInfo(props.id).then( result => { //eslint-disable-line react/prop-types
      let newState = {};
      newState.name = result.name;
      newState.controls = result.controls
      this.setState(newState);
    });
  }

  render() {
    return (
      <div className="bg-dark text-light h-100">
        <div className="row bg-dark text-light">
          <div className="col" >
            <h1> {this.state.name}  {this.props.id} </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-3" >
            <div className="row"> <div className="col"> Controls </div></div>
            <div className="row"> 
              <div className="col">
                <DeviceControls controls={this.state.controls} />
              </div>
            </div>
          </div>
          <div className="col-9" >
            <div className="row">
              <div className="col-9">
                Terminal
                <textarea readOnly="true" className="form-control bg-dark text-white" rows="10" />
              </div>
            </div>
            <div className="row">
              <div className="col-9">
                <input className="form-control bg-dark text-white" placeholder="enter command" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeviceControl.defaultProps = {
  id: null
};

ReactDOM.render(
  <DeviceControl id="1"/>,
  document.getElementById('root')
);