bib.keys: _posts/*md _drafts/*md
	# Extract the keys under the @lllNN{l} pattern of my ids
	grep @[a-zA-Z]*[0-9][0-9][a-zA-Z]* _drafts/*md -oh --color=never | sed 's/@//g' > t_bib.keys
	grep @[a-zA-Z]*[0-9][0-9][a-zA-Z]* _posts/*md -oh --color=never | sed 's/@//g' >> t_bib.keys
	cat t_bib.keys | sort | uniq > bib.keys
	rm t_bib.keys

data/library.json: bib.keys
	# Make the library in JSON format from the list of keys
	python jsonlib.py
	mv default.json data/library.json

all: data/library.json
