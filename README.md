# Selection Tool for Visualization Techniques and Visualization Tools for Digital Twins of Ecosystems

## About

This repository contains a tool for selecting visualization techniques and tools for digital twins of ecosystems.

View the web-tool here: https://adeelaashraf.github.io/visualization_DTs_ecosystems/

A user is able to construct a network graph that depicts the connections between data types, visualization techniques and visualization tools used in existing works. Data used to construct the graph originates from a systematic literature review. A user is able to cluster nodes in similarity, and toggle edges of between nodes of the same type. Upon selecting a node or edge, additional information can be viewed in the right sidebar.

## Development Cycle

The development consists of three parts:
1. Update ```data.xlsx``` in the root directory, (please follow the included instructions)
2. Run ```make deploy```, which:\
    a. Runs all Python scripts to process the data, including ```data.json```\
    b. Copies data files to specified directories\
    c. Updates the application version
3. Run ```npm run deploy``` to publish

## Contact

This project is part of Adeela Ashraf's master thesis project at the University of Amsterdam, under supervision of [Rob Belleman](mailto:R.G.Belleman_at_uva.nl) and [Zhiming Zhao](mailto:Z.Zhao_at_uva.nl).
For further contact, please visit http://visualisationlab.science.uva.nl/ or send an email to the [developer](mailto:adeela-97_at_hotmail.com) or supervisors.
