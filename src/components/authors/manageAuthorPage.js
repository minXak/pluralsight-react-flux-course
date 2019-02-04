"use strict";

var React = require('react');
var Router = require("react-router");
var Toastr = require("toastr");

var AuthorForm = require('./authorForm');

var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty) {
                if (!confirm('Leave without saving?')) {
                    transition.abort();
                }
            }
        }
    },
    componentWillMount: function () {
        var authorId = this.props.params.id;
        if (authorId) {
            this.setState({ author: AuthorStore.getAuthorById(authorId) });
        } else {
            // this.transitionTo("notFound");
        }
    },

    getInitialState: function () {
        return {
            author: { id: '', firstName: '', lastName: '' },
            errors: {},
            dirty: false
        };
    },
    setAuthorState: function (event) {
        this.setState({ dirty: true });
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({ author: this.state.author });
    },
    authorFormIsValid: function () {
        var formIsValid = true;
        this.state.errors = {};

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = "First name length";
            formIsValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = "Last name length";
            formIsValid = false;
        }

        this.setState({ errors: this.state.errors });
        return formIsValid;
    },

    saveAuthor: function (event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }

        if (this.state.author.id > 0){
            AuthorActions.updateAuthor(this.state.author);
        } else {
            AuthorActions.createAuthor(this.state.author);
        }

        this.setState({ dirty: false });

        Toastr.success("Author saved.");
        this.transitionTo('authors');

    },
    render: function () {
        return (
            <div>
                <h1>Manage Author</h1>
                <AuthorForm
                    author={this.state.author}
                    onChange={this.setAuthorState}
                    onSave={this.saveAuthor}
                    errors={this.state.errors} />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;