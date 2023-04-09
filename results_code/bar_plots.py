# Import librarie(s)
import graphlib
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import numpy as np
import os

# This program plots four graphs:
# 1) Histogram DT techniques, 2) DT tools,
# 3) Histogram ecosystem techniques, 4) ecosystem tools
def barplot(dataframe, plot_name, y_tick_interval, rotation, fontsize):
    # Create sorted 2D array, e.g. [[]]
    dataframe = dataframe.sort_index(axis = 1)
    sorted_data = np.array(sorted(np.array([list(dataframe.columns.values), list(dataframe.count())]).T, 
                   key=lambda x:int(x[1]), reverse=True)).T
    x_values = np.arange(len(sorted_data[0]))
    y_values = [int(i) for i in sorted_data[1]]

    plt.figure()
    plt.tight_layout()
    plt.rcParams["figure.figsize"] = [8.50, 5.50]
    plt.rcParams["figure.autolayout"] = True
    plt.grid(axis = 'y')
    plt.bar(x_values, y_values, color='grey')
    plt.xticks(x_values, sorted_data[0], rotation=rotation, ha='right', fontsize=fontsize)
    plt.yticks(np.arange(0, max(y_values)+1, y_tick_interval), ha='right', fontsize=12)
    plt.savefig('output/'+plot_name)


def remove_empty_columns(dataframe):
    new_dataframe = dataframe.copy()
    for column in new_dataframe.columns:
        if dataframe[column].count() == 0:
            dataframe = dataframe.drop(column, axis=1)

    return dataframe

os.chdir("../data")

# For bar plots, we need to compressed data
# Read data, remove empty columns
data = (pd.read_excel('data_compressed.xlsx')).dropna(how='all')

# Keep track of the amount of papers so we can dynamically split the dataframe as needed
DTs_papers = 18
ecosystem_papers = 11


misc = 7
data_type_amount = 11
visualization_technique_amount = 19
visualization_tool_amount = 27
medium_amount = 8

DT_data = data.iloc[0:DTs_papers,]
ecosystem_data = data.iloc[DTs_papers: DTs_papers+ecosystem_papers,]
total_data = data.iloc[0: DTs_papers+ecosystem_papers,]

DT_data_type = remove_empty_columns(DT_data.iloc[:, misc:misc+data_type_amount])
ecosystem_data_type = remove_empty_columns(ecosystem_data.iloc[:, misc:misc+data_type_amount])
total_data_type = remove_empty_columns(total_data.iloc[:, misc:misc+data_type_amount])

DT_visualization_technique = remove_empty_columns(DT_data.iloc[:, misc+data_type_amount:misc+data_type_amount+visualization_technique_amount ])
ecosystem_visualization_technique = remove_empty_columns(ecosystem_data.iloc[:, misc+data_type_amount:misc+data_type_amount+visualization_technique_amount ])
total_visualization_technique = remove_empty_columns(total_data.iloc[:, misc+data_type_amount:misc+data_type_amount+visualization_technique_amount ])


DT_visualization_tool = remove_empty_columns(DT_data.iloc[:, misc+data_type_amount+visualization_technique_amount:misc+data_type_amount+visualization_technique_amount+visualization_tool_amount])
ecosystem_visualization_tool = remove_empty_columns(ecosystem_data.iloc[:, misc+data_type_amount+visualization_technique_amount:misc+data_type_amount+visualization_technique_amount+visualization_tool_amount])
total_visualization_tool = remove_empty_columns(total_data.iloc[:, misc+data_type_amount+visualization_technique_amount:misc+data_type_amount+visualization_technique_amount+visualization_tool_amount])


DT_medium= remove_empty_columns(DT_data.iloc[:, misc+data_type_amount+visualization_technique_amount+visualization_tool_amount:
                                           misc+data_type_amount+visualization_technique_amount+visualization_tool_amount+medium_amount])
ecosystem_medium= remove_empty_columns(ecosystem_data.iloc[:, misc+data_type_amount+visualization_technique_amount+visualization_tool_amount:
                                           misc+data_type_amount+visualization_technique_amount+visualization_tool_amount+medium_amount])
total_medium= remove_empty_columns(total_data.iloc[:, misc+data_type_amount+visualization_technique_amount+visualization_tool_amount:
                                           misc+data_type_amount+visualization_technique_amount+visualization_tool_amount+medium_amount])



# Save files in the same directory as our program
os.chdir("../results_code")

barplot(DT_data_type, 'DT_occurence_data_type.pdf', 2, 20, 8)
barplot(DT_visualization_technique, 'DT_occurence_visualization_technique.pdf', 2, 20, 8)
barplot(DT_visualization_tool, 'DT_occurence_visualization_tool.pdf', 1, 20, 8)
barplot(DT_medium, 'DT_occurence_medium.pdf', 1, 20, 8)

barplot(ecosystem_data_type, 'ecosystem_occurence_data_type.pdf', 2, 20, 8)
barplot(ecosystem_visualization_technique, 'ecosystem_occurence_visualization_technique.pdf', 1, 20, 8)
barplot(ecosystem_visualization_tool, 'ecosystem_occurence_visualization_tool.pdf', 1, 20, 8)
barplot(ecosystem_medium, 'ecosystem_occurence_medium.pdf', 1, 20, 8)

barplot(total_data_type, 'total_occurence_data_type.pdf', 2, 20, 8)
barplot(total_visualization_technique, 'total_occurence_visualization_technique.pdf', 1, 20, 8)
barplot(total_visualization_tool, 'total_occurence_visualization_tool.pdf', 1, 20, 8)
barplot(total_medium, 'total_occurence_medium.pdf', 1, 20, 8)

 
