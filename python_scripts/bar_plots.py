# Import librarie(s)
import graphlib
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import numpy as np
import os
from process_data import *

def barplot(dataframe, plot_name, y_tick_interval, rotation, fontsize, figsize):
    # Create sorted 2D array, e.g. [[]]
    dataframe = dataframe.sort_index(axis = 1)
    sorted_data = np.array(sorted(np.array([list(dataframe.columns.values), list(dataframe.count())]).T, 
                   key=lambda x:int(x[1]), reverse=True)).T
    x_values = np.arange(len(sorted_data[0]))
    y_values = [int(i) for i in sorted_data[1]]
    plt.rcParams["font.family"] = "Times New Roman"
    plt.figure()
    plt.tight_layout()
    plt.rcParams["figure.figsize"] = figsize
    plt.rcParams["figure.autolayout"] = True
    plt.grid(axis = 'y')
    plt.bar(x_values, y_values, color='grey')
    plt.xticks(x_values, sorted_data[0], rotation=rotation, ha='right', fontsize=fontsize)
    plt.yticks(np.arange(0, max(y_values)+1, y_tick_interval), ha='right', fontsize=fontsize+2)
    plt.savefig(plot_name)


data, data_type, visualization_technique, visualization_tool, medium = get_literature_data("compressed")
os.chdir("output")
barplot(data_type, 'total_occurence_data_type.pdf', 2, 20, 10, [12, 10])
barplot(visualization_technique, 'total_occurence_visualization_technique.pdf', 1, 20, 14, [13, 8])
barplot(visualization_tool, 'total_occurence_visualization_tool.pdf', 1, 40, 16, [12, 6])
barplot(medium, 'total_occurence_medium.pdf', 1, 20, 14, [12, 6]) 