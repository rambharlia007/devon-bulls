var AppViewModel = function () {
    var self = this;
    self.init = function () {

        // "http://marketstar-001-site1.ftempurl.com/Kites_Button.shtml/
        // ?exchange=Nfo&symbol=BHARTIARTL19MARFUT&tradetype=Buy&qty=1700&price=313.9&triggerprice=313.6&sl=2.5&target=3.4"

        var url = new URL(window.location.href);

      //  url = new URL("http://marketstar-001-site1.ftempurl.com?exchange=Nfo&symbol=BHARTIARTL19MARFUT&tradetype=BUY&qty=1700&price=313.9&triggerprice=313.6&sl=2.5&target=3.4");

        var kite = new KiteConnect("wagq0ctros2rvgdz");
        var exchange = url.searchParams.get("exchange").toUpperCase();
        var symbol = url.searchParams.get("symbol").toUpperCase();
        var tradetype = url.searchParams.get("tradetype").toUpperCase();
        var qty = url.searchParams.get("qty") * 1;
        var price = url.searchParams.get("price") * 1;
        var triggerprice = url.searchParams.get("triggerprice") * 1;
        var sl = url.searchParams.get("sl") * 1;
        var target = url.searchParams.get("target") * 1;
        var product = "MIS";
        var ordertype = "SL"
        var validity = "DAY"
        KiteConnect.ready(function () {
            // Initialize a new Kite instance.
            // You can initialize multiple instances if you need.
            // kite = new KiteConnect("wagq0ctros2rvgdz");

            // Add a stock to the basket
            kite.add({
                "exchange": exchange,
                "tradingsymbol": symbol,
                "transaction_type": tradetype,
                "order_type": ordertype,
                "quantity": qty,
                "price": price,
                "stoploss": sl,
                "trigger_price": triggerprice,
                "validity": validity,
                "product": product,
                "variety": "bo",
                "squareoff": target,
                "trailing_stoploss": 0
            });

            kite.link("#custom-button");
        })
    }

    self.executeOrder = function () {

    }
};

var vm = new AppViewModel();
ko.applyBindings(vm);
vm.init();
