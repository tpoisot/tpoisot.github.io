#! /usr/bin/env python3

import sys,os
sys.path.append('/home/tp/Projects/Code/tammy')
import tammy

lib = tammy.library()

with open('bib.keys', 'r') as bibkeys:
    keylist = bibkeys.readlines()

keylist = [k.rsplit()[0] for k in keylist]

print(keylist)

lib.export(path='.', keys=keylist)
