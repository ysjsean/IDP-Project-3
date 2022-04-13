# Copyright (C) 2020 KLASS - All Rights Reserved
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential
# Author: WENG Ching-Yen
# Contact chingyen.weng@klasses.com.sg for enquiries
#!/bin/sh
sudo apt install -y ros-melodic-rosbridge-server ros-melodic-web-video-server ros-melodic-map-server

green=`tput setaf 2`
reset=`tput sgr0`

sudo chmod +x fake_ros/fake_ros.py