var time = Date.now();

document.onreadystatechange = function (event) {
    if (event.target.readyState !== "complete") {
        return;
    }

    var UserWrapper = new UserWrappr.UserWrappr(Unisquirt.Unisquirt.prototype.proliferate(
        {
            "GameStartrConstructor": Unisquirt.Unisquirt
        },
        Unisquirt.Unisquirt.settings.ui,
        true));

    console.log("It took " + (Date.now() - time) + " milliseconds to start.");
    UserWrapper.displayHelpMenu();
};
