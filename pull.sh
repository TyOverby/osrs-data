#!/bin/bash

while true 
do
	NOW="$(date +'%s')" # Seconds since epoch 
	curl -A 'ty overby <ty@pre-alpha.com>' --silent https://prices.runescape.wiki/api/v1/osrs/latest | ../jq '.' > "$NOW.json"
	sleep 3
done
