# !important - use localhost:8002 to run the application

# netcraft-twitter

Netcraft FED Test - by Dror Avidov

## Context

* Build an Angular based web sample application
* Application flow:
	* Connect to Twitter
	* Enable the user to search (autocomolete style) for twitter users
	* Get top ten users and show their name and picture on a left side bar
	* When the user clicks on one of the twitter users in the list fetch twitter user top tweets
	* Have a 'Lode More ...' option to fetch more tweets
* Building a page from scratch
* Used in this application:
	* npm and package.json to set and install all required additional libraries both for server and for client
	* Angular 1.6.4 as the SPA framework
	* jQuery
	* Bootstrap (used mostly for grid-system and various UI components)
	* Bootswath (Paper Material) on top of Bootstrap
	* Used some styles and general component from the web (for example: oauth.js)

## Instalation

```
$ git clone https://github.com/just2click/netcraft-twitter.git
$ cd netcraft-twitter
$ npm install
```

## Running

```
$ npm start
```


