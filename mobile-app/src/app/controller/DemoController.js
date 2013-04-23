define(['$', 'App', 'UI', 'utils/Utils', 'config/Properties',
    'dolphinjs/dolphin',
    'comm/ClientAttribute',
    'models/WeatherModel',
    'models/WeatherModelCollection',
    'views/WeatherListItem'

], function ($, App, UI, Utils, Properties, Dolphin, ClientAttribute, WeatherModel, WeatherModelCollection, WeatherListItem) {
    return {

        listDemo: function () {

            App.Viewport.useLayout("main");

            App.Viewport.render().done(function () {

                // init Dolphin
                const serverUrl = "http://sputnik.canoo.com:8080/dolphinServer/tutorial/";

                var dolphin = new Dolphin({
                    serverUrl: serverUrl,
                    clearSession: true
                });

                dolphin.getClientDolphin().sendEmpty(function() {

                    var items = new WeatherModelCollection([], { dolphin: dolphin });

                    var list = new UI.List({ listItem: WeatherListItem, collection: items, scrollable: true });

                    list.on('itemTap', function(model) {
                        alert(model.get('temperature') + ' / ' + model.get('humidity'));
                    });

                    App.Viewport.pushCard('main', list);
                });
            });
        }
    }
});
