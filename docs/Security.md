# Double 3 Security

All D3s ship in a secured state, with all inbound traffic on all ports blocked and the USB ports on the back of the device disabled. The only way to interact with the device is through the touch screen, which has the standard feature set intended for end users. Once connected to the internet, D3 establishes a secure connection to the Double servers.

D3 is secured by three primary methods:

- Firewall that is configured to block all incoming traffic
- No user accounts with SSH access
- USB ports are disabled

## Security in Developer Mode

When [entering developer mode](Developer%20Mode.md), the firewall is disabled completely, the `double` user is created and given SSH access, and the USB ports on the back of the device are enabled. This is insecure, so you should run in developer mode only on a trusted private WiFi network.

## Maintaining Access when Exiting Developer Mode

When [exiting developer mode](Developer%20Mode.md), the firewall is automatically enabled and USB ports are disabled. The `double` user account is not changed, but you may change this as you wish – it is not required for the core system to function.

You can maintain SSH access while ensuring security of the device when exiting developer mode (to deploy the unit to a real-world use case) by customizing the firewall.

#### Customize the Firewall

D3 runs Ubuntu 18.08 and uses the standard Ubuntu firewall called [UncomplicatedFirewall](https://wiki.ubuntu.com/UncomplicatedFirewall) (`ufw`). The default configuration is no rules, which indicates to block all incoming traffic. 

To allow SSH access through the firewall:

    sudo ufw allow ssh

You can see the rules that you've added with `sudo ufw show added`.

#### Switch to Public Key SSH 

At a minimum, you should change your ssh password to something long and custom (`passwd` in a terminal), but a more secure authentication method is to switch to public key (certificate-based) SSH. This is very common for linux servers and simple to set up. [Digital Ocean has a thorough tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-1804).

#### USB Ports

The USB ports on the back of your D3 are automatically enabled in developer mode and disabled when exiting developer mode. From your custom app, you can control them with the `system.enableRearUSBPorts` and `system.disableRearUSBPorts` commands.

If you want to enable the USB ports on startup, even after you exit developer mode, you can add it to the `commands` array in the `/etc/d3/startup.json` file, like:

    ...
    { "c": "system.enableRearUSBPorts", "delayMs": 1000 },
    ...

[See how to enter and exit developer mode.](Developer%20Mode.md)
