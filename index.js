function getTimestamp() {
    var timeNow = new Date();
    var timestamp = "" + timeNow.toLocaleTimeString() + " " + timeNow.toLocaleDateString()
    return timestamp;
};

function log(message, logchannel, client) {
    try {
        if (client == undefined) return;
        if (logchannel == undefined) return;
        var content = "```md\n " + getTimestamp() + " " + message + "```";
        client.channels.cache.get(logchannel).send({ content: content });
    } catch (e) { return }
};
function logStatus(message, logchannel, client, status) {
    try {
        if (client == undefined) return;
        if (logchannel == undefined) return;
        if (status == undefined) return;
        var content = "```md\n #" + getTimestamp() + "  [" + status + "]: " + message + "```";
        client.channels.cache.get(logchannel).send({ content: content });
    } catch (e) { return }
};
function logError(message, logchannel, client, code) {
    try {
        if (client == undefined) return;
        if (logchannel == undefined) return;
        if (code == undefined) return;
        var content = "```md\n [" + getTimestamp() + "]: [ERROR] " + code + ": " + message + "```";
        client.channels.cache.get(logchannel).send({ content: content });
    } catch (e) { return }
};
function logWarning(message, logchannel, client) {
    try {
        if (client == undefined) return;
        if (logchannel == undefined) return;
        var content = "```md\n [" + getTimestamp() + "]: [WARNING] " + message + "```";
        client.channels.cache.get(logchannel).send({ content: content });
    } catch (e) { return }
};
function logOperation(message, logchannel, client, status, type) {
    try {
        if (client == undefined) return;
        if (logchannel == undefined) return;
        if (status == undefined) return;
        if (type == undefined) return;
        var content = "```md\n #" + getTimestamp() + " [OPERATION] " + status + " |" + type + ": " + message + "```";
        client.channels.cache.get(logchannel).send({ content: content });
    } catch (e) { return }
};

module.exports.console = class {

    /**
     * @param {boolean} channellog Gebe an, ob das Consolen modul über einen Discord Bot mit loggen soll
     * @param {discord.CategoryChannel.id} logchannel Gebe die Channel ID deines Discord Log Channel an
     * @param {boolean} time Gebe an, ob eine Zeitangabe mit geloggt werden soll
     * @param {boolean} color Gebe an, ob die Ausgabe Farbig sein soll
     * @param {discord.Client} client Gebe den Discord Client ggf. an
     * 
     * @example const { console } = require('./modules/console')
     *          console.consolebuilder(false, 0, true, true, client)
     */
    static consolebuilder(
        channellog = false,
        logchannel = 0,
        time = true,
        color = true,
        client
    ) {
        this.channellog = channellog;
        this.logchannel = logchannel;
        this.time = time;
        this.color = color;
        this.client = client;
    }

    /**
     * Logge eine einfache Nachricht
     * @param {string} message Nachricht
     * 
     * @example console.log("Moin")
    */
    static log(message) {
        if (this.channellog == true) {
            log(message, this.logchannel, this.client)
        }
        if (this.time == true && this.color == true) {
            console.log("\u001b[30;1m" + getTimestamp() + " \u001b[0m" + message);
        }
        if (this.time == false && this.color == true) {
            console.log("\u001b[0m" + message);
        }
        if (this.time == true && this.color == false) {
            console.log(getTimestamp() + " " + message);
        }
        if (this.time == false && this.color == false) {
            console.log(message);
        }
    };
    /**
     * Logge einen Fehler
     * @param {string} code Fehlercode
     * @param {string} message Nachricht dazu
     * 
     * @exaple console.logError(error, "Alles Ok")
     */
    static logError(code, message) {
        if (this.channellog == true) {
            logError(message, this.logchannel, this.client, code)
        }
        if (this.time == true && this.color == true) {
            console.log("\u001b[30;1m" + getTimestamp() + " \u001b[0m[\u001b[31;1m ERROR \u001b[0m] " + code + ": " + message);
        }
        if (this.time == false && this.color == true) {
            console.log("\u001b[0m[\u001b[31;1m ERROR \u001b[0m] " + code + ": " + message);
        }
        if (this.time == true && this.color == false) {
            console.log(getTimestamp() + " [ ERROR ] " + code + ": " + message);
        }
        if (this.time == false && this.color == false) {
            console.log("[ ERROR ] " + code + ": " + message);
        }
    };
    /**
     * Logge eine Warnung
     * @param {string} message Warnung
     * 
     * @example console.logWarning("Moin")
    */
    static logWarning(message) {
        if (this.channellog == true) {
            logWarning(message, this.logchannel, this.client)
        }
        if (this.time == true && this.color == true) {
            console.log("\u001b[30;1m" + getTimestamp() + " \u001b[0m[\u001b[33m WARNING \u001b[0m]: " + message);
        }
        if (this.time == false && this.color == true) {
            console.log("\u001b[0m[\u001b[33m WARNING \u001b[0m]: " + message);
        }
        if (this.time == true && this.color == false) {
            console.log(getTimestamp() + " [ WARNING ]: " + message);
        }
        if (this.time == false && this.color == false) {
            console.log("[ WARNING ]: " + message);
        }
    };
    /**
     * Logge eine Operation
     * @param {string} type Operationstyp
     * @param {string} status Status der Operation, z.B. STILL, COMPLEATE, ERROR
     * @param {string} message Operationsnachricht
     * 
     * @example console.logOperation("Login","COMLPLEATE","erfolgreich")
     */
    static logOperation(type, status, message) {
        if (this.channellog == true) {
            logOperation(message, this.logchannel, this.client, status, type)
        }
        if (this.time == true && this.color == true) {
            console.log("\u001b[30;1m" + getTimestamp() + " \u001b[0m[\u001b[36;1m OPERATION \u001b[0m] \u001b[35m" + status + "\u001b[0m|" + type + ": " + message);
        }
        if (this.time == false && this.color == true) {
            console.log("\u001b[0m[\u001b[36;1m OPERATION \u001b[0m] \u001b[35m" + status + "\u001b[0m|" + type + ": " + message);
        }
        if (this.time == true && this.color == false) {
            console.log(getTimestamp() + " [ OPERATION ] " + status + "|" + type + ": " + message);
        }
        if (this.time == false && this.color == false) {
            console.log("[ OPERATION ] " + status + "|" + type + ": " + message);
        }
    };
    /**
     * Logge einen Status
     * @param {string} status der Status
     * @param {string} message Nachricht zum Status
     * 
     * @example console.logStatus("Online", "System erfolgreich gestartet")
     */
    static logStatus(status, message) {
        if (this.channellog == true) {
            logStatus(message, this.logchannel, this.client, status)
        }
        if (this.time == true && this.color == true) {
            console.log("\u001b[30;1m" + getTimestamp() + " \u001b[0m[ \u001b[32m" + status + " \u001b[0m]: " + message);
        }
        if (this.time == false && this.color == true) {
            console.log("\u001b[0m[ \u001b[32m" + status + " \u001b[0m]: " + message);
        }
        if (this.time == true && this.color == false) {
            console.log(getTimestamp() + " [ " + status + " ]: " + message);
        }
        if (this.time == false && this.color == false) {
            console.log("[ " + status + " ]: " + message);

        }
    };
};