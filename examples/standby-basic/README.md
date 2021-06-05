# Basic Standby Screen

[See documentation for Standby Apps](../../docs/Standby%20Apps.md)

Before accessing any developer features, your Double 3 will need to be [put into developer mode](../../docs/Developer%20Mode.md).

Open the Developer Monitor of your D3 in Chrome on your computer by visiting: `http://YOUR_D3_IP:8080`. You can find your D3's local IP by tapping the WiFi icon on the default standby screen.

## Host Your Files

Upload the files from this example to a web server or launch a web server on your local computer. You can do that easily in a terminal by changing to this repository directory and [running a static web server](https://gist.github.com/willurd/5720255), such as:

python 2:

    python -m SimpleHTTPServer 8000

or python 3:

    python -m http.server 8000

Type the address of your web server (````http://YOUR_COMPUTER_IP:8000/````) into the Standby GUI input field and click the "Go" button.

![D3 Debug Monitor - Standby URL](monitor-standby-url.png "D3 Debug Monitor - Standby URL")
