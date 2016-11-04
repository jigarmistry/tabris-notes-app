exports.page = function () {
    var data = require("../db");

    var page = new tabris.Page({
        title: "Add Note",
        topLevel: false
    });

    var textP = new tabris.TextInput({
        layoutData: {
            top: 20,
            left: "10%",
            right: "10%"
        },
        message: "Title"
    }).appendTo(page);

    var textI = new tabris.TextInput({
        layoutData: {
            top: "prev() 10",
            left: "10%",
            right: "10%",
            height: 200,
        },
        type: "multiline",
        message: "Description"
    }).appendTo(page);

    new tabris.Button({
        layoutData: {
            centerX: 0,
            top: "prev() 10"
        },
        text: "Add"
    }).on('tap', function () {
        var notes = {
            "test1": "data pne",
            "teset2": textI.get("text"),
            "test4": "localStorage.getItemlocalStorage.getItemlocalStorage.getItemlocalStorage.getItemlocalStorage.getItemlocalStorage.getItem"
        };
        localStorage.setItem("notes", JSON.stringify(notes));
    }).appendTo(page);

    return page;
};