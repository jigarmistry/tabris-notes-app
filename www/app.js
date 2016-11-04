var addNote = require("./pages/add-note");
var viewNotes = require("./pages/view-notes");
var settings = require("./pages/settings");

var page = new tabris.Page({
  title: "Notes",
  topLevel: true
});

page.on("appear", function () {
  console.log(localStorage.getItem("notes"));
});

new tabris.Button({
  layoutData: {
    centerX: 0,
    centerY: -75
  },
  text: "Add Note"
}).on('tap', function () {
  addNote.page().open();
}).appendTo(page);

new tabris.Button({
  layoutData: {
    centerX: 0,
    top: "prev() 10"
  },
  text: "View Notes"
}).on('tap', function () {
  viewNotes.page().open();
}).appendTo(page)

new tabris.Button({
  layoutData: {
    centerX: 0,
    top: "prev() 10"
  },
  text: "Settings"
}).on('tap', function () {
  navigator.notification.prompt(
    "Please enter your password", // message
    function (data) {
      console.log(data);
      if (data.buttonIndex == 1) {
        settings.page().open();
      }
    }, // callback to invoke
    "Settings", // title
    ["Ok", "Cancel"] // buttonTextViews
  );
}).appendTo(page)

var callback = function (buttonIndex) {
  setTimeout(function () {
    window.plugins.toast.showShortCenter('button index clicked: ' + buttonIndex);
  });
};

function testShareSheet() {
  var options = {
    androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // default is THEME_TRADITIONAL
    title: 'What do you want with this image?',
    subtitle: 'Choose wisely, my friend', // supported on iOS only
    buttonLabels: ['Share via Facebook', 'Share via Twitter'],
    androidEnableCancelButton: true, // default false
    winphoneEnableCancelButton: true, // default false
    addCancelButtonWithLabel: 'Cancel',
    addDestructiveButtonWithLabel: 'Delete it',
    position: [20, 40], // for iPad pass in the [x, y] position of the popover
    destructiveButtonLast: true // you can choose where the destructive button is shown
  };
  window.plugins.actionsheet.show(options, callback);
};

page.open();