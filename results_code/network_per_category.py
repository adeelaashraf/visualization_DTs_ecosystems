from pyvis.network import Network
import graphlib
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import numpy as np
from colour import Color
import os
import pdfkit

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

def create_circular_graph(dataframe1, dataframe2, filename):
    nodes_list, graph_list = get_graph(dataframe1)
    nodes_list2, graph_list2 = get_graph(dataframe2)

    # Nodes
    G = nx.Graph()
    for i in nodes_list2:
        if i in nodes_list:
            G.add_node(i, color='purple', edge_color='black', font_family='arial')
        else:
            G.add_node(i, color='red')

    for i in nodes_list:
        if i not in nodes_list2:
            G.add_node(i, color='blue')


    # Make network
    pos=nx.spring_layout(G, scale=2000)
    nt = Network('1000px', '1800px', bgcolor='#ffffff')
    nt.from_nx(G)
    nt.toggle_physics(True)

    nt.repulsion(
            node_distance=400,
            central_gravity=0.33,
            spring_length=110,
            spring_strength=0.10,
            damping=0.95
            )

    # Edges
    # Make new tuples for comparison
    graph_list_no_weight = [(a, b) for a, b, c in graph_list]
    graph_list2_no_weight = [(a, b) for a, b, c in graph_list2]


    # Colours for edges, based on weight
    blue = list((Color("white")).range_to(Color("blue"),10))
    purple = list((Color("white")).range_to(Color("purple"),10))
    red = list((Color("white")).range_to(Color("red"),7))

    combined_graph_list = []
    for index, i in reversed(list(enumerate(graph_list_no_weight))):
        # Intersect
        if i in graph_list2_no_weight:
            combined_graph_list.append([i[0], i[1], graph_list[index][2], 'purple'])
        # Only for graph 1
        else:
            combined_graph_list.append([i[0], i[1], graph_list[index][2], 'blue'])

    for index, i in reversed(list(enumerate(graph_list2_no_weight))):
        # Only for graph 2
        if i not in graph_list_no_weight:
            combined_graph_list.append([i[0], i[1], graph_list2[index][2], 'red'])

    # Sort list on weight, as lightest colour needs to be plotted first
    combined_graph_list.sort(key = lambda x: x[2])
    for i in combined_graph_list:
        nt.add_edge(i[0], i[1], value=i[2], color=i[3])

    #nt.show_buttons(filter_=['physics', 'nodes', 'edges'])
    nt.show_buttons(filter_=['physics'])
    nt.show('output/'+filename)

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

DT_data_type = remove_empty_columns(DT_data.iloc[:, misc:misc+data_type_amount])
ecosystem_data_type = remove_empty_columns(ecosystem_data.iloc[:, misc:misc+data_type_amount])

DT_visualization_technique = remove_empty_columns(DT_data.iloc[:, misc+data_type_amount:misc+data_type_amount+visualization_technique_amount ])
ecosystem_visualization_technique = remove_empty_columns(ecosystem_data.iloc[:, misc+data_type_amount:misc+data_type_amount+visualization_technique_amount ])

DT_visualization_tool = remove_empty_columns(DT_data.iloc[:, misc+data_type_amount+visualization_technique_amount:misc+data_type_amount+visualization_technique_amount+visualization_tool_amount])
ecosystem_visualization_tool = remove_empty_columns(ecosystem_data.iloc[:, misc+data_type_amount+visualization_technique_amount:misc+data_type_amount+visualization_technique_amount+visualization_tool_amount])

DT_medium= remove_empty_columns(DT_data.iloc[:, misc+data_type_amount+visualization_technique_amount+visualization_tool_amount:
                                           misc+data_type_amount+visualization_technique_amount+visualization_tool_amount+medium_amount])
ecosystem_medium= remove_empty_columns(ecosystem_data.iloc[:, misc+data_type_amount+visualization_technique_amount+visualization_tool_amount:
                                           misc+data_type_amount+visualization_technique_amount+visualization_tool_amount+medium_amount])

# Save html files in the same directory as our program
os.chdir("../results_code")
create_circular_graph(DT_data_type, ecosystem_data_type, 'data_type.html')
create_circular_graph(DT_visualization_technique, ecosystem_visualization_technique, 'visualization_technique.html')
create_circular_graph(DT_visualization_tool, ecosystem_visualization_tool, 'visualization_tool.html')
create_circular_graph(DT_medium, ecosystem_medium, 'medium.html')
