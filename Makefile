# Makefile
# Run this file after updating 'data.xlsx' and pushing master branch remote

graphs:
	python3 python_scripts/bar_plots.py
	python3 python_scripts/network_per_category.py
	python3 python_scripts/network_total.py

process_data:
	python3 python_scripts/application_input.py
	cp 'data.xlsx' public/

update_version:
	@echo "Updating version in .env and package.json"
	@version=$$(date +'%Y-%m-%d'); \
	echo "REACT_APP_VERSION=$$version" > .env; \
	node -e "const fs = require('fs'); \
	const packageJson = JSON.parse(fs.readFileSync('package.json')); \
	packageJson.version = '$$version'; \
	fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));"

remote: process_data update_version