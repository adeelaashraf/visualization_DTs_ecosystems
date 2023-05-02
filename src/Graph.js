import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import 'vis-network/styles/vis-network.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Graph.css';
import graph_data from "./data.json";

const Graph = ({selectedOptions, onChange2, toggleEdges, toggleCluster}) => {
    const [network, setNetwork] = useState(null);
    const containerRef = useRef(null);

    // Legend Nodes
    var x = window.innerWidth / 2 + 70;
    var y = window.innerHeight / 2 + 30;
    var step = 70;
    var legend_nodes = [{
        id: "Data Type",
        color: "red",
        shape: "triangle",
        x: x,
        y: y,
        label: "Data Type",
        size: 10,
        fixed: true,
    }, {
        id: "Visualization Technique",
        color: "blue",
        shape: "square",
        x: x,
        y: y + step,
        label: "Visualization Technique",
        size: 10,
        fixed: true,
    }, {
        id: "Visualization Tool",
        color: "purple",
        shape: "dot",
        x: x,
        y: y + (2 * step),
        label: "Visualization Tool",
        size: 10,
        fixed: true,
        }];

    var nodes = useMemo(() => (new DataSet([...legend_nodes])), []);
    var edges = useMemo(() => (new DataSet(graph_data.edges)), []);
    var legend_nodes2 = ["Data Type",
        "Visualization Technique",
        "Visualization Tool"];

    nodes.forEach((node) => {
        node.font = {
            face: "arial"
        };

    });

    edges.forEach((edge) => {
        edge.color = {
            color: 'grey',
            highlight: 'yellow',
            hover: 'yellow',
        }
    });

    const options = {
        "physics": {
            "forceAtlas2Based": {
                "springLength": 100
            },
            "minVelocity": 0.75,
            "solver": "forceAtlas2Based",
            stabilizations: false,
            timestep: 0.5,
            adaptiveTimestep: true
        },
        tooltips: {
            enabled: true,
        },
        interaction: {
            hover: true,
            navigationButtons: true,
            keyboard: true,
        },
        /*configure: {
            enabled: true,
            filter: 'physics',
            container: undefined,
            showButton: true
        }*/
    };

    useEffect(() => {
        const initial_network = containerRef.current && new Network(containerRef.current, { nodes, edges }, options);
        setNetwork(initial_network);
    }, []);

    useEffect(() => {
        if (network) {
            var new_nodes = [];
             graph_data.nodes.forEach((node) => {
                 if (selectedOptions.some(item => node.label === item.label)) {
                    new_nodes.push(node);
                    //node.hidden = false;
                } else {
                    //node.hidden = true;
                }
            });
            
            legend_nodes.forEach((node) => {
                if (legend_nodes2.some(item => node.label === item)) {
                    new_nodes.push(node);
                    //node.hidden = false;
                }
            });

            edges.forEach((edge) => {
                if (edge.inner_edges_type == toggleEdges[0]) {
                    edge.hidden = toggleEdges[1];
                }
            });
            nodes = new DataSet([...new_nodes]);
            network.setData({ nodes, edges });

            if (toggleCluster[0] == true) {
                var group = graph_data.visualization_technique_group;
                for (var i = 0; i < group.length; i++) {
                    var clusterOptionsByData = {
                        joinCondition: function (childOptions) {
                            return childOptions.cid == group[i];
                        },
                        clusterNodeProperties: {
                            "id": group[i],
                            "label": group[i],
                            "color": "blue",
                            "shape": "square",
                            "size": 30,
                            "title": group[i],
                        },
                    };
                    network.cluster(clusterOptionsByData);
                }
            }
            if (toggleCluster[1] == true) {
                var group = graph_data.visualization_tool_group;
                for (var i = 0; i < group.length; i++) {
                    var clusterOptionsByData = {
                        joinCondition: function (childOptions) {
                            return childOptions.cid == group[i];
                        },
                        clusterNodeProperties: {
                            "id": group[i],
                            "label": group[i],
                            "color": "purple",
                            "shape": "dot",
                            "size": 30,
                            "title": group[i],
                        },
                    };
                    network.cluster(clusterOptionsByData);
                }
            }
            network.fit()

            console.log(selectedOptions, selectedOptions.length)
            if (selectedOptions.length == 0) {
                document.getElementById("graph_empty_text").hidden = false;
            } else {
                document.getElementById("graph_empty_text").hidden = true;
            }
        }
    }, [selectedOptions, toggleEdges, toggleCluster]);

    if (network) {
        network.on('click', function (properties) {
            var ids;
            var clicked = null;
            if (properties.nodes.length != 0) {
                console.log('node!');
                ids = properties.nodes;

                // Legend nodes should not invoke onChange2 (Infobar.js functionality)
                if (!legend_nodes2.includes(ids[0])) {
                    clicked = nodes.get(ids);
                }
            } else if (properties.edges.length != 0) {
                console.log('edge!');
                ids = properties.edges;
                clicked = edges.get(ids);
            }

            if (clicked != null) {
                console.log('clicked:', clicked);
                onChange2(clicked);
            }
        });

        // Source: https://jsfiddle.net/repufsmc/
        network.on("stabilizationProgress", function (params) {
            var maxWidth = 496;
            var minWidth = 20;
            var widthFactor = params.iterations / params.total;
            var width = Math.max(minWidth, maxWidth * widthFactor);

            document.getElementById("bar").style.width = width + "px";
            document.getElementById("text").innerText =
                Math.round(widthFactor * 100) + "%";
        });
        network.on("stabilizationIterationsDone", function () {
            document.getElementById("text").innerText = "100%";
            document.getElementById("bar").style.width = "496px";
            document.getElementById("loadingBar").style.opacity = 0;
            // really clean the dom element
            setTimeout(function () {
                document.getElementById("loadingBar").style.display = "none";
            }, 300);
        });

    }
    return (<div>
        <div id="title">
            <p>Graph Overview of Visualization Techniques and Tools for Digital Twins of Ecosystems</p>
        </div>
        <div id="graph_empty_text">
            <p>The graph is empty. Please select options in 'Graph Options'.</p>
        </div>
        <div id="footer">
            <div id="footer_item">
                <Popup
                    trigger={<a href="#">About</a>}
                    modal
                >
                    {close => (
                        <div id="popup_content">
                            <h1 id="popup_text"> About
                            </h1>
                            {<p id="popup_text" >This web-based tool allows users to select visualization techniques and tools for digital twins of ecosystems.
                                <br></br>Data is based on academic papers and official websites of the relevant techniques and tools.
                                <br></br>Developed at the <a href="https://www.uva.nl/en">University of Amsterdam</a>.
                            </p>}
                            <br></br>
                            <button id="popup_button" onClick={close}>Close</button>
                        </div>
                    )}
                </Popup>
            </div>
            <div id="footer_item">
                <Popup
                trigger={<a href="#">Help</a>}
                modal
            >
                {close => (
                        <div id="popup_content">
                            <h1 id="popup_text"> Help
                            </h1>
                            {<p id="popup_text" >
                                Select options 'Graph Options' to construct a graph. 
                                <br></br> Use your mouse, keyboard, or the navigation buttons below to navigate the graph.
                                <br></br> Select a node or edge to see details 'Graph Data'.
                                <br></br> For further questions or contact, please <a href="mailto:adeela-97@hotmail.com">send an email</a>.

                            </p>}
                            <br></br>
                            <button id="popup_button" onClick={close}>Close</button>
                        </div>
                )}
                </Popup>
            </div>
            <div id="footer_item">
                <a href="https://adeelaashraf.github.io/visualization_DTs_ecosystems/data.xlsx" download>Full Dataset</a>
            </div>
        </div>
        <div id="graph-container" ref={containerRef} /><div />
        <div id="loadingBar">
            <div class="outerBorder">
                <div id="text">0%</div>
                <div id="border">
                    <div id="bar"></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Graph;

