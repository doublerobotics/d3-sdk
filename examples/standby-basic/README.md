# Basic Standby Screen

Before accessing any developer features, your Double 3 will need to be [put into developer mode](docs/Developer%20Mode.md).

This page explains how to display a custom, interactive screen on your Double 3's touchscreen using HTML and Javascript.

Open the Developer Monitor of your D3 in Chrome on your computer by visiting: ````http://YOUR_D3_IP:8080````. You can find your D3's local IP by tapping the WiFi icon on the default standby screen.

## Host Your Files

Upload your files to a web server or launch a web server on your local computer. You can do that easily in a terminal by changing to this repository directory and [running a static web server](https://gist.github.com/willurd/5720255), such as:

python 2:

    python -m SimpleHTTPServer 8000

or python 3:

    python -m http.server 8000

Type the address of your web server (````http://YOUR_COMPUTER_IP:8000/````) into the Standby GUI input field and click the "Go" button.

## Chrome DevTools

You will likely want to open the Chrome DevTools window, which you can do by marking the Debug checkbox and Disable, then Enable the Standby GUI. A link will appear, which is something like: ````http://YOUR_D3_IP:5555````

### DevTools Screencast Bug

There is a bug in Chrome DevTools while the "screencast" feature is on (the default). Rendering on the remote device (D3 screen) sometimes does not update. We recommend turning off the screencast - click the phone/tablet devices icon. You can still refresh your target page by using the key command (i.e. cmd + R).
