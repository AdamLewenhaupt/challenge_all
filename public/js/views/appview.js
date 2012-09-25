define(["underscore", "backbone", "jquery", "collections/items", "views/item", "form2json"], function(_, Backbone, $, Items, ItemView, form2JSON){

    var AppView = Backbone.View.extend({
        el: $("#app"),

        cash: 5000,

        events: {
            "click #adder": "createNew"
        },

        initialize: function(){
            this.delegateEvents();

            this.$content = $("#content");
            this.$cash = $("#cash");

            this.render();

            Items.on('add', this.addOne, this);
            Items.on('sell', this.buy, this);

            Items.create({
                price: 100
            });
        },

        createNew: function(){
            Items.create(form2JSON("#input"));
        },

        addOne: function(item){
            $("input").val("");
            var view = new ItemView({model: item});
            this.$content.append(view.render().el);
        },

        render: function(){
            if(this.cash > 0)
                this.$cash.html(this.cash);
            else
                this.$cash.html("No cash flow");
        },

        buy: function(item){
            this.cash = item.sell(this.cash);
            this.render();
        }
    });

    return AppView;
});