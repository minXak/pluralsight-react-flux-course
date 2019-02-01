"use strict";

var React = require("react");
var Router = require("react-router");
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var Rediret = Router.Redirect;

var Route = Router.Route;

var App = require('./components/app');
var Home = require('./components/homePage');

var About = require('./components/about/aboutPage');
var Authors = require('./components/authors/authorPage');
var ManageAuthorPage = require('./components/authors/manageAuthorPage');

var NotFoundPage = require('./components/404');

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Home}></DefaultRoute>
        
        <Route name="about" handler={About}></Route>
        <Route name="authors" handler={Authors}></Route>
        <Route name="addAuthor" path="author" handler={ManageAuthorPage}></Route>
        <Route name="manageAuthor" path="author/:id" handler={ManageAuthorPage}></Route>

        <NotFoundRoute handler={NotFoundPage}></NotFoundRoute>

        <Rediret from="about-us" to="about"></Rediret>
        <Rediret from="about/*" to="about"></Rediret>

    </Route>
);

module.exports = routes;