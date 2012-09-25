define(["underscore", "backbone"], function(_, Backbone){

    var Item = Backbone.Model.extend({
        defaults: {
            type: "unknown",
            name: "untitled",
            description: "undefined",
            price: 0
        },

        sell: function(cash){
            var price = this.get("price");

            this.destroy();
            return cash - price;
        }
    });

    return Item;
});