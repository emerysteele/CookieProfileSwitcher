var extVersionNumber = extension.getExtensionVersion();


function init(){
	$('#about-extension-version').html(extVersionNumber);
	loadChangelog();
	loadProfileData();
}

function loadChangelog() {
	var url = extension.getResourceURL("changelog.md");
	$.get(url).done(function(text) {
		var converter = new showdown.Converter();
		var html = converter.makeHtml(text);
		$("#changelog-content").html(html);
	});
}

function loadProfileData(){
	chrome.storage.local.get('profiles', function(items){
		var profile;
		if(jQuery.isEmptyObject(items) || jQuery.isEmptyObject(items.profiles)){
			
		}
		else{
			profile = JSON.parse(JSON.stringify(items.profiles));
			$('#profile-data-textarea').val(JSON.stringify(profile, undefined, "\t"));
		}
	});
	
}

function saveProfileData(){
	var profile = JSON.parse($('#profile-data-textarea').val());
	if(!jQuery.isEmptyObject(profile)){
		if(confirm("Are you sure you want to save profile data?")){
			chrome.storage.local.set({'profiles': profile}, function(){
			});
		}
		else{
		}
		
	}
}

function clearProfileData(){
	var profile = {};
	if(confirm("Are you sure you want to clear profile data?")){
		chrome.storage.local.set({'profiles': profile}, function(){
			$('#profile-data-textarea').val("");
		});
	}
	else{
	}
}
function exportProfileData(){
	chrome.storage.local.get('profiles', function(items){
		var profile;
		if(jQuery.isEmptyObject(items) || jQuery.isEmptyObject(items.profiles)){
			
		}
		else{
			profile = JSON.parse(JSON.stringify(items.profiles));
			var dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(JSON.stringify(profile, undefined, "\t"));
			downloadURI(dataUri, "CookieProfileSwitcher.json");
		}
	});
}

function clearCookieData(){
	chrome.storage.local.get('profiles', function(items){
		var profile;
		if(!jQuery.isEmptyObject(items) && !jQuery.isEmptyObject(items.profiles)){
			profile = JSON.parse(JSON.stringify(items.profiles));
			console.log(JSON.stringify(profile));
		}
	});
}

function sendEmail() {
    var emailUrl = "mailto:emerysteele@gmail.com?Subject=Cookie%20Profile%20Switcher%20-%20Feedback";
    chrome.tabs.create({ url: emailUrl }, function(tab) {
        setTimeout(function() {
            chrome.tabs.remove(tab.id);
        }, 500);
    });
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function importProfileData(e){
	var files = e.target.files, reader = new FileReader();
	reader.onload = _imp;
	reader.readAsText(files[0]);
}

function _imp() {
	var _myImportedData = JSON.parse(this.result);
	if(!jQuery.isEmptyObject(_myImportedData)){
		chrome.storage.local.set({'profiles': _myImportedData}, function(){
			$('#profile-data-textarea').val(JSON.stringify(_myImportedData, undefined, "\t"));
		});
	}
	$('#import-profile-data-input').val("");
}


function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

document.addEventListener('DOMContentLoaded', function() {
  init();
  document.querySelector('#save-profile-data').addEventListener('click', saveProfileData);
  document.querySelector('#clear-profile-data').addEventListener('click', clearProfileData);
  //document.querySelector('#clear-cookie-data').addEventListener('click', clearCookieData);
  document.querySelector('#import-profile-data').addEventListener('click', function(){$('#import-profile-data-input').click();});
  document.querySelector('#import-profile-data-input').addEventListener('change', importProfileData);
  document.querySelector('#export-profile-data').addEventListener('click', exportProfileData);
  document.querySelector('#send-email').addEventListener('click', sendEmail);
  //document.querySelector('#profileCreate_button').addEventListener('click', newProfile);
  //document.body.addEventListener('click', focusFilter);
  //document.querySelector('#remove_button').addEventListener('click', removeAll);
  //document.querySelector('#import_button').addEventListener('click', importCookies);
  //document.querySelector('#filter_div input').addEventListener(
  //    'input', reloadCookieTable);
  //document.querySelector('#filter_div button').addEventListener(
  //    'click', resetFilter); 
});