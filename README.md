jQuery-PostCapture [![Build Status](https://travis-ci.org/ssut/jQuery-PostCapture.svg?branch=master)](https://travis-ci.org/ssut/jQuery-PostCapture) [![Build status](https://ci.appveyor.com/api/projects/status/7k0yj6e1h3c7dcwo)](https://ci.appveyor.com/project/ssut/jquery-postcapture)
==================

Capture POST parameter with jQuery. This project will help you if you are trying to get any POST parameter. (This project is referenced from http://stackoverflow.com/a/1409029/3352865 -- **profit!**)

----------

Features
---------
- Get any post parameter formatted javascript object
- use html5 localStorage when available (else cookie)
    - same-origin (same domain)
    - [browser support localStorage][1]

Warning
---------
This plugin is saves form data as human-readable text format(json) and save to cookie storage when (1) localStorage is unavailable (2) target domain(action) is different([Read this][2]).
This operation is very dangerous if web page is not secured and use this for important form data. **please** use SSL.

Installation
---------
**bower**

Via [bower][3].

`$ bower install jquery-postcapture`

Or add `jquery-postcapture` to your apps `bower.json`.
```js
"dependencies": {
  "jquery-postcapture": "latest"
}
```

**standalone**
First, download a distribution from [Releases][4].
Include script ***after*** the jQuery library (unless you are packaging scripts somehow else):
`<script src="/path/to/jquery.postcapture.js"></script>`

**Do not hotlink the raw script url. (https://raw.github.com/...).**
The file is being served as text/plain and as such being blocked in Internet Explorer on Windows 7 for instance (because of the wrong MIME type).
Bottom line: GitHub is not a CDN.

Dependencies
---------
Requires jQuery 1.6.x or higher. (support all jQuery versions)

Usage
---------
`$('#form').capture();`

Read specific input value:
`$.captures('name'); // -> value`

Read specific(filter) input values:
`$.captures(['name1', 'name2', 'name3']); // -> { 'name1': 'value', ... }`

Read all available input values:
`$.captures(); // -> { 'name': 'value', ... }`

Contributing
---------
```
$ git clone https://github.com/ssut/jQuery-PostCapture.git
$ cd jQuery-PostCapture/
$ npm install
$ npm install grunt-cli -g
```

To run the grunt-watch suite locally:

`$ grunt watch`

To run the test suite locally:

`$ npm test`

Changes
---------
Version  | Notes
--------- | -----
0.0.1 | Pre-release version (unstable, not completed)

Author
---------
SuHun Han ([@ssut][5])

License
---------
This plugin is available under the [BSD 3-Clause license][6].


  [1]: http://www.quirksmode.org/dom/html5.html
  [2]: https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
  [3]: http://bower.io/
  [4]: https://github.com/ssut/jQuery-PostCapture/releases
  [5]: https://twitter.com/ssut_
  [6]: http://opensource.org/licenses/BSD-3-Clause