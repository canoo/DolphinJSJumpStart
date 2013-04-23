define(['$', '_', 'backbone', 'hammer', 'UI', 'backbone.layoutmanager'], function ($, _, Backbone, Hammertime, UI) {
    return UI.ListItem.extend({
        className: 'weather-list-item hbox',
        template: 'views/weather-list-item'
    });
});