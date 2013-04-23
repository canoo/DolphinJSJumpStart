require.config({

    baseUrl: '',

    paths: {
        jquery : '../scripts/jquery'
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