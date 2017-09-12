# Intel-Edison-QIot-Indoor
#### Table of Contents

1. [Description](#description)
2. [Setup - The basics of getting start](#setup)
3. [Usage - Configuration options and additional functionality](#usage)

## Description

Connect Grove Indoor Environment Kit for Intel Edison to QNAP NAS via QIoT Suite Lite.

## Setup

### Setup Requirements

* An Intel Edison board
* Grove Indoor Environment Kit for Intel Edison
* 1 Micro B to Type A USB cables
* A power supply with 7-15V DC and 1500mA at least
* A Wifi AP


### Installation

1. Download Intel Edison drivers based on your host PC:
  * Windows users: https://software.intel.com/en-us/get-started-edison-windows
  * Mac users: https://software.intel.com/en-us/get-started-edison-osx
  * Linux users: https://software.intel.com/en-us/get-started-edison-linux

2. Configure and test your device
  * [Assemble the Intel Edison board](https://software.intel.com/en-us/get-started-edison-windows-step1)
  * [Assemble the Indoor Environment Kit](https://youtu.be/-BX65BijSFc)
    * Using 26AWG Grove Cable making the following connections:
    
      |    Grove Modules    | Connected to |
      | ---------- | --- |
      | Temperature & Humidity Sensor |  I2C |
      | Moisture Sensor | A1 |
      | Light Sensor | A2 |
      | UV Sensor | A3 |
      | PIR Motion Sensor | D7 |
      | Encoder | D2 |
      | Button | D8 |
      | LCD RGB Backlight | I2C |
      | Relay | D4 |
      | Servo | D6 |    
      | Buzzer | D5 |        
  *  [Run setup tools](https://software.intel.com/en-us/get-started-edison-osx-step2): Use the setup tool to flash the latest firmware on the Intel® Edison development board via a convenient wizard. The setup tool also lets you enable SSH and Wi-Fi* connectivity to your board, as described in the steps to follow.
  

3. Install Nodejs and required libraries

  ~~~
  echo "src intel-iotdk https://iotdk.intel.com/repos/3.5/intelgalactic/opkg/i586/" > /etc/opkg/intel-iotdk.conf
  opkg update
  opkg upgrade mraa upm
  opkg install nodejs
  ~~~
  
## Usage
### Import sample application ([iot_inbox.json](/QIoT_side/iot_inbox.json)) in QIoT
* Import the iot_inbox.json file in the IoT Application Panel.
* Go to "Thing" panel and click "Connect a Device" in the action section.
* Choose MQTTS protocol
* Download certificates file
* Download resource info file
### Download sample code on Edison


### Upload certificates and resourceinfo file to your Edison
You can upload files to Edison by Filezilla or WinSCP tools
* Upload certificates to /Edison_side/ssl
* Upload resourceinfo.json to /Edison_side/res

### Run sample code on Intel Edison and connect to QIoT
  ~~~
  cd Edison_side/
  npm install
  ~~~
  
  * Run sample code in foreground mode
  ~~~
  node boot.js
  ~~~
  * Run sample code in non-stop mode
  ~~~
  sh autostart.sh
  ~~~

### Auto setup environment and auto start sample code on boot 
  ~~~
  sh setup_autostart.sh
  ~~~
  
  * Start service
  ~~~
  systemctl start autostart.service
  ~~~
  * Stop service
  ~~~
  systemctl stop autostart.service
  ~~~
  * Restart service
  ~~~
  systemctl restart autostart.service
  ~~~
  * Status service
  ~~~
  systemctl status autostart.service
  ~~~