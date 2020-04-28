# Double 3 Security

D3 is secured by two primary methods:

- Firewall that is configured to block all incoming traffic
- USB ports are disabled

## Maintaining Security without Developer Mode

When exiting developer mode (editing `/etc/d3/startup.json`), the firewall is automatically enabled and USB ports are disabled. You can maintain SSH access while ensuring security of the device when exiting developer mode (to deploy the unit to a real-world use case) by customizing the firewall.

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

## Exit Developer Mode

You can exit developer mode by editing the file startup file:

    sudo vi /etc/d3/startup.json

Edit the `DEBUG_MODE` config parameter to be `false` (with vi, `i` for insert mode):

    {
       "config":{
          "DEBUG_MODE": false
       },
       "commands":[
          { "c": "events.server.enable" },
          { "c": "gui.enable" },
          { "c": "screensaver.allow" },
          { "c": "network.requestLocation" },
          { "c": "endpoint.enable", "delayMs": 2000 }
       ]
    }

**Before rebooting, make sure that you really want to exit developer mode. If you still want to have SSH access to your device, you must first follow the instructions above to allow access through the firewall.** Enabling developer mode will re-enable the firewall and disable the USB ports. To regain access to your device, you will need to contact Double Robotics again to request re-enabling developer mode.

Save the file (with vi, `esc` `ZZ`).

    sudo reboot

