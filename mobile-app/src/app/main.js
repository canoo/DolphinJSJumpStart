require([
    "$",
    "App",
    'backbone',
    'init',
    'routers/MainRouter'
], function ($, App, Backbone, init, Router) {

    console.log('Initialize:main');

    // Treat the jQuery ready function as the entry point to the application.
    // Inside this function, kick-off all initialization, everything up to this
    // point should be definitions.
    $(function() {
        // Define your master router on the application namespace and trigger all
        // navigation from this instance.
        App.router = new Router();
        // Trigger the initial route and enable HTML5 History API support
        Backbone.history.start();
    });

});

