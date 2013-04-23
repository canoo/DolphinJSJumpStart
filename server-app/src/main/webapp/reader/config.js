require.config({

    baseUrl: '',

    paths: {
        jquery : 'libs/jquery'
    },

    shim: {
        'jquery': {
            exports: '$'
        }
    },

    map : {
        '*': {
            $ : 'jquery'
        }
    }

});