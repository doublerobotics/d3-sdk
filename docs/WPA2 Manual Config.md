# Configure WPA2 Manually

While WPA2 personal (PSK) and WPA2 Enterprise (EAP-MSCHAPv2) are configurable in the on-screen user interface of Double 3, some network types, such as EAP-TLS, require installing certificates to the device or other custom settings. You'll need to talk with your network admin to get the certificate file(s) and the details of the network configuration.

In developer mode, you can copy the certificate(s) to Double via a USB drive or, if you can temporarily join a different WiFi network, then you can copy them over your local network.

You can copy the file(s) to D3 via scp, like this:

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

Attempt to connect using this connection:

    sudo nmcli connection up 'My Network'

If successful and you want to delete any other network, you can do that with:

    nmcli connection show
    sudo nmcli connection delete 'Other Network Name'

