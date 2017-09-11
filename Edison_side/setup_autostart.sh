#!/bin/sh
echo "src intel-iotdk https://iotdk.intel.com/repos/3.5/intelgalactic/opkg/i586/" > /etc/opkg/intel-iotdk.conf
opkg update
opkg upgrade mraa upm
npm install
chmod 777 autostart.sh
cp autostart.service /lib/systemd/system/
systemctl daemon-reload
systemctl enable autostart.service
systemctl start autostart.service