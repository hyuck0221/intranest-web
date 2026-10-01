# IntraNest Web

The public home for IntraNest: learn what it does, follow the setup guides, and open the Admin page to connect to your team's own server.

**Current version:** `0.1.0`  
**Available languages:** [한국어](README.ko.md)

## What you can do here

- Learn how IntraNest keeps shared links, chat, and files on a computer inside your intranet.
- Read the server and Chrome extension setup guides, terms of use, and privacy page.
- Open Admin and connect your browser directly to your team's IntraNest server.
- Manage shared links, files, chat, and the server's chat history period.

The website is a static companion for your self-hosted server. It does not relay team content or run a second IntraNest server. Admin saves the server address in this browser and keeps the access key only for the current tab session.

## Connect to a team server

Ask your server host for the intranet address and team access key, then choose **Open admin**. Enter the address, such as `http://192.168.1.40:8080`, and the key. The page checks the server API before opening shared content. Chrome may ask the site to access your local network.

To use Admin from a hosted web address, the server host must add that exact site origin to `INTRANEST_CORS_ORIGINS`. The server and browser must also be able to reach each other on the intranet.

## Read the guides

- [Setup guide](public/guide.html)
- [Terms of use](public/terms.html)
- [Privacy](public/privacy.html)
- [Server releases](https://github.com/hyuck0221/intranest-server/releases)
- [Chrome extension releases](https://github.com/hyuck0221/intranest-extensions/releases)

## Host this website

Download the latest ZIP from [GitHub Releases](https://github.com/hyuck0221/intranest-web/releases) and serve its contents from a static web host over HTTPS. Set the resulting origin in the server's `INTRANEST_CORS_ORIGINS` value. This website does not need to be installed on team computers.

## Release versions

The root `version` file controls this project's version. A push to `master` creates a GitHub Release with the built website ZIP only when the version is newer than the latest published release. The server, web, and extension versions are independent.
