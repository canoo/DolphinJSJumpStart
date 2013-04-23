define([
    '$',
    'underscore',
    'backbone',
    'UI',
    'i18n!nls/locals',

    'models/WeatherModel',
    'models/WeatherModelCollection',
    'views/WeatherListItem',

    'backbone.layoutmanager'
], function ($, _, Backbone, UI, Locals, WeatherModel, WeatherModelCollection, WeatherListItem) {

    return Backbone.Layout.extend({

        template : 'views/list-view',
        className: 'ui-list-view vbox',

        initialize: function(options) {
            this.dolphin = options.dolphin;
        },

        beforeRender: function () {

            var items = new WeatherModelCollection([], { dolphin: this.dolphin });

            var list = new UI.List({ listItem: WeatherListItem, collection: items, scrollable: true });

            list.on('itemTap', function(model) {
                alert(model.get('location') + ' / ' + model.get('temperature'));
            });

            var title = "Dolphin.JS Weather / {#}";

            var searchValue = /{#}/g;

            var header = new UI.Header({title: title.replace(searchValue, items.size())})
//            var footer = new UI.Footer({title: "Weather List"})

            items.on('add', function() {
                header.setTitle(title.replace(searchValue, items.size()));
            });

            this.insertViews({
                '.list-header' : header,
                '.list-content' : list
            })
        }
    });
});

