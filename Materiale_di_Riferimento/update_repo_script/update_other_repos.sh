#!/bin/bash

#Questo script mantiene aggiornate le repository connesse.

#cd `dirname $0` #current directory
cd ExpressMockup/
git pull upstream master
cd ../materiale_RC_professore
git pull upstream master
cd ../\!Progetti_Svolti/Progetto\ 3/
git pull upstream master
