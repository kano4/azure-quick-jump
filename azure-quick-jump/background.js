chrome.tabs.onActivated.addListener(function (tabId) {
    chrome.tabs.query({"active": true}, function (tab) {
        if (tab[0].url.match(/ja-jp/)) {
            chrome.browserAction.setBadgeText({text:"ja"});
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});
        } else if (tab[0].url.match(/en-us/)) {
            chrome.browserAction.setBadgeText({text:"en"});
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 255, 255]});
        } else if (tab[0].url.match(/.scm.azurewebsites.net/)) {
            chrome.browserAction.setBadgeText({text:"az"});
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});
        } else if (tab[0].url.match(/.azurewebsites.net/)) {
            chrome.browserAction.setBadgeText({text:"az"});
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});
        } else {
            chrome.browserAction.setBadgeText({text:""});
        }
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (tab.url.match(/ja-jp/)) {
        chrome.browserAction.setBadgeText({text:"ja"});
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});
    } else if (tab.url.match(/en-us/)) {
        chrome.browserAction.setBadgeText({text:"en"});
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 255, 255]});
    } else if (tab.url.match(/.scm.azurewebsites.net/)) {
        chrome.browserAction.setBadgeText({text:"az"});
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});
    } else if (tab.url.match(/.azurewebsites.net/)) {
        chrome.browserAction.setBadgeText({text:"az"});
        chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255]});
    } else {
        chrome.browserAction.setBadgeText({text:""});
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        code: `
            var url = window.location.href;
            if (url.match(/.scm.azurewebsites.net/)) {
		var url_website = url.replace(/(.scm.azurewebsites.net.*$)/g, function(x){return ('.azurewebsites.net')});
            	window.open(url_website);
            } else if (url.match(/.azurewebsites.net/)) {
		var url_scm = url.replace(/(.azurewebsites.net.*$)/g, function(x){return ('.scm.azurewebsites.net')});
            	window.open(url_scm);
            } else if (url.match(/en-us/)) {
            	var url_ja = url.replace(/(en-us)/g, function(x){return ('ja-jp')});
                window.location.href = url_ja;
            } else if (url.match(/ja-jp/)) {
                var url_en = url.replace(/(ja-jp)/g, function(x){return ('en-us')});
                window.location.href = url_en;
            }

            `
    });
});
