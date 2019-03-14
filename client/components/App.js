import React from 'react';
import Header from './Header';

const App = (props) => {
    return (
        <div className="container">
            <Header />
        <div>{ props.children }</div>
        </div>
    );
};

export default App;