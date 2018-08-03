# Cookie Profile Switcher

## Install
Install through the Chrome Webstore at: https://chrome.google.com/webstore/detail/cookie-profile-switcher/dicajblfgcpecbkhkjaljphlmkhohelc

## About
Cookie Profile Switcher allows you to easily manage multiple cookie sessions for all of your websites! No more logging out & logging in, just to switch your user profile. This is a MUST have for people who manage multiple social media profiles, emails or eCommerce accounts. Simply create a new profile in the extension, login to your user account, then you can switch between your profiles with ease.

If you've got questions, bugs to report or requests for new features, please contact me via email at emerysteele [at] gmail.com


## How it Works
The extension at it's core is fairly simple. It takes advantage of Google Chrome Extension's cookie & storage APIs. When a new profile is created, the profile name is stored in Google Chrome's local storage. Then when you switch to another profile, the cookie data for the website on the active tab is saved to the previous profile; And the cookie data from the local storage is loaded into the cookie store, effectively swapping the cookies.


## License Info
This work is licensed under a GNU General Public License v3.0.

This extension uses the following open-source projects:

* jQuery
* Bootstrap
* Font Awesome
* Showdown

## Analytics
This extension uses Google Analytics to gather a small amount of anonymous usage data. This data includes: browser version, number of sessions per user, and average session length. Personal information like your profile or cookie data will not be tracked. Ever. The usage information is used to improve the usability of extension & help with bug fixes.
