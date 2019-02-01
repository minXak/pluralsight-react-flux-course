"use strict";

var React = require('react');
var Link = require("react-router").Link;

var NotFoundPage = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Sorry, page not found.</h1>
                <p><Link to="app">Go Back Home</Link></p>
            </div>
        );
    }
});

module.exports = NotFoundPage;