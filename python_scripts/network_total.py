
from pyvis.network import Network
import networkx as nx
import os
from process_data import *

def add_nodes(G, dataframe, color, node_shape):
    dataframe_names = dataframe.columns.values

    for i in dataframe_names:
        G.add_node(i, color=color, shape=node_shape)

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
                        if key != value:
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

def create_edges_same_type(same_type_edges, dataframe):
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

    for key, value in graph_dict.items():
        for key2, value2 in value.items():
            same_type_edges.append((key, key2, value2))

data, data_type, visualization_technique, visualization_tool, medium = get_literature_data("classified")
os.chdir("output")
G = nx.Graph()

# Plot nodes
add_nodes(G, data_type, "red", "triangle")
add_nodes(G, visualization_technique, "blue", "square")
add_nodes(G, visualization_tool, "purple", "dot")
#add_nodes(G, medium, "green", "triangle")

# Plot edges
# Nested dict used to define directed edges with weight and colour:
# {Node1 : {[Node2, weight, colour]}}
# Create dict
edges = {}
# Data type -> Techinques -> Tools
insert_keys_and_weight(edges, data_type, visualization_technique)
insert_keys_and_weight(edges, visualization_technique, visualization_tool)

same_type_edges =[]
# Add edges between nodes of the same category
create_edges_same_type(same_type_edges, data_type)
create_edges_same_type(same_type_edges, visualization_technique)
create_edges_same_type(same_type_edges, visualization_tool)

# Adds edges, weight, and colour
for key, value in edges.items():
    for key2, value2 in value.items():
        final_color = 'grey'
        G.add_edge(key, key2, weight=value2[0], color=final_color)

# Adds edges, weight, and colour
for i in same_type_edges:
    G.add_edge(i[0], i[1], weight=i[2], color='grey')

pos=nx.spring_layout(G,scale=500)
nt = Network('1300px', '1800px', bgcolor='#ffffff')
nt.from_nx(G)

#nt.toggle_physics(True)
nt.force_atlas_2based()
#nt.show_buttons(filter_=['physics'])
nt.show('network_total.html')