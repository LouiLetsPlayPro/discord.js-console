const { Console } = require('console');
const { Transform } = require('stream');

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
function logTable(message, logchannel, client) {
    try {
        if (client == undefined) return;
        if (logchannel == undefined) return;
        var content = "```md\n" + message + "```";
        client.channels.cache.get(logchannel).send({ content: content });
    } catch (e) { return }
};

module.exports.console = class {

    /**
     * Richte das Consolen System ein
     * @param {boolean} channellog Gebe an, ob das Consolen modul über einen Discord Bot mit loggen soll
     * @param {discord.CategoryChannel.id} logchannel Gebe die Channel ID deines Discord Log Channel an
     * @param {boolean} time Gebe an, ob eine Zeitangabe mit geloggt werden soll
     * @param {boolean} color Gebe an, ob die Ausgabe Farbig sein soll
     * @param {discord.Client} client Gebe den Discord Client ggf. an
     * 
     * @example const { console } = require('./modules/console')
     *          console.consolebuilder(false, 0, true, true, client)
     * 
     * @since v1.0.0
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
     * 
     * @since v1.0.0
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
     * 
     * @since v1.0.0
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
     * 
     * @since v1.0.0
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
     * 
     * @since v1.0.0
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
     * 
     * @since v1.0.0
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

    /**
     * Leere die Console
     * 
     * @example console.logclear()
     * 
     * @since v2.0.0
     */
    static logClear() {
        if (this.channellog == true) {
            log("console cleared", this.logchannel, this.client)
        }
        console.clear()
    }

    /**
     * Stelle daten in der Console in einer Tabelle dar
     * @param {Array} input Array der Daten die in der Tabelle angezeigt werden sollen
     * @param {Array} properties Welche Argumente sollen angezeigt werden - Weck lassen oder leres Array lässt alles anzeigen - Index ausgeschlossen!
     * @param {boolean} index Wenn true wird die Spalte (index) nicht angezeigt
     * 
     * @example console.logTable([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], [], false)
     * @example console.logTable([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ["a"], false)
     * @example console.logTable([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ["a"], true)
     * 
     * @since v2.0.0
     */
    static logTable(input, properties, index) {
        if(!properties || !properties[0]){
            properties = []
            for (let i = 0; i < input.length; i++) {
                for (const key in input[i]) {
                    properties.push(key)
                }
            }
        }
        if(!index){
            index = false
        }
        const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
        const logger = new Console({ stdout: ts })
        logger.table(input, properties)
        const table = (ts.read() || '').toString()
        let result = '';
        if (this.channellog == true) {
            for (let row of table.split(/[\r\n]+/)) {
                let r = row
                if(index == false){
                    r = r.replace(/[^┬]*┬/, '┌');
                    r = r.replace(/^├─*┼/, '├');
                    r = r.replace(/│[^│]*/, '');
                    r = r.replace(/^└─*┴/, '└');
                    r = r.replace(/'/g, ' ');
                }
                result += `${getTimestamp()} ${r}\n`;
            }
            logTable(result, this.logchannel, this.client)
        }

        if (this.time == true && this.color == true) {
            for (let row of table.split(/[\r\n]+/)) {
                let r = row
                if(index == false){
                    r = r.replace(/[^┬]*┬/, '┌');
                    r = r.replace(/^├─*┼/, '├');
                    r = r.replace(/│[^│]*/, '');
                    r = r.replace(/^└─*┴/, '└');
                    r = r.replace(/'/g, ' ');
                }
                result += `\u001b[30;1m${getTimestamp()} \u001b[32m ${r}\n`;
            }
            console.log(result + "\u001b[0m");
        }
        if (this.time == false && this.color == true) {
            for (let row of table.split(/[\r\n]+/)) {
                let r = row
                if(index == false){
                    r = r.replace(/[^┬]*┬/, '┌');
                    r = r.replace(/^├─*┼/, '├');
                    r = r.replace(/│[^│]*/, '');
                    r = r.replace(/^└─*┴/, '└');
                    r = r.replace(/'/g, ' ');
                }
                result += `\u001b[32m ${r}\n`;
            }
            console.log(result + "\u001b[0m");
        }
        if (this.time == true && this.color == false) {
            for (let row of table.split(/[\r\n]+/)) {
                let r = row
                if(index == false){
                    r = r.replace(/[^┬]*┬/, '┌');
                    r = r.replace(/^├─*┼/, '├');
                    r = r.replace(/│[^│]*/, '');
                    r = r.replace(/^└─*┴/, '└');
                    r = r.replace(/'/g, ' ');
                }
                result += `${getTimestamp()} ${r}\n`;
            }
            console.log(result);
        }
        if (this.time == false && this.color == false) {
            for (let row of table.split(/[\r\n]+/)) {
                let r = row
                if(index == false){
                    r = r.replace(/[^┬]*┬/, '┌');
                    r = r.replace(/^├─*┼/, '├');
                    r = r.replace(/│[^│]*/, '');
                    r = r.replace(/^└─*┴/, '└');
                    r = r.replace(/'/g, ' ');
                }
                result += `${r}\n`;
            }
            console.log(result);
        }
    }
};
