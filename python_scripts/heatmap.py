from email import header
import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.colors as colors
import os
import json
from process_data import *

data, data_type, visualization_technique, visualization_tool, medium = get_literature_data("compressed")

# Prepare the dictionary as domain: {visualization technique: count}
# Sort by name as well
domain_list = [value.split(', ') for value in data['Domain(s)'].tolist()]
domain_names = list(set([item for sublist in domain_list for item in sublist]))
visualization_technique_names = visualization_technique.columns.tolist()
domain_names.sort()
visualization_technique_names.sort()

#Make the empty dict
heatmap_dict = {domain: {vis_tech: 0 for vis_tech in visualization_technique_names} for domain in domain_names}

# Populate the dict
for index, row in data.iterrows():
    # Get the domain(s) of the paper
    domains = data['Domain(s)'][index].split(', ')
    # Get the visualization techniques used in the paper
    row_df2 = visualization_technique.loc[index]
    visualization_techniques = row_df2[row_df2.eq('x')].index.tolist()
    # For each domain here, assign the visualization techniques

    for i in domains:
        for j in visualization_techniques:
            heatmap_dict[i][j] += 1

heatmap_data = np.array([[heatmap_dict[name1][name2] for name2 in visualization_technique_names] for name1 in domain_names])

cmap = colors.LinearSegmentedColormap.from_list('custom_gray', [(1, 1, 1), (0, 0, 0)])
plt.rcParams.update({'font.size': 12})
plt.rcParams["font.family"] = "Times New Roman"
plt.figure(figsize=(9, 8))  # Set the width and height as needed
plt.imshow(heatmap_data, cmap=cmap, interpolation='nearest')# Set tick labels for the x-axis and y-axis
plt.xticks(np.arange(len(visualization_technique_names)), visualization_technique_names, rotation=45, ha='right')
plt.yticks(np.arange(len(domain_names)), domain_names)
plt.colorbar()
plt.tight_layout()
os.chdir("output")
plt.savefig("heatmap.pdf")