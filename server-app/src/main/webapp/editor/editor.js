require([
    'Dolphin',
    'comm/ClientAttribute'
], function (Dolphin, ClientAttribute) {

    var url = window.location.protocol + '//' + window.location.host + "/dolphinServer/tutorial/";
    var dolphin = new Dolphin({ serverUrl: url, clearSession: true });

    dolphin.getClientDolphin().sendEmpty(function() {

        console.log("INIT");

        var locAttr = new ClientAttribute("location");
        var tempAttr = new ClientAttribute("temperature");

        var weatherMold = dolphin.getClientDolphin().presentationModel(
            "weatherMold",
            "weather",
            locAttr, tempAttr
        );

        var locInput = document.getElementById("locInput");
        var tempInput = document.getElementById("tempInput");

        tempInput.addEventListener("input", function () {
            var value = tempInput.value;
            tempAttr.setValue(value);
        });

        tempAttr.on("valueChange", function(data) {
            tempInput.value = data.newValue;
        });

        locInput.addEventListener("input", function () {
            var value = locInput.value;
            locAttr.setValue(value);
        });

        locAttr.on("valueChange", function(data) {
            locInput.value = data.newValue;
        });


        var table = document.getElementById("weather-records");
        var addButton = document.getElementById("addButton");

        var create = function(model) {

            var myLocAttr = model.getAttributeByPropertyName("location");
            var myTempAttr = model.getAttributeByPropertyName("temperature");

            var row = document.createElement("tr");
            row.addEventListener("click", function() {
                weatherMold.syncWith(model);
            });
            row.dataset.id = model.id;

            var cntTd = document.createElement("td");
            cntTd.innerHTML = table.children.length;
            cntTd.dataset.role = 'number';
            row.appendChild(cntTd);

            var locTd = document.createElement("td");
            locTd.innerHTML = myLocAttr.getValue();
            locTd.dataset.role = 'location';
            row.appendChild(locTd);

            var tmpTd = document.createElement("td");
            tmpTd.innerHTML = myTempAttr.getValue();
            tmpTd.dataset.role = 'temperature';
            row.appendChild(tmpTd);

            table.appendChild(row);

            return row;
        }

        var update = function(row, model) {
            var myLocAttr = model.getAttributeByPropertyName("location");
            var myTempAttr = model.getAttributeByPropertyName("temperature");

            var locTd = row.querySelector('[data-role="location"]');
            locTd.innerHTML = myLocAttr.getValue();

            var tmpTd = row.querySelector('[data-role="temperature"]');
            tmpTd.innerHTML = myTempAttr.getValue();
        }

        addButton.addEventListener("click", function () {
            dolphin.getClientDolphin().send("add", function (models) {
                models.forEach(function (model) {
                    var row = create(model);
                    var render = function() {
                        update(row, model);
                    };
                    model.on("render", render);
                })
            });
        });

    })

});