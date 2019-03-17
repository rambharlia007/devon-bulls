var AppViewModel = function () {
    var self = this;
    self.selectedState = ko.observable();
    self.price = ko.observable();
    self.triggerPrice = ko.observable();
    self.stopLoss = ko.observable();
    self.minimumLoss = ko.observable(1000);
    self.trailingStopLoss = ko.observable(0);
    self.target = ko.observable(5);

    self.quantity = ko.computed(function () {
        if (self.stopLoss())
            return Math.round(self.minimumLoss() / self.stopLoss());
        return 0;
    });

    self.isEquity = ko.observable(true);

    const monthNames = ["January", "February", "19MARFUT", "19APRFUT", "19MAYFUT", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = new Date().getMonth();
    self.futureOptions = ko.observableArray(["Equity",
        monthNames[month], monthNames[month + 1], monthNames[month + 2]]);

    self.indexValue = ko.observable();
    self.isEquity = ko.observable(true);
    self.isFut1 = ko.observable();
    self.isFut2 = ko.observable();
    self.isFut3 = ko.observable();

    self.symbol = ko.observable();

    self.isEquity.subscribe(function (val) {
        if (val) {
            var temp = self.selectedState();
            self.symbol(temp);
            self.isFut1(false);
            self.isFut2(false);
            self.isFut3(false);
        }
    })

    self.isFut1.subscribe(function (val) {
        if (val) {
            var temp = self.selectedState();
            self.symbol(temp + self.futureOptions()[1]);
            self.isEquity(false);
            self.isFut2(false);
            self.isFut3(false);
        }
    })
    self.isFut2.subscribe(function (val) {
        if (val) {
            var temp = self.selectedState();
            self.symbol(temp + self.futureOptions()[2]);
            self.isEquity(false);
            self.isFut1(false);
            self.isFut3(false);
        }
    })
    self.isFut3.subscribe(function (val) {
        if (val) {
            var temp = self.selectedState();
            self.symbol(temp + self.futureOptions()[3]);
            self.isEquity(false);
            self.isFut1(false);
            self.isFut2(false);
        }
    })

    self.copyText = function () {
        var copyText = document.getElementById("copy-link");
        copyText.select();
        document.execCommand("copy");
    }

    self.link = ko.observable("");
    self.submit = function () {
        if (!self.symbol())
            self.symbol(self.selectedState());
        var finalString = `https://rambharlia007.github.io/devon-bulls?exchange=Nfo&symbol=${self.symbol()}&tradetype=Buy&qty=${self.quantity()}&price=${self.price()}&triggerprice=${self.triggerPrice()}&sl=${self.stopLoss()}&target=${self.target()}`
        self.link(finalString);
    }


    self.executeOrder = function () {
        self.submit();
        self.init(true);
        var link = document.getElementById('custom-button');
        link.click();
    }

    self.init = function (value) {

        // "http://marketstar-001-site1.ftempurl.com/Kites_Button.shtml/
        // ?exchange=Nfo&symbol=BHARTIARTL19MARFUT&tradetype=Buy&qty=1700&price=313.9&triggerprice=313.6&sl=2.5&target=3.4"

        var url;

        if (value)
            url = new URL(self.link());
        else {
           // url = new URL(window.location.href);
            url = new URL("http://marketstar-001-site1.ftempurl.com/Kites_Button.shtml/?exchange=Nfo&symbol=BHARTIARTL19MARFUT&tradetype=Buy&qty=1700&price=313.9&triggerprice=313.6&sl=2.5&target=3.4");
        }



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
};

var vm = new AppViewModel();
ko.applyBindings(vm);
vm.init();