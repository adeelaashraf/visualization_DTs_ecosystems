from pickle import TRUE
from pyvis.network import Network
import networkx as nx
import os
from networkx.readwrite import json_graph
import json
import pandas as pd
from process_data import *

def add_nodes(json_nodes, assessment_data, dataframe, color, shape, size):
    dataframe_names = dataframe.columns.values

    for i in dataframe_names:
        temp_dict = {}
        temp_dict["id"] = i
        temp_dict["label"] = i
        temp_dict["color"] = color
        temp_dict["shape"] = shape
        temp_dict["size"] = size

        # Add title, and group if it exists
        if assessment_data['Node'].str.contains(i).bool:
            filtered_row = assessment_data[assessment_data['Node'].str.contains(i)]
            temp_dict["title"] = filtered_row.iloc[0,2]
            # Node has a group
            if not pd.isna(filtered_row.iloc[0,1]):
                temp_dict["cid"] = filtered_row.iloc[0,1]
        else: 
            raise Exception("Node in literature data does not in exist in assessment_data.")

        json_nodes.append(temp_dict)

    return json_nodes

def create_edges(edges, dataframe1, dataframe2):
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
                                # Check if the opposite edges exists. If so, skip.
                                edges[key] = {}
                                edges[key][value] = [1, 'black']

def create_edges_same_type(same_type_edges, dataframe, category):
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
            same_type_edges.append((key, key2, value2, category))

# Read data, remove any empty columns
data, data_type, visualization_technique, visualization_tool, medium = get_literature_data("classified")
assessment_data, assessment_data_type, assessment_visualization_technique, assessment_visualization_tool = get_assessment_data()
os.chdir("../src")

# Make JSON files to store the nodes, edges, and multiselect options for the React application
# Add nodes
json_nodes = []
add_nodes(json_nodes, assessment_data, data_type, "red", "triangle", 10)
add_nodes(json_nodes, assessment_data, visualization_technique, "blue", "square", 10)
add_nodes(json_nodes, assessment_data, visualization_tool, "purple", "dot", 10)


# Plot edges
# Data type -> Techinques -> Tools
# Nested dict used to define directed edges with weight and colour:
# {Node1 : {[Node2, weight, colour]}}
# Create dict
edges = {}
create_edges(edges, data_type, visualization_technique)
create_edges(edges, visualization_technique, visualization_tool)

same_type_edges =[]
# Add edges between nodes of the same category
create_edges_same_type(same_type_edges, data_type, "data_type")
create_edges_same_type(same_type_edges, visualization_technique, "visualization_technique")
create_edges_same_type(same_type_edges, visualization_tool, "visualization_tool")

json_edges = []
# Adds edges, weight, and colour
for key, value in edges.items():
    for key2, value2 in value.items():
        temp_dict = {}
        temp_dict["from"] = key
        temp_dict["to"] = key2
        temp_dict["color"] = 'grey'
        temp_dict["width"] = value2[0]
        temp_dict["inner_edges_type"] = "none"
        if value2[0] < 2:
            temp_dict["title"] = str(value2[0]) + " paper found"
        else:
            temp_dict["title"] = str(value2[0]) + " papers found"
        json_edges.append(temp_dict)

# Adds edges, weight, and colour
for i in same_type_edges:
    temp_dict = {}
    temp_dict["from"] = i[0]
    temp_dict["to"] = i[1]
    temp_dict["color"] = 'grey'
    temp_dict["width"] = i[2]
    temp_dict["dashes"] = 'true'
    temp_dict["inner_edges_type"] = i[3]
    temp_dict["hidden"] = "true"
    if i[2] < 2:
        temp_dict["title"] = str(i[2]) + " paper found"
    else:
        temp_dict["title"] = str(i[2]) + " papers found"
    json_edges.append(temp_dict)

def multiselect_nodes_no_grouping(df):
    json_dict = []
    keys_track = []
    for index, row in df.iterrows():
        # No grouping, add as is
        if pd.isna(row[1]):
            temp_dict = {}
            temp_dict["label"] = row[0]
            temp_dict["value"] = row[0]
            json_dict.append(temp_dict)
        # Grouping found, check if not already in list
        else:
            # Found
            if row[1] in keys_track:
                temp_dict = {}
                temp_dict["label"] = row[0]
                temp_dict["value"] = row[0]
                for i,d in enumerate(json_dict):
                    if d["label"] == row[1]:
                        json_dict[i]["options"].append(temp_dict)
                        break
            # Not found, make new entry
            else:
                keys_track.append(row[1])
                group_dict = {}
                group_dict["label"] = row[1]
                group_dict["options"] = []
                temp_dict = {}
                temp_dict["label"] = row[0]
                temp_dict["value"] = row[0]
                group_dict["options"].append(temp_dict)
                json_dict.append(group_dict)
    return(json_dict)

def multiselect_nodes_grouping(df):
    json_dict = []
    keys_track = []
    nan_category = "Other"
    for index, row in df.iterrows():
        # Nodes without groups go to the "Other" category
        if pd.isna(row[1]):
            # Found
            if nan_category in keys_track:
                temp_dict = {}
                temp_dict["label"] = row[0]
                temp_dict["value"] = row[0]
                for i,d in enumerate(json_dict):
                    if d["label"] == nan_category:
                        json_dict[i]["options"].append(temp_dict)
                        break
            # Not found, make new entry
            else:
                keys_track.append(nan_category)
                group_dict = {}
                group_dict["label"] = nan_category
                group_dict["options"] = []
                temp_dict = {}
                temp_dict["label"] = row[0]
                temp_dict["value"] = row[0]
                group_dict["options"].append(temp_dict)
                json_dict.append(group_dict)
        # Grouping found, check if not already in list
        else:
            # Found
            if row[1] in keys_track:
                temp_dict = {}
                temp_dict["label"] = row[0]
                temp_dict["value"] = row[0]
                for i,d in enumerate(json_dict):
                    if d["label"] == row[1]:
                        json_dict[i]["options"].append(temp_dict)
                        break
            # Not found, make new entry
            else:
                keys_track.append(row[1])
                group_dict = {}
                group_dict["label"] = row[1]
                group_dict["options"] = []
                temp_dict = {}
                temp_dict["label"] = row[0]
                temp_dict["value"] = row[0]
                group_dict["options"].append(temp_dict)
                json_dict.append(group_dict)
    return(json_dict)


# Convert data to JSON
json_total = {}
json_total["nodes"] = json_nodes
json_total["edges"] = json_edges
# For the multiselect nodes, make dictionaries to group per category
json_total["data_type"] = multiselect_nodes_no_grouping(assessment_data_type)
json_total["visualization_technique"] = multiselect_nodes_grouping(assessment_visualization_technique)
json_total["visualization_tool"] = multiselect_nodes_grouping(assessment_visualization_tool)
with open('data.json', 'w') as outfile1:
    outfile1.write(json.dumps(json_total, indent=4))

