// Adafruit Motor shield library
// copyright Adafruit Industries LLC, 2009
// this code is public domain, enjoy!

#include <AFMotor.h>

AF_DCMotor motor(4);

void setup() {
  Serial.begin(9600);           // set up Serial library at 9600 bps
  Serial.println("Motor test!");
  pinMode(13, OUTPUT);

  // turn on motor
  motor.setSpeed(200);
 
  motor.run(RELEASE);
}

void loop() {
  uint8_t i;
  
  Serial.print("tick");
  digitalWrite(13, HIGH); 
  
  motor.run(FORWARD);
  for (i=0; i<255; i++) {
    motor.setSpeed(i);  
    delay(10);
  }

 
  for (i=255; i!=0; i--) {
    motor.setSpeed(i);  
    delay(10);
  }
  
  digitalWrite(13, LOW);
  delay(1000);
  
  Serial.print("tock");
  digitalWrite(13, HIGH); 

  motor.run(BACKWARD);
  for (i=0; i<255; i++) {
    motor.setSpeed(i);  
    delay(10);
  }
 
  for (i=255; i!=0; i--) {
    motor.setSpeed(i);  
    delay(10);
  }
  digitalWrite(13, LOW); 
  delay(1000);

  Serial.print("tech");
  digitalWrite(13, HIGH); 
  motor.run(RELEASE);
  delay(1000);
  digitalWrite(13, LOW); 
  delay(1000);
  
}
