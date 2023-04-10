import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import 'vis-network/styles/vis-network.css';
import './Graph.css';
import graph_data from "./data.json";

const Graph = ({selectedItems, onChange2}) => {
    const [n, setN] = useState(null);
    const containerRef = useRef(null);
    var x = window.innerWidth / 2 + 70;
    var y = window.innerHeight / 2 + 30;
    var step = 70;
    const nodes = useMemo(() => (new DataSet([...graph_data.nodes, {
            id: "Data Type",
        color: "red",
        shape: "triangle",
        x: x,
        y: y,
        label: "Data Type",
        size: 10,
        fixed: true,
            physics: false,
        }, {
            id: "Visualization Technique",
            color: "blue",
            shape: "square",
            x: x,
            y: y + step,
            label: "Visualization Technique",
            size: 10,
            fixed: true,
        physics: false,
        background: 'red',
        }, {
            id: "Visualization Tool",
            color: "purple",
            shape: "dot",
            x: x,
            y: y + (2 * step),
            label: "Visualization Tool",
            size: 10,
            fixed: true,
            physics: false,
        } ])), []);
    const edges = useMemo(() => (new DataSet(graph_data.edges)), []);
    const legend_nodes2 = ["Data Type",
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
            "solver": "forceAtlas2Based"
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

    const data = {
        nodes: nodes,
        edges: edges,
    };

    useEffect(() => {
        const network = containerRef.current && new Network(containerRef.current, data , options);
        setN(network);
    }, []);

    useEffect(() => {
        if (n) {
            nodes.forEach((node) => {
                if (selectedItems.some(item => node.label === item.label)) {
                    node.hidden = false;
                } else {
                    node.hidden = true;
                }
            });

            nodes.forEach((node) => {
                if (legend_nodes2.some(item => node.label === item)) {
                    node.hidden = false;
                }
            });

            edges.forEach((edge) => {
                edge.hidden = false;
            });
            n.setData({ nodes, edges });

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

                // Legend nodes should not invoke onChange2 (Inforbar.js functionality)
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
        <div id="graph_empty_text">
            <p>The graph is empty. Please select options in 'Graph Options'.</p>
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

