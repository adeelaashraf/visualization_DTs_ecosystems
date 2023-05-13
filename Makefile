# Makefile
# Run this file after updating 'data.xlsx' and pushing master branch remote

graphs:
	python3 python_scripts/application_input.py
	python3 python_scripts/bar_plots.py
	python3 python_scripts/network_per_category.py
	python3 python_scripts/network_total.py
	cp 'data.xlsx' public/
	npm start

default:
	python3 python_scripts/application_input.py
	cp 'data.xlsx' public/
	npm start

make deploy:
	python3 python_scripts/application_input.py
	cp 'data.xlsx' public/
	@echo "Updating version in .env"
	@echo "REACT_APP_VERSION=$$(node -p "require('./package.json').version")" > .env
	npm run deploy