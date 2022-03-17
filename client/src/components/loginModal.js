import {Component} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert} from 'react-strap';
import {connect} from 'react-redux';
import {login} from '../actions/authActions.js';
import {clearErrors} from '../actions/errorActions.js';
import 

export class LoginModal extends Component{
    //set state for this class
    state = {
        email:'',
        password: '',
        msg: null,
        modal: false
    }
    static 
    //this toggle is to change the state of the modal
    toggle = ()=>{
        
    }
    render(){
        return(
            <div className = "container">
                <Button color = "success" className = "btn btn-sm"><NavLink onClick = {this.toggle} href = "#"><span className="text-dark"><b>Login</b></span></NavLink></Button>
                <Modal 
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth.isAuthenticated, 
    error: state.error
})

  //connect the state of redux with the state of this class
  //connect(mapStateToProps, mapStatToDispatch)(Name of component class)
  connect(mapStateToProps, {login, clearErrors})(LoginModal);

