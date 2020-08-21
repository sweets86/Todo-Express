# Todo-Express-Xtern API
Node.js, Express

# Innehåll
* En Serverapplikation byggd på Express och Node.js.
* REST-API: GET, POST, PUT, DELETE
* Xternt-API: SMHI, väderprognos för 10 dagar framöver. Temperatur och vindhastighet.

Applikationen är till för att skriva in vad du vill göra.
Skriv vad du vill göra i inputfältet och tryck på knappen lägg till TODO.
Du kan skriva in hur många TODOs som du vill och dessa listas upp i en ordnad lista när du trycker på lista alla TODO.
Du utgår ifrån din lista vilken TODO som du vill ändra.
Vill du ändra en specikfik TODO i din lista så skriver du in din nya TODO i inputfältet och tycker sedan på repektive ändra TODO knapp för den specifika TODO som du vill ändra.
Om du därefter uppdaterar listan genom att trycka på lista alla TODO så kommer du se att listan är ändrad till det du just skrivit in.
Vill du ta bort en specifik TODO så trycker du på ta bort TODO knappen för respektive TODO.
Uppdaterar du listan igen genom att trycka på lista alla TODO så ser du i listan att den TODO du tagit bort är borttagen.
Visa TODO knappen, för respektive TODO visar med röd färg den specifika TODOn vars knapp du trycker på.

För att lättare kunna planera din dag och dina TODOs har du en 10-dagars väderprognos.
Där kan du se vilken temperatur och vindhastighet det kommer att vara vid ett specifikt klockslag.
Denna data är hämtad från SMHIs öppna väder API och uppdateras i och med det.

# För att köra applikationen
Ladda ner filen från Github och kopiera innehållet i en ny mapp och öppna mappen i VSC. Du behöver ha node.js installerat på datorn. Öppna terminalen och skriv in npm install. Du kommer se att node_modules mappen läggs till.

Därefter skriver du in npm start i terminalen. Nu bör du fått igång applikationen till port localhost:3000.
