exports.page = function () {
    var page = new tabris.Page({
        title: "Settings",
        topLevel: false
    });

    var textViewUsername = new tabris.TextView({
        layoutData: {
            left: 20,
            top: 20
        },
        alignment: "right",
        font: "14px sans-serif",
        text: "Username"
    }).appendTo(page);

    var textInputUsername = new tabris.TextInput({
        layoutData: {
            top: 15,
            left: "prev() 20",
            right: 20
        },
        alignment: "left",
        message: "Choose your username"
    }).appendTo(page);

    var textViewPassword = new tabris.TextView({
        layoutData: {
            left: 20,
            top: "prev() 20"
        },
        alignment: "right",
        font: "14px sans-serif",
        text: "Password"
    }).appendTo(page);

    var textInputPassword = new tabris.TextInput({
        layoutData: {
            top: [textInputUsername, 15],
            left: "prev() 20",
            right: 20
        },
        type: "password",
        alignment: "left",
        message: "Choose your password"
    }).appendTo(page);

    page.on("disappear", function () {
        console.log(textInputUsername.get("text"));
        console.log(textInputPassword.get("text"));
    });

    return page;
};