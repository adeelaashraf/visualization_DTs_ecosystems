# Import librarie(s)
import pandas as pd

# For given split dataframe, remove any empty columns
def remove_empty_columns(dataframe):
    new_dataframe = dataframe.copy()
    for column in new_dataframe.columns:
        if dataframe[column].count() == 0:
            dataframe = dataframe.drop(column, axis=1)

    return dataframe

# Read data, remove any empty columns
data = (pd.read_excel('../data/data.xlsx')).dropna(how='all')

# Data is processed in two ways:
# 1. Compressed: Only consider rows which are numbered in the data, used for network_total.py and the React application
# 2. Classified: Consider rows which are not numbered, used for bar_plots.py and network_per_category.py

data_compressed = []
data_classified = []
data_copy = data.copy()

for index, row in data_copy.iterrows():
    # Compressed row
    if not pd.isna(row[0]):
        data_compressed.append(row)
    else:
        data_classified.append(row)


# Keep track in order to split dataframes
misc = 7
data_type_amount = 11
visualization_technique_amount = 19
visualization_tool_amount = 27
medium_amount = 8

def get_data(data_choice):
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