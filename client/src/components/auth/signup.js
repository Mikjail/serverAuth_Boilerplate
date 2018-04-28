import React, { Component } from 'react';
import {reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import SignInFIeld from './SignInFIeld';

class Signup extends Component {

    handleFormSubmit(formProps) {
        this.props.signUpUser(formProps);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong> Ooops! </strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit, error} =  this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <Field 
                    label="Email:"
                    type="email"
                    component={SignInFIeld}
                    name="email"
                    placeholder="email"/>
                </fieldset>
                <fieldset className="form-group">
                    <Field 
                    label="Password:"
                    type="password"
                    component={SignInFIeld}
                    name="password"
                    placeholder="password"/>
                </fieldset>
                <fieldset className="form-group">    
                    <Field 
                    label="Confirm Password:"
                    type="password"
                    component={SignInFIeld}
                    name="passwordConfirm"
                    placeholder="password confirm"/>
                    
                </fieldset>
                <fieldset className="form-group"> 
                <button action="submit" className="btn btn-primary">
                    Sign Up!
                </button>
                {this.renderAlert()}
                </fieldset>
            </form>
        );
    }
}

function validate(formprops){
    const errors= {};
    const fields = [ "email", "password", "passwordConfirm"]
  
        fields.forEach(name=>{
            if(!formprops[name]){
                errors[name]= 'Input is required'
            }
        })

    if(formprops.password !== formprops.passwordConfirm){
        errors.passwordConfirm = 'Password must match';
    }

    return errors;

}

function mapStateToProps(state){
    return { errorMessage: state.auth.error }

}

export default connect(mapStateToProps, actions)(reduxForm({
    validate, 
    form: 'signup'})(Signup));