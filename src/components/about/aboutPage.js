"use strict";

var React = require('react');

var About = React.createClass({
    statics: {
        willTransitionTo: function (transition, params, query, callback) {
            if (confirm('Go on?')) {
                callback();
            } else {
                transition.abort();
            }
        },
        willTransitionFrom: function (transition, component) {
            if (!confirm('Leave?')) {
                transition.abort();
            }
        }
    },
    render: function () {
        return (
            <div>
                <h1>About</h1>
                <p>About me</p>
            </div>
        );
    }
});

module.exports = About;