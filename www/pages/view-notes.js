exports.page = function () {
    var page = new tabris.Page({
        title: "Collection View",
        topLevel: false
    });

    var view = new tabris.CollectionView({
        layoutData: {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        },
        itemHeight: 50,
        refreshEnabled: false,
        initializeCell: function (cell) {
            var textView = new tabris.TextView({
                layoutData: {
                    top: 2,
                    bottom: 2,
                    left: 5,
                    right: 5
                }
            }).appendTo(cell);

            var button = new tabris.Button({
                layoutData: {
                    left: 70,
                },
                text: "Click"
            });

            cell.on("change:item", function (widget, item) {
                textView.set("text", item);
            });
        }
    }).appendTo(page);

    view.on('select', function (target, value) {
        console.log(target);
        console.log(value);
    });

    loadItems();

    var action;
    page.on("appear", function () {
        action = new tabris.Action({
            title: "Sync",
            placementPriority: "high"
        }).on("select", function () {
            window.plugins.toast.showShortCenter("Action selected.");
        });
    });

    page.on("disappear", function () {
        action.dispose();
    });

    var textView = new tabris.TextView({
        centerX: 0,
        centerY: 0,
        text: "Add new note from home page"
    }).appendTo(page);
    textView.set("visible", false);

    page.open();

    function loadItems() {
        var activityIndicator = new tabris.ActivityIndicator({
            centerX: 0,
            centerY: 0
        }).appendTo(page);

        activityIndicator.set("visible", true);

        setTimeout(function () {
            activityIndicator.set("visible", false);
            view.set({
                items: createNewItems()
            });
        }, 1000);
    }

    var count = 1;

    function createNewItems() {
        var items = [];
        for (var i = 0; i < 0; i++) {
            items.push("Item " + count++);
        }
        return items;
    }
    return page;
};