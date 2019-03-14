import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutationSignup from '../queries/Signup';
import queryCurrentUser from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            error : []
        }
    }

    componentWillUpdate(nextprops) {
        if(!this.props.data.user && nextprops.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }){
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query:queryCurrentUser }]
        }).catch(
            res => {
                const error = res.graphQLErrors.map( err => err.message);
                this.setState({ error});
            }
        );
    }

    render(){
        return(
            <div>
                <h3>Sign Up</h3>
                <AuthForm error = {this.state.error} onSubmit= {this.onSubmit.bind(this)}/>
            </div>
        );
    }

}

export default graphql(queryCurrentUser)
(graphql(mutationSignup)(SignupForm));