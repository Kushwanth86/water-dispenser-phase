#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Servos
Servo servo1;
Servo servo2;

// Ultrasonic Pins
const int trigPin = 9;
const int echoPin = 10;

// Servo Pins
const int servo1Pin = 6;
const int servo2Pin = 7;

// Settings
const int detectDistance = 15;   // cm
const int openAngle = 90;
const int closeAngle = 0;

void setup()
{
  Serial.begin(9600);

  // LCD
  lcd.init();
  lcd.backlight();

  // Ultrasonic
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  // Servos
  servo1.attach(servo1Pin);
  servo2.attach(servo2Pin);

  servo1.write(closeAngle);
  servo2.write(closeAngle);

  lcd.setCursor(0, 0);
  lcd.print("Automatic Water");

  lcd.setCursor(0, 1);
  lcd.print("Dispenser");

  delay(2000);
  lcd.clear();
}

float getDistance()
{
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);

  digitalWrite(trigPin, LOW);

  long duration = pulseIn(echoPin, HIGH);

  float distance = duration * 0.034 / 2;

  return distance;
}

void loop()
{
  float distance = getDistance();

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  lcd.setCursor(0, 0);
  lcd.print("Place Hand    ");

  lcd.setCursor(0, 1);
  lcd.print("Dist:");
  lcd.print(distance, 1);
  lcd.print("cm   ");

  if (distance > 0 && distance <= detectDistance)
  {
    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Dispensing");

    lcd.setCursor(0, 1);
    lcd.print("Water...");

    // Open Tap
    servo1.write(openAngle);
    servo2.write(openAngle);

    delay(3000);

    // Close Tap
    servo1.write(closeAngle);
    servo2.write(closeAngle);

    lcd.clear();

    lcd.setCursor(0, 0);
    lcd.print("Thank You");

    lcd.setCursor(0, 1);
    lcd.print("Visit Again");

    delay(2000);

    lcd.clear();
  }

  delay(200);
}