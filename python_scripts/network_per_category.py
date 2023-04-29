from pyvis.network import Network
import graphlib
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import numpy as np
from colour import Color
import os
import pdfkit
from process_data import *


def get_graph(dataframe):
    graph_dict = {}

    # Create an empty nested dictionary of nodes and edges like this:
    # A B C D
    # x   x       => A:{B{0}, C:{0}, D{0}, etc.}
    # x     x
    # etc.
    names_list = dataframe.columns.values
    for index, value in enumerate(names_list[:-1]):
        graph_dict[value] = {}
        for _, value2 in enumerate(names_list[index+1:]):
            #graph_dict.append([value, j, 0])
            graph_dict[value][value2] = 0

    # Go over dataframe and add weights
    # Go over each row
    for index, row in dataframe.iterrows():
        # For each row, make pairs using a temp list
        # A B C D    => AC, AD
        # x   x x
        temp = []
        for index2, value in enumerate(row):
            if (row[index2]) == "x":
                temp.append(names_list[index2])

        # Find pairs, and add weight to empty list
        for index, value in enumerate(temp[:-1]):
                for _, value2 in enumerate(temp[index+1:]):
                    graph_dict[value][value2] += 1

    # Remove entries with weight zero
    for key, value in graph_dict.items():
        temp3 = []
        for key2, value2, in value.items():
            if value2 == 0:
                temp3.append([key, key2])
        for i in temp3:
            del graph_dict[i[0]][i[1]]

    temp4 = []
    for key, value in graph_dict.items():
        if not value:
            temp4.append(key)
    for i in temp4:
        del graph_dict[i]
    # Convert to list
    #                                   A B 0
    # A:{B{0}, C:{1}, D{0}, etc.} =>    A C 1
    #                                   A D 0
    #                                   etc.

    graph_list = []
    nodes_list = []
    for key, value in graph_dict.items():
        for key2, value2 in value.items():
            graph_list.append((key, key2, value2))
            nodes_list.append(key)
            nodes_list.append(key2)

    return list(set(nodes_list)), graph_list

def create_circular_graph(dataframe, color, filename):
    nodes_list, graph_list = get_graph(dataframe)

    # Nodes
    G = nx.Graph()
    for i in nodes_list:
        G.add_node(i, color=color, edge_color='black', font_family='arial')

    # Make network
    pos=nx.spring_layout(G, scale=2000)
    nt = Network('1000px', '1800px', bgcolor='#ffffff')
    nt.from_nx(G)
    nt.toggle_physics(True)


    nt.force_atlas_2based()

    # Edges
    for i in graph_list:
        nt.add_edge(i[0], i[1], value=i[2], color='grey')

    #nt.show_buttons(filter_=['physics', 'nodes', 'edges'])
    nt.show_buttons(filter_=['physics'])
    nt.show(filename)

data, data_type, visualization_technique, visualization_tool, medium = get_literature_data("compressed")
os.chdir("output")
create_circular_graph(data_type, "red", 'data_type.html')
create_circular_graph(visualization_technique, "blue", 'visualization_technique.html')
create_circular_graph(visualization_tool, "purple", 'visualization_tool.html')
create_circular_graph(medium, "green", 'medium.html')
