import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import 'vis-network/styles/vis-network.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Graph.css';
import graph_data from "./data.json";

const Graph = ({selectedItems, onChange2}) => {
    const [n, setN] = useState(null);
    const containerRef = useRef(null);
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
        //physics: false
    }, {
        id: "Visualization Technique",
        color: "blue",
        shape: "square",
        x: x,
        y: y + step,
        label: "Visualization Technique",
        size: 10,
        fixed: true,
        //physics: false,
    }, {
        id: "Visualization Tool",
        color: "purple",
        shape: "dot",
        x: x,
        y: y + (2 * step),
        label: "Visualization Tool",
        size: 10,
        fixed: true,
        //physics: false
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
        const network = containerRef.current && new Network(containerRef.current, {nodes, edges}, options);
        setN(network);
    }, []);

    useEffect(() => {
        if (n) {
            var new_nodes = [];
             graph_data.nodes.forEach((node) => {
                 if (selectedItems.some(item => node.label === item.label)) {
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

            //.forEach((edge) => {
            //    edge.hidden = false;
            //});
            nodes = new DataSet([...new_nodes]);
            n.setData({ nodes, edges });
            n.fit()

            console.log(selectedItems, selectedItems.length)
            if (selectedItems.length == 0) {
                document.getElementById("graph_empty_text").hidden = false;
            } else {
                document.getElementById("graph_empty_text").hidden = true;
            }
        }
    }, [selectedItems]);

    if (n) {
        n.on('click', function (properties) {
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
        n.on("stabilizationProgress", function (params) {
            var maxWidth = 496;
            var minWidth = 20;
            var widthFactor = params.iterations / params.total;
            var width = Math.max(minWidth, maxWidth * widthFactor);

            document.getElementById("bar").style.width = width + "px";
            document.getElementById("text").innerText =
                Math.round(widthFactor * 100) + "%";
        });
        n.on("stabilizationIterationsDone", function () {
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

