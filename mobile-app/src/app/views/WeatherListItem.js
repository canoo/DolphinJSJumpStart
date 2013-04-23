define(['$', '_', 'backbone', 'hammer', 'UI', 'backbone.layoutmanager'], function ($, _, Backbone, Hammertime, UI) {
    return UI.ListItem.extend({
        template: 'views/weather-list-item'
    });
});