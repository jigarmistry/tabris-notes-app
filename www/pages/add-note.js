exports.page = function () {
    var data = require("../db");

    var page = new tabris.Page({
        title: "Add Note",
        topLevel: false
    });

    var scrollView = new tabris.ScrollView({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }).appendTo(page);

    tabris.device.on("change:orientation", function (device, orientation) {
        scrollView.set("scrollX", 0);
        scrollView.set("scrollY", 0);
    });

    var textP = new tabris.TextInput({
        layoutData: {
            top: 20,
            left: "10%",
            right: "10%"
        },
        message: "Title"
    }).appendTo(scrollView);

    var textI = new tabris.TextInput({
        layoutData: {
            top: "prev() 10",
            left: "10%",
            right: "10%",
            height: 200,
        },
        type: "multiline",
        message: "Description"
    }).appendTo(scrollView);

    new tabris.Button({
        layoutData: {
            centerX: 0,
            top: "prev() 10"
        },
        text: "Add"
    }).on('tap', function () {
        var notes = JSON.parse(localStorage.getItem("notes"));
        var username = localStorage.getItem("username");
        notes[username][textP.get("text")] = textI.get("text");
        localStorage.setItem("notes", JSON.stringify(notes));
        textP.set("text", "");
        textI.set("text", "");
    }).appendTo(scrollView);

    return page;
};