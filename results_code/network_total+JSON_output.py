
from pyvis.network import Network
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
import numpy as np
from colour import Color
import os
from networkx.readwrite import json_graph
import json


def remove_empty_columns(dataframe):
    new_dataframe = dataframe.copy()
    for column in new_dataframe.columns:
        if dataframe[column].count() == 0:
            dataframe = dataframe.drop(column, axis=1)

    return dataframe

def add_nodes(G, dataframe1, dataframe2, node_shape):
    dataframe_names1 = dataframe1.columns.values
    dataframe_names2 = dataframe2.columns.values

    for i in dataframe_names1:
        if i not in dataframe_names2:
            G.add_node(i, color='blue', shape=node_shape)

    for i in dataframe_names2:
        if i in dataframe_names1:
            G.add_node(i, color='purple', shape=node_shape)
        else:
            G.add_node(i, color='red', shape=node_shape)

    return G

def insert_keys_and_weight(edges, dataframe1, dataframe2):
    for (i, row1), (j, row2) in zip(dataframe1.iterrows(), dataframe2.iterrows()):
        # Search edges, one way
        for index_k, k in enumerate(row1):
            if k == 'x':
                for index_l, l in enumerate(row2):
                    if l == 'x':
                        # Found connection, add to dict
                        # if it doesn't exist yet, add
                        key = dataframe1.columns[index_k]
                        value = dataframe2.columns[index_l]
                        print(key, value)
                        # Check if key exists
                        if key in edges:
                            # Check if value exists
                            if value in edges[key]:
                                temp = edges[key][value]
                                temp2 = temp[0] +1
                                edges[key][value] = [temp2, 'black']
                            else:
                                edges[key][value] ={}
                                edges[key][value] = [1, 'black']
                        else:
                            # For now colour is black
                            edges[key] = {}
                            edges[key][value] = [1, 'black']
                        

    print(edges)

os.chdir("../data")

# For bar plots, we need to compressed data
# Read data, remove empty columns
data = (pd.read_excel('data_classified.xlsx')).dropna(how='all')

# Keep track of the amount of DUPLICATE (lightgreen row) papers so we can dynamically split the dataframe as needed
DTs_papers = 29
ecosystem_papers = 12


misc = 7
data_type_amount = 11
visualization_technique_amount = 6
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

G = nx.Graph()

# Plot nodes
add_nodes(G, DT_data_type, ecosystem_data_type, "triangle")
add_nodes(G, DT_visualization_technique, ecosystem_visualization_technique, "square")
add_nodes(G, DT_visualization_tool, ecosystem_visualization_tool, "dot")
#add_nodes(G, DT_medium, ecosystem_medium, "triangle")

# Plot edges
# Nested dict used to define directed edges with weight and colour:
# {Node1 : {[Node2, weight, colour]}}

# Create dict
edges = {}

# Data dimension -> Techinques -> Tools
insert_keys_and_weight(edges, DT_data_type, DT_visualization_technique)
insert_keys_and_weight(edges, DT_visualization_technique, DT_visualization_tool)

insert_keys_and_weight(edges, ecosystem_data_type, ecosystem_visualization_technique)
insert_keys_and_weight(edges, ecosystem_visualization_technique, ecosystem_visualization_tool)

# Adds edges, weight, and colour
for key, value in edges.items():
    for key2, value2 in value.items():
        final_color = 'black'
        color1 = G.nodes[key]['color']
        color2 = G.nodes[key2]['color']

        if (color1=='red' and (color2=='red' or color2=='purple')):
            final_color = 'red'
        elif (color1=='purple' and color2=='red'):
            final_color = 'red'

        elif (color1=='blue' and (color2=='blue' or color2=='purple')):
            final_color = 'blue'
        elif (color1=='purple' and color2=='blue'):
            final_color = 'blue'

        elif (color1=='purple' and color2=='purple'):
            final_color = 'purple'


        G.add_edge(key, key2, weight=value2[0], color=final_color)

pos=nx.spring_layout(G,scale=500)
nt = Network('1300px', '1800px', bgcolor='#ffffff')
nt.from_nx(G)

nt.toggle_physics(True)
nt.show_buttons(filter_=['physics'])
nt.show('output/network_total.html')

# JSON graph
with open('output/data.json', 'w') as outfile1:
    outfile1.write(json.dumps(json_graph.node_link_data(G)))

def multiselect_nodes(df1, df2):
    x = list(set(list(df1.columns.values) + list(df2.columns.values)))
    x.sort()
    print(x)

multiselect_nodes(DT_data_type, ecosystem_data_type)
multiselect_nodes(DT_visualization_technique, ecosystem_visualization_technique)
multiselect_nodes(DT_visualization_tool, ecosystem_visualization_tool)