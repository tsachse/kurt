# Ein Roboterexperiment 

## Motorsteuerung 

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
#### Und wie testen?

http://www.roborooter.com/post/1466/testing-johnny-five/


## Links

- http://www.elektronx.de/tutorials/motorsteuerung-mit-l298-und-raspberry-pi/
- http://www.retas.de/thomas/raspberrypi/pibot-b/
- http://thefloppydisk.wordpress.com/2013/06/06/raspberry-pi-gpio-inputoutput-in-javascript/
- http://thejackalofjavascript.com/raspberry-pi-node-js-led-emit-morse-code/
- http://blog.fxndev.com/raspberry-pi-and-led-fun/
- http://www.sonderzeichen.de/Pfeile-Alphabet.html
