# Ein Roboterexperiment 

## Motorsteuerung 

### Links

- http://www.elektronx.de/tutorials/motorsteuerung-mit-l298-und-raspberry-pi/
- http://www.retas.de/thomas/raspberrypi/pibot-b/
- http://thefloppydisk.wordpress.com/2013/06/06/raspberry-pi-gpio-inputoutput-in-javascript/
- http://thejackalofjavascript.com/raspberry-pi-node-js-led-emit-morse-code/
- http://blog.fxndev.com/raspberry-pi-and-led-fun/

### DK Electronics MotorShield for Arduino (Adafruit Motor Shield v1.0)

- https://learn.adafruit.com/adafruit-motor-shield
- https://learn.adafruit.com/adafruit-motor-shield/faq

#### What pins are not used on the motor shield?

All 6 analog input pins are available. They can also be used as digital pins (pins #14 thru 19) Digital pin 2, and 13 are not used.
The following pins are in use only if the DC/Stepper noted is in use:
- Digital pin 11: DC Motor #1 / Stepper #1 (activation/speed control)
- Digital pin 3: DC Motor #2 / Stepper #1 (activation/speed control)
- Digital pin 5: DC Motor #3 / Stepper #2 (activation/speed control)
- Digital pin 6: DC Motor #4 / Stepper #2 (activation/speed control)

The following pins are in use if any DC/steppers are used Digital pin 4, 7, 8 and 12 are used to drive the DC/Stepper motors via the 74HC595 serial-to-parallel latch The following pins are used only if that particular servo is in use:
- Digitals pin 9: Servo #1 control
- Digital pin 10: Servo #2 control

#### defines aus AFMotor.h

```C
// Bit positions in the 74HCT595 shift register output
#define MOTOR1_A 2
#define MOTOR1_B 3
#define MOTOR2_A 1
#define MOTOR2_B 4
#define MOTOR4_A 0
#define MOTOR4_B 6
#define MOTOR3_A 5
#define MOTOR3_B 7

// Constants that the user passes in to the motor calls
#define FORWARD 1
#define BACKWARD 2
#define BRAKE 3
#define RELEASE 4

// Arduino pin names for interface to 74HCT595 latch
#define MOTORLATCH 12
#define MOTORCLK 4
#define MOTORENABLE 7
#define MOTORDATA 8
```

#### Motordefinitionen mit Johnny-Five

```javascript
  // Motor 1
   var motor = new five.Motor({
       pins: { pwm: 11 },
       register: { data: 8, clock: 4, latch: 12 },
       bits: { a: 2, b: 3 }
     }
    );

  // Motor 2
  var motor = new five.Motor({
      pins: { pwm: 3 },
      register: { data: 8, clock: 4, latch: 12 },
      bits: { a: 1, b: 4 }
    }
   );
```


### L298N Doppelte H-Brücke Schrittmotor-Treiber Steuerungsplatinemodul

- http://www.amazon.de/gp/product/B008KYCDTY/ref=as_li_ss_tl?ie=UTF8&camp=1638&creative=19454&creativeASIN=B008KYCDTY&linkCode=as2&tag=christhimbee-21

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


## Sonstige Infos

- http://www.sonderzeichen.de/Pfeile-Alphabet.html
