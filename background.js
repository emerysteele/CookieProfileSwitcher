// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.cookies.onChanged.addListener(function(info) {
  console.log("onChanged" + JSON.stringify(info.cookie));
});

/*function focusOrCreateTab(url) {
  chrome.windows.getAll({"populate":true}, function(windows) {
    var existing_tab = null;
    for (var i in windows) {
      var tabs = windows[i].tabs;
      for (var j in tabs) {
        var tab = tabs[j];
        if (tab.url == url) {
          existing_tab = tab;
          break;
        }
      }
    }
    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, {"selected":true});
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var manager_url = chrome.extension.getURL("manager.html");
  focusOrCreateTab(manager_url);
});*/

chrome.runtime.onStartup.addListener(function () {
  createOffscreen();
});

chrome.runtime.onInstalled.addListener(function () {
  createOffscreen();
});

// Use offscreen API to keep service worker alive
// Ref: https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension/66618269#66618269
// create the offscreen document if it doesn't already exist
async function createOffscreen() {
  if (await chrome.offscreen.hasDocument?.()) return;
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['BLOBS'],
    justification: 'keep service worker running',
  });
}
// a message from an offscreen document every 20 second resets the inactivity timer
chrome.runtime.onMessage.addListener(msg => {
  if (msg.keepAlive) console.log('keepAlive');
});