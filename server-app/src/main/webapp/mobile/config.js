require.config({

    baseUrl: 'app',

//    urlArgs: 'bust=' + ( new Date() ).getTime(), // Pop that cache

    paths: {
        UI                      : '../app/widgets/UI',
        app						: '../dolphin-mobile-client.min',
        jst						: '../dolphin-mobile-client.jst',
		zepto			        : '../scripts/zepto/zepto',
		jquery			        : '../scripts/jquery/jquery',
        i18n					: '../scripts/i18n/i18n',
        underscore              : '../scripts/underscore/underscore',
        'underscore.deferred'   : '../scripts/underscore.deferred/underscore.deferred',
        backbone                : '../scripts/backbone/backbone',
        'backbone.layoutmanager': '../scripts/backbone.layoutmanager/backbone.layoutmanager',
        handlebars              : '../scripts/handlebars/handlebars',
        move                    : '../scripts/move/move',
        hammer                  : '../scripts/hammer/dist/hammer',
        moment                  : '../scripts/moment/moment',
        iScroll                 : '../scripts/iscroll/src/iscroll',
        parsley                 : '../scripts/parsleyjs/parsley',
        dolphinjs               : '../scripts/dolphinjs/src',
        comm                    : '../scripts/dolphinjs/src/comm'
    },

    shim: {
        'jst': {
            exports: 'JST'
        },

        'jquery': {
            exports: '$'
        },

        'parsley' : {
            deps: ['$']
        },

        'hammer': {
            exports: 'Hammer'
        },

        'moment': {
            exports: 'Moment'
        },

        'move': {
            exports: 'Move'
        },

        'underscore': {
            exports: '_'
        },
		
        'underscore.deferred': {
            deps: ['underscore']
        },

        'backbone': {
            deps   : [ 'underscore', '$' ],
            exports: 'Backbone'
        },

        'backbone.layoutmanager': {
            deps   : [ 'underscore', '$', 'backbone' ],
            exports: 'Backbone.Layout'
        },

        'handlebars': {
            exports: 'Handlebars'
        },

        'iScroll': {
            exports: 'iScroll'
        }
    },
    map : {
        '*': {
            $     : 'jquery',
            _     : 'underscore'
        }
    }
});

/**
 * Run the App!
 */
require(['app']);
