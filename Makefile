# Makefile
# Run this file after updating 'data.xlsx'

all:
	python3 python_scripts/application_input.py
	python3 python_scripts/bar_plots.py
	python3 python_scripts/network_per_category.py
	python3 python_scripts/network_total.py
	cp 'data.xlsx' public/

default:
	python3 python_scripts/application_input.py
	cp 'data.xlsx' public/
