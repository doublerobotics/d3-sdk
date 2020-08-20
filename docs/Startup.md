# Customize Startup

You can customize the startup configuration and commands that run on boot by editing the file `/etc/d3/startup.json`.

### config

In the `config` object, the most useful properties to set are `DEBUG_MODE` and `STANDBY_URL`. Technically, you can override any of the properties listed in the Monitor > System > Local Configuration section, but it is not recommended to override others.

You can easily set a startup config variable by running the `api.setConfig` command from the Developer Monitor with parameters:

    {
        "key": "STANDBY_URL",
        "value": "https://standby.doublerobotics.com"
    }

### commands

The `commands` array is useful when you are developing a highly custom implementation. For example, you can choose to not enable the default GUI container. You can add [any command](API.md) to this list.

Each entry into the `commands` array must be an object containing the command (`c`) property and, optionally, a `delayMs` property that indicates the approximate number of milliseconds to wait after launch before running this command. These are not blocking, so if you schedule two commands to have `"delayMs": 2000`, they will both execute at approximately the same time.

In developer mode, the default startup.json looks like this:

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

If you change any of these variables, be very careful that you get the JSON format correct and the file is valid.
