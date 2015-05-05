.PHONY: ALL

ALL: data/library.json

bib.keys: _posts/*md _drafts/*md
	grep @[a-zA-Z]*[0-9][0-9][a-zA-Z]* _drafts/*md -oh --color=never | sed 's/@//g' > t_bib.keys
	grep @[a-zA-Z]*[0-9][0-9][a-zA-Z]* _posts/*md -oh --color=never | sed 's/@//g' >> t_bib.keys
	cat t_bib.keys | sort | uniq > bib.keys
	rm t_bib.keys

data/library.json: bib.keys
	chmod +x yamlbib.py
	./yamlbib.py $< ~/.pandoc/default.bib data/$<.bib
	pandoc-citeproc -j data/$<.bib > $@
	rm data/$<.bib
	rm $<
