var config = module.exports;

config["Browser"] = {
    rootPath   : "..",
    environment: "browser", // or "node"

    autoRun  : false,

    extensions: [
        require("buster-amd")
    ],

    libs     : [
        "src/scripts/requirejs/require.js",
        "test/main-setup.js"
    ],

    resources: [
        "src/scripts/zepto/zepto.js",
        "src/scripts/underscore/underscore.js",
        "src/scripts/underscore.deferred/underscore.deferred.js",
        "src/scripts/hammer/dist/hammer.js",
        "src/scripts/backbone/backbone.js",
        "src/scripts/backbone.layoutmanager/backbone.layoutmanager.js",
        "src/scripts/handlebars/*.js"
    ],

    sources: [
        "src/app/**/*.js"
    ],

    tests: [
        "test/app/**/*-test.js"
    ]
};
