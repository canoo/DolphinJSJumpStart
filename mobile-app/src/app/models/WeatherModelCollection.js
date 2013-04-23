define(['_', 'backbone', 'models/WeatherModel' ], function (_, Backbone, WeatherModel) {

    return Backbone.Collection.extend({

        model: WeatherModel,

        initialize: function (models, options) {
            this.dolphin = options.dolphin;

            var me = this;
//            this.dolphin.getClientDolphin().sendEmpty(function() {

                me._poll();
//            });

        },

        _poll: function (models) {

            console.log("... CALLBACK", models);

            if (models && models.length == 1) {
                var model = models[0];

//                var render = function() {
//                    var myLocAttr = model.getAttributeByPropertyName("location");
//                    var myTempAttr = model.getAttributeByPropertyName("temperature");
//                    console.log(model.presentationModelType + ": " + myLocAttr.value + "/" + myTempAttr.value);
//                };
//                render();
//
//                model.on('render', function () {
//                    alert("RENDER");
//                });

                this.add(new WeatherModel({}, { pm: model }))
            }

            console.log("POLLING ...");
            this.dolphin.getClientDolphin().send("longPoll", _.bind(this._poll, this));
        }
    });
});