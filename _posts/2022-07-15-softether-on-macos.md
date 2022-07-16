---
layout: post
title: SoftEther on macOS
---

Recently, I wanted to connect to my university network to do some hacking on a raspberry pi cluster. Therefore I wanted to set up SoftEther on my MacBook. But unfortunately,There was no proper documentation for that rather than conecting through L2TP.I had to spend few days to figure out a way to setup,so just sharing hoping someone would find this helpful.😇

 This is my personal note.

- Download softether code [here](https://www.softether-download.com/en.aspx?product=softether)
  
- unzip
  
- `cd` into folder

- run `make` to build

- you may need to install `tuntap` [here](https://brewinstall.org/install-tuntap-mac-osx/), I wanted this on macOS Monterey.
  
- `sudo ./vpnclient start`

- `./vpncmd`

- Enter 3

- `check`

- `niccreate vpn_se`

- `accountcreate cites`

- `Destination VPN Server Host Name and Port Number:<VPN IP address>:<SoftEther VPN Port>`

- `Destination Virtual Hub Name: <Hub Name>`

- `Connecting User Name: <Username of LMS, Moodle, UoM_Wireless, UoM Email>`

- `Used Virtual Network Adapter Name: <Created virtual interface’s name>`

- `AccountPassword <UoM Username>`

- `Specify standard or radius:radius`

- `accountlist`

- `sudo ifconfig` and see virtual network adapter has no ip.

- `sudo ipconfig set tap0 DHCP` to get a ip

- `sudo netstat -rn` to see routing table

- `sudo route add -net <destination-ip>/<mask> <gateway-ip>`

- can get some help from linux guide [here](https://uom.lk/cites/support/vpn-installation-guide) but some commands are different, but works fine.

Thanks.
