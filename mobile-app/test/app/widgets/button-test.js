define([
    'buster',
    'widgets/Button'
], function(buster, Button) {

    var assert = buster.assertions.assert;
    var refute = buster.assertions.refute;

    buster.testCase("Button", {

        "setUp" : function() {
        },

        "tearDown": function() {
        },

        "has a default button title": function() {
            var button = new Button();
            assert(button.getTitle() == "[ Button ]");
        },

        "has title set": function() {
            var button = new Button({title: "title"});
            assert(button.getTitle() == "title");
        },

        "has icon set": function() {
            var button = new Button({icon: "star"});
            assert(button.getIcon() == "star");
        }
    });
});
