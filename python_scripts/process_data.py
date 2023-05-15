# Import librarie(s)
from inspect import trace
import pandas as pd

# For given split dataframe, remove any empty columns
def remove_empty_columns(dataframe):
    new_dataframe = dataframe.copy()
    for column in new_dataframe.columns:
        if dataframe[column].count() == 0:
            dataframe = dataframe.drop(column, axis=1)

    return dataframe

def get_literature_data(data_choice):
    # Read data, remove any empty columns
    raw_data = (pd.read_excel('data.xlsx', 'literature')).dropna(how='all')

    # Data is processed in two ways:
    # 1. Compressed: Only consider rows which are numbered in the data, used for network_total.py and the React application
    # 2. Classified: Consider rows which are not numbered, used for bar_plots.py and network_per_category.py

    data_compressed = []
    data_classified = []
    data_copy = raw_data.copy()

    for index, row in data_copy.iterrows():
        # Compressed row
        if not pd.isna(row[0]):
            data_compressed.append(row)
        else:
            data_classified.append(row)

    data = []
    if data_choice == "compressed":
        data = pd.DataFrame(data_compressed)
    elif data_choice == "classified":
        data = pd.DataFrame(data_classified)

    data_type = remove_empty_columns(data.iloc[:, misc:misc+data_type_amount])
    visualization_technique = remove_empty_columns(data.iloc[:, misc+data_type_amount:misc+data_type_amount+visualization_technique_amount ])
    visualization_tool = remove_empty_columns(data.iloc[:, misc+data_type_amount+visualization_technique_amount:misc+data_type_amount+visualization_technique_amount+visualization_tool_amount])
    medium= remove_empty_columns(data.iloc[:, misc+data_type_amount+visualization_technique_amount+visualization_tool_amount:
                                               misc+data_type_amount+visualization_technique_amount+visualization_tool_amount+medium_amount])

    return remove_empty_columns(data), data_type, visualization_technique, visualization_tool, medium

def get_definition_data():
    data = (pd.read_excel('data.xlsx', 'definition')).dropna(how='all')
    data_type = data.iloc[0:data_type_amount, :]
    visualization_technique = data.iloc[data_type_amount:data_type_amount+visualization_technique_amount,:]
    visualization_tool = data.iloc[data_type_amount+visualization_technique_amount:data_type_amount+visualization_technique_amount+visualization_tool_amount,:]
    requirements_challenges = data.iloc[data_type_amount+
                                        visualization_technique_amount+
                                        visualization_tool_amount+
                                        medium_amount:data_type_amount+
                                        visualization_technique_amount+
                                        visualization_tool_amount+
                                        medium_amount+
                                        requirements_challenges_amount,:]
    assessment = data.iloc[data_type_amount+
                           visualization_technique_amount+
                           visualization_tool_amount+
                           medium_amount+
                           requirements_challenges_amount:data_type_amount+
                           visualization_technique_amount+
                           visualization_tool_amount+
                           medium_amount+
                           requirements_challenges_amount+
                           assessment_amount,:]


    return remove_empty_columns(data), data_type, visualization_technique, visualization_tool, requirements_challenges, assessment 

def get_assessment_data():
    # Read data, remove any empty columns
    data = (pd.read_excel('data.xlsx', 'assessment')).dropna(how='all')
    return data

# Keep track in order to split dataframes
track_data = (pd.read_excel('data.xlsx', 'track')).dropna(how='all')
misc = track_data.iloc[0, 1]
data_type_amount = track_data.iloc[1, 1]
visualization_technique_amount = track_data.iloc[2, 1]
visualization_tool_amount = track_data.iloc[3, 1]
medium_amount = track_data.iloc[4, 1]
requirements_challenges_amount = track_data.iloc[5, 1]
assessment_amount = track_data.iloc[6, 1]

