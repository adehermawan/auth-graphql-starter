import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutationLogin from '../mutations/Login';
import { graphql } from 'react-apollo';
import queryCurrentUser from '../queries/CurrentUser';
import { hashHistory } from 'react-router';


class LoginForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            error: []
        }

    }

    componentWillUpdate(nextProps) {
        // this.props // the old, current set props
        // nextProps // the next set of props that will be in place
        // when the component rerenders
        if(!this.props.data.user && nextProps.data.user) {
            // redirect to dashboard!!
            hashHistory.push('/dashboard');

        }
    }

    onSubmit({ email, password }){
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query:queryCurrentUser }]
        })
        .catch(res => {
            const error = res.graphQLErrors.map( err => err.message);
            this.setState({ error });
        });
    }

    render(){
        return(
            <div>
                <h3>Login</h3>
                <AuthForm error = { this.state.error } onSubmit = {this.onSubmit.bind(this) }/>
            </div>
        );
    }
}

export default graphql(queryCurrentUser)
(graphql(mutationLogin)(LoginForm));