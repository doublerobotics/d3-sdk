# Configure WPA2 Manually

While WPA2 personal (PSK) and WPA2 Enterprise (EAP-MSCHAPv2) are configurable in the on-screen user interface of Double 3, some network types, such as EAP-TLS, require installing certificates to the device or other custom settings. You'll need to talk with your network admin to get the certificate file(s) and the details of the network configuration.

In developer mode, you can copy the certificate(s) to D3 via a USB drive (remove the access panel on the back):

    lsblk # look for your drive, likely /dev/sda1
    sudo mkdir /media/usb
    sudo mount /dev/sda1 /media/usb
    sudo mkdir /etc/pki/my-wifi
    sudo cp /dev/sda1/ca.crt /etc/pki/my-wifi
    sudo cp /dev/sda1/client.crt /etc/pki/my-wifi
    sudo cp /dev/sda1/client.key /etc/pki/my-wifi
    sudo umount /media/usb

Or, if you can temporarily join a different WiFi network, you can copy them over your local network via scp (from MacOS or Linux):

    scp client.crt double@x.x.x.x:~/

On D3 via ssh, optionally move them to a system directory:

    sudo mkdir /etc/pki/my-wifi
    sudo mv client.crt /etc/pki/my-wifi/

Add the connection via nmcli:

    sudo nmcli connection add type wifi ifname wlan0 con-name 'My Network' \
          802-11-wireless.ssid 'My Wifi' \
          802-11-wireless-security.key-mgmt wpa-eap \
          802-1x.eap tls \
          802-1x.identity identity@example.com \
          802-1x.ca-cert /etc/pki/my-wifi/ca.crt \
          802-1x.client-cert /etc/pki/my-wifi/client.crt \
          802-1x.private-key /etc/pki/my-wifi/client.key \
          802-1x.private-key-password abc123

Complete documentation and descriptions of each parameter are on the [nmcli user manual's 802.1x page](https://developer.gnome.org/NetworkManager/stable/settings-802-1x.html).

You must first disconnect wlan0 before attempting to connect using this connection (all in one line, so it's sent before it disconnects):

    sudo nmcli device disconnect wlan0 && sleep 5 && sudo nmcli connection up 'My Network'

If successful and you want to delete any other network, you can do that with:

    nmcli connection show
    sudo nmcli connection delete 'Other Network Name'

