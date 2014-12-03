# kurt


Ein Roboterexperiment.

## Motorsteuerung 

### Links

http://www.elektronx.de/tutorials/motorsteuerung-mit-l298-und-raspberry-pi/
http://www.retas.de/thomas/raspberrypi/pibot-b/

### L298N Doppelte H-Brücke Schrittmotor-Treiber Steuerungsplatinemodul

http://www.amazon.de/gp/product/B008KYCDTY/ref=as_li_ss_tl?ie=UTF8&camp=1638&creative=19454&creativeASIN=B008KYCDTY&linkCode=as2&tag=christhimbee-21

#### Einfache Ansteuerung von Motoren (Amanzonbewertung)

Diese H-Brücke ist gut geeignet um einen Einstieg in das Thema Motorsteuerung bis hin zu 
Schrittmotoren zu bekommen.
Ich habe sie am Raspberry PI B laufen und steuere zwei Motoren im Rechts-/Linkslauf damit.
Die Beschreibung musste ich lange suchen und habe keine richtige gefunden. Daher hier 
das was ich rausbekommen habe:
Über den kleinen Schalter neben der Spannungsversorgungsleiste (3polige Klemmleiste) 
lässt sich ein interner 5V Spannungsregler Ein-/Aus schalten. Ist er eingeschaltet 
leuchtet eine Diaode auf dem Board und die rechte der 3 Klemmen liefert 5V.
Ist er ausgeschaltet muss 5V von extern an diese Klemme angelegt werden.
Die Brücke ist in der Auslieferung über Jumper so eingestellt, dass beide Ausgänge 
Freigegeben sind (Klemmen Rechts- und Links auf dem Board. 
Legt man an die freien Pins unterhalb der Jumper 5V an laufen die Motoren wie folgt:
- 0,0,0,0 Beide Motoren stehen
- 1,0,0,0 Linker Motor läuft Rechts
- 0,1,0,0 Linker Motor läuft Links
- 1,1,0,0 Beide Motoren stehen
- 0,0,1,0 Rechter Motor läuft Rechts
- 0,0,0,1 Rechter Motor läuft Links
- 0,0,1,1 Beide Motoren stehen
- 1,1,1,1 Beide Motoren stehen

Jeder Eingang hat eine LED on Board die leuchtet wenn 5V anliegen.

Wozu die weiße Steckleiste dient, konnte ich nicht in Erfahrung bringen. 
Vielleicht hat ja jemand einen Tipp für mich.

#### Schrittmotor RPi (Amanzonbewertung)

Ich hab mir vor wenigen Wochen den L298N Motortreiber bestellt um damit einen 
Sanyo Schrittmotor zu betreiben. Leider gibt es keine guten Datenblätter zur Platine, 
dementsprechend musste ich sie mir selbst erklären.

Nun zur einfachen Erklärung, die ich teilweise einem anderen Rezensenten, der ihn 
für zwei Motoren nutzte entnahm.

Nun meine Erfahrungen mit dem Anschließen des Raspberry Pi. Wichtig und logisch 
sollte sein, dass an den Schraubklemmen von VCC und GND der Plus und Minuspol des 
Netzteils angeschlossen werden müssen. Nun müssen im Fall des Raspberry Pi noch ein 
Jumper vom 5V TLT zur zugehörigen Klemme angebracht werden und vom GND des Raspberry Pi 
ebenfalls zur GND Klemme (also hier zwei Kabel einklemmen)
Auf diese Weise wird der Steuerungsstrom des PI bereitgestellt.

Nun einfach die IN Pins mit vier beliebigen GPIOs verbinden und natürlich den 
Schrittmotor auch passend anschließen. Hier einfach das Datenblatt des Motors prüfen
 und danach sehen, wie die Spulen bzw. die Kabel belegt werden.

Anschließend lassen sich über den Raspberry Pi ohne Probleme die Pins im 
Fullstept oder Halfstepbetrieb nutzen.

Also:
- Step 1: 1 0 1 0
- Step 2: 0 1 1 0
- Step 3: 0 1 0 1
- Step 4: 1 0 0 1

und eben den Halbschrittbetrieb, indem man noch die zwischen Schritte einbaut, 
die nur aus einem aktiven Out bestehen. Dazu gibt es aber auch gute Videos auf YouTube, 
in denen alles erklärt wird.

Wichtig übrigens ist, dass die Out wirklich ausgeschalten werden, wenn der Motor 
angehalten wird bzw. wenn ein Motorprogramm zwischen drin gestoppt wird. Der L298N wird 
sehr schnell heiß, wenn man Pins aktiv hält und dementsprechend weiter Strom zum Motor 
fließen lässt, damit dieser die Spulen läd.


== Sonstige Infos


http://www.sonderzeichen.de/Pfeile-Alphabet.html
