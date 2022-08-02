# <p align="center">[<img src="https://en.gravatar.com/userimage/206415854/7e115efd3feeb98c4ef9e1c26fe0fb51.png" style="height:30px;"> discord.js-console](https://www.npmjs.com/package/discord.js-console)</p>
Eine Consolenerweiterung welche mit discord.js interagieren kann
- - - - -
## Installation
Das Package wird mit:
``npm i discord.js-console`` installiert.
Bevor das Package verwendet werden kann muss es mit `` const { console } = require('discord.js-console')`` importiert werden. 

Die neue Console wird bereit gemacht, indem ``console.consolebuilder()`` verwendet wird.

## Benutzung
Nun kann nachdem das Package in deiner datei Importiert ist jederzeit verwendet werden. Es muss innerhalb eines Projektes nur einmal die Console bereit gemacht werden.

|Commad|Argumente|Beschreibung|Beispiel|
|---|---|---|---|
|console.consolebuilder|channellog, logchannel, time, color, client|Einrichten des Consolen Systems|console.consolebuilder(false, 0, true, true, client)|
|console.log|Nachricht|Logge eine einfache Nachricht|console.log("Moin")|
|console.logError|Fehlercode, Nachricht|Logge einen Fehler|console.logError(error, "Alles Ok")|
|console.logWarning|Nachricht|Logge eine Warnung|console.logWarning("Moin")|
|console.logOperation|Type, Status, Nachricht|Logge eine Operation|console.logOperation("Login","COMLPLEATE","erfolgreich")|
|console.logStatus|Status, Nachricht|Logge einen Status|console.logStatus("Online", "System erfolgreich gestartet")|
|console.clear|-|Leere die Console|console.logClear()|
|console.table|Array, properties, showindex|Stelle daten in der Console in einer Tabelle dar|console.logTable([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], [], false)|
