window.brunch = window.brunch || {};
window.brunch['auto-reload'] = {
	enabled: true
};

angular.module("mid", ["ngRoute", "ngSanitize"]);

// configs
require("config");

// controllers
require("main");
require("nav");
require("portfolio");
require("project");

// directives
require("autoscroll");
require("loadnext");

// services
require("wordpressService");