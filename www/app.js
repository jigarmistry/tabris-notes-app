var addNote = require("./pages/add-note");
var settings = require("./pages/settings");

var page = new tabris.Page({
  title: "Notes",
  topLevel: true
});

var action;
page.on("appear", function () {
  // localStorage.removeItem("notes");
  localStorage.setItem("username", "jigar");
  var notes = localStorage.getItem("notes");
  console.log(notes);
  if (!notes) {
    var username = localStorage.getItem("username");
    var jsonData = {};
    jsonData[username] = {};
    var strNotes = JSON.stringify(jsonData);
    localStorage.setItem("notes", strNotes);
  }
  action = new tabris.Action({
    title: "Options",
    placementPriority: "high"
  }).on("select", function () {
    showOptions();
  });
  loadItems();
});

page.on("disappear", function () {
  action.dispose();
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

function loadItems() {
  var activityIndicator = new tabris.ActivityIndicator({
    centerX: 0,
    centerY: 0
  }).appendTo(page);

  activityIndicator.set("visible", true);

  setTimeout(function () {
    activityIndicator.set("visible", false);
    view.set({
      items: getItems()
    });
  }, 1000);
}

var count = 1;

function getItems() {
  var items = [];
  for (var i = 0; i < 25; i++) {
    items.push("Item " + count++);
  }
  return items;
}

function showOptions() {
  var options = {
    title: 'Choose your option',
    buttonLabels: ['Add New Note', 'Sync Notes', 'Settings'],
    androidEnableCancelButton: true,
    winphoneEnableCancelButton: true,
    addCancelButtonWithLabel: 'Cancel',
    position: [20, 40]
  };
  window.plugins.actionsheet.show(options, function (btnIndex) {
    if (btnIndex == 1) {
      addNote.page().open();
    } else if (btnIndex == 3) {
      navigator.notification.prompt(
        "Please enter your password",
        function (data) {
          console.log(data);
          if (data.buttonIndex == 1) {
            settings.page().open();
          }
        },
        "Settings", ["Ok", "Cancel"]
      );
    }
  });
};

page.open();