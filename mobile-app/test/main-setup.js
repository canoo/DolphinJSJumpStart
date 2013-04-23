// Require.js allows us to configure shortcut alias
require.config({

    baseUrl: '',

//    deps : [
//        "src/app/init"
//    ],

    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim : {
        'hammer': {
            exports: 'Hammer'
        },

        'zepto': {
            exports: '$'
        },

        'underscore': {
            exports: '_'
        },

        'underscore.deferred': {
            deps: ['underscore']
        },

        'backbone': {
            deps   : [ 'underscore', 'zepto' ],
            exports: 'Backbone'
        },

        "backbone.layoutmanager": {
            deps: [ 'backbone' ]
        },

        'handlebars': {
            exports: 'Handlebars'
        }

    },
    map  : {
        '*': {
            $: 'zepto',
            _: 'underscore'
        }
    },

    paths: {
        collections             : 'src/app/collections',
        components              : 'src/app/components',
        config                  : 'src/app/config',
        controller              : 'src/app/controller',
        models                  : 'src/app/models',
        nls                     : 'src/app/nls',
        routers                 : 'src/app/routers',
        templates               : 'src/app/templates',
        utils                   : 'src/app/utils',
        views                   : 'src/app/views',
        widgets                 : 'src/app/widgets',

        hammer                  : 'src/scripts/hammer/dist/hammer',
        zepto                   : 'src/scripts/zepto/zepto',
        underscore              : 'src/scripts/underscore/underscore',
        'underscore.deferred'   : 'src/scripts/underscore.deferred/underscore.deferred',
        backbone                : 'src/scripts/backbone/backbone',
        'backbone.layoutmanager': 'src/scripts/backbone/backbone.layoutmanager',
        'backbone.mediator'     : 'src/scripts/backbone/backbone.mediator',
        handlebars              : 'src/scripts/handlebars/handlebars'
    }
});

require([], function () {
    console.log("INIT DONE");
});
