<p align="center"><img src="public/assets/brand/intranest-mark.png" width="112" alt="IntraNest logo"></p>

# IntraNest Web

The public home for IntraNest: learn what it does, follow the setup guides, and open the Admin page to connect to your team's own server.

**Current version:** `0.2.0`

**Available languages:** [한국어](README.ko.md)

## What you can do here

- Learn how IntraNest keeps shared links, chat, and files on a computer inside your intranet.
- Read the server and Chrome extension setup guides, terms of use, and privacy page.
- Open Admin and connect your browser directly to your team's IntraNest server.
- Manage shared links, files, chat, and the server's chat history period.

The website is a static companion for your self-hosted server. It does not relay team content or run a second IntraNest server. Admin saves the server address in this browser.

## Connect to a team server

Choose **Open admin**, enter only the server host name or IP address, such as `192.168.1.40`, add a display name, and connect. The app checks HTTPS first, falls back to HTTP when needed, and adds port `43187` automatically. Chrome may ask the site to access your local network.

IntraNest has no sign-in or access key. Anyone who can reach the server can view, add, and delete links, files, and chat messages. Keep the server on a trusted network and do not expose it to the public internet.

## Read the guides

- [Setup guide](public/guide.html)
- [Terms of use](public/terms.html)
- [Privacy](public/privacy.html)
- [Server releases](https://github.com/hyuck0221/intranest-server/releases)
- [Chrome extension releases](https://github.com/hyuck0221/intranest-extensions/releases)

## Host this website

Download the latest ZIP from [GitHub Releases](https://github.com/hyuck0221/intranest-web/releases) and serve its contents from a static web host over HTTPS. The server accepts browser connections from any origin. This website does not need to be installed on team computers.

## Release versions

The root `version` file controls this project's version. A push to `master` creates a GitHub Release with the built website ZIP only when the version is newer than the latest published release. The server, web, and extension versions are independent.
