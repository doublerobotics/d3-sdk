# Configure WPA2 Manually

While WPA2 personal (PSK) and WPA2 Enterprise (EAP-MSCHAPv2) are configurable in the on-screen user interface of Double 3, some network types, such as EAP-TLS or EAP-PEAP-MSCHAPv2 (with CA certificate), require copying certificates to the device or other custom settings.

__You'll need to talk with your network admin to get the certificate file(s) and the technical details of the network configuration.__

Your D3 will need to be in Developer Mode for this. [See how to request Developer Mode.](Developer%20Mode.md) You will need to connect to a different WiFi network temporarily, so you can do this configuration.

## Copy certificate files to D3

Your network admin will typically provide one, two, or three x509 certificates in PEM format (extensions could be .pem, .crt, or .key). These are plain text files. 

### Via `scp` over your local network

You can copy each file over your local network via scp (from MacOS, Linux, or via the [PuTTY](https://www.putty.org/) program on Windows):

    scp ca.pem double@x.x.x.x:~/

While you should have already set your own password, you can find the default password in the email you received after entering developer mode.

You will need to connect to your D3 either over `ssh` or you can use the Developer Monitor (http://YOUR_D3_IP:8080) > Terminal tab.

### Via USB drive

You can copy the certificate(s) to D3 via a USB drive (remove the access panel on the back).

Look for the automatic name of the drive (likely `sda1`) in this list:

    lsblk

Mount the drive:

    sudo mkdir /media/usb
    sudo mount /dev/sda1 /media/usb
    ls /media/usb

That last line should print a list of your files.

Copy the files to D3:

    cp /media/usb/ca.pem /home/double
    cp /media/usb/client-crt.pem /home/double  # only if required by your network
    cp /media/usb/client-key.pem /home/double  # only if required by your network

Unmount the drive (note that the command is `umount`, not `unmount`):

    sudo umount /media/usb

## Create WiFi Network

You'll need to get the exact configuration parameters from your WiFi network administrator. The details below are likely not the exact parameters for your network. 

Complete documentation and descriptions of each parameter are on the [nmcli user manual's 802.1x page](https://developer.gnome.org/NetworkManager/stable/settings-802-1x.html).

### EAP-TLS Example

    sudo nmcli connection add type wifi ifname wlan0 con-name 'MyCompanySSID' \
          802-11-wireless.ssid 'MyCompanySSID' \
          802-11-wireless-security.key-mgmt wpa-eap \
          802-1x.eap tls \
          802-1x.identity myname@example.com \
          802-1x.ca-cert /home/double/ca.pem \
          802-1x.client-cert /home/double/client-crt.pem \
          802-1x.private-key /home/double/client-key.pem \
          802-1x.private-key-password "abc123"

### EAP-PEAP-MSCHAPv2 (with CA certificate) Example

    sudo nmcli connection add type wifi ifname wlan0 con-name 'MyCompanySSID' \
          802-11-wireless.ssid 'MyCompanySSID' \
          802-11-wireless-security.key-mgmt wpa-eap \
          802-1x.eap peap \
          802-1x.phase2-auth mschapv2 \
          802-1x.identity myname@example.com \
          802-1x.password "abc123" \
          802-1x.ca-cert /home/double/ca.pem

It should return saying something like:

    Connection 'MyCompanySSID' (XXXXXXXX-XXXX-XXXX-X-XXXXXXXXX) successfully added.

The network should now show up as a saved connection (two buttons: Connect and ►) on the D3's WiFi scan list (press the refresh button), if it's within range of this SSID. You can simply tap the "Connect" button.

If you prefer to connect via the command line, you must first disconnect wlan0 before attempting to connect using this connection (all in one line, so it's sent before it disconnects):

    sudo nmcli device disconnect wlan0 && sleep 10 && sudo nmcli connection up 'MyCompanySSID'

If successful, you'll want to delete the other WiFi network. You can do on the D3 WiFi screen or in the Developer Monitor > Network > Saved Connections list.

## Other Notes

### Convert from PKCS12 (.p12):

If you have a .p12 file, you can convert it to a certificate and key (both are x509 certificates) using the openssl command line tool (pre-installed on Double 3 and most Linux computers):

    openssl pkcs12 -in myfile.p12 -out client-crt.pem -clcerts -nokeys
    openssl pkcs12 -in myfile.p12 -out client-key.pem -nocerts -nodes
