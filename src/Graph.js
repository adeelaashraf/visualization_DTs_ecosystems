import React, { useRef, useEffect } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import 'vis-network/styles/vis-network.css';
import './Graph.css';

const Graph = () => {

    const containerRef = useRef(null);
    const nodes = new DataSet([{ "color": "blue", "shape": "triangle", "size": 10, "id": "Historical Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Process Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Simulation Data" }, { "color": "blue", "shape": "triangle", "size": 10, "id": "Metadata" }, { "color": "purple", "shape": "triangle", "size": 10, "id": "Geometric Data" }, { "color": "purple", "shape": "triangle", "size": 10, "id": "Sensor data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Landscape data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Biotic data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Abiotic Data" }, { "color": "red", "shape": "triangle", "size": 10, "id": "Behavioural Data" }, { "color": "blue", "shape": "square", "size": 10, "id": "Augmented Reality" }, { "color": "blue", "shape": "square", "size": 10, "id": "Data Visualization" }, { "color": "purple", "shape": "square", "size": 10, "id": "3D Geometric Modeling" }, { "color": "purple", "shape": "square", "size": 10, "id": "Dashboard Visualization" }, { "color": "purple", "shape": "square", "size": 10, "id": "Virtual Reality" }, { "color": "red", "shape": "square", "size": 10, "id": "Diel Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Radar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Histogram" }, { "color": "red", "shape": "square", "size": 10, "id": "Rose Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Sammon Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Bar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Line Graph" }, { "color": "red", "shape": "square", "size": 10, "id": "Raster Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Heat Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Bathymetrical Map" }, { "color": "red", "shape": "square", "size": 10, "id": "Pie Chart" }, { "color": "red", "shape": "square", "size": 10, "id": "Box Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Stacked Bar Plot" }, { "color": "red", "shape": "square", "size": 10, "id": "Network Graph" }, { "color": "red", "shape": "square", "size": 10, "id": "Block Chart" }, { "color": "red", "shape": "square", "size": 10, "id": "Diagram" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Grafana" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Verge3D" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Bootstrap" }, { "color": "blue", "shape": "dot", "size": 10, "id": "WebXR" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Autodesk Revit" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Autodesk Forge" }, { "color": "blue", "shape": "dot", "size": 10, "id": "OpenScene Graph" }, { "color": "blue", "shape": "dot", "size": 10, "id": "COVISE" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Three.js" }, { "color": "blue", "shape": "dot", "size": 10, "id": "WebGL" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Creo" }, { "color": "blue", "shape": "dot", "size": 10, "id": "Wikitude" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Unity3D" }, { "color": "red", "shape": "dot", "size": 10, "id": "Blender" }, { "color": "purple", "shape": "dot", "size": 10, "id": "JQuery" }, { "color": "red", "shape": "dot", "size": 10, "id": "jsPanel" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Unreal Engine" }, { "color": "purple", "shape": "dot", "size": 10, "id": "Javascript" }, { "color": "red", "shape": "dot", "size": 10, "id": "Backbone" }, { "color": "red", "shape": "dot", "size": 10, "id": ".NET" }, { "color": "red", "shape": "dot", "size": 10, "id": "D3.js" }, { "color": "red", "shape": "dot", "size": 10, "id": "R" }, { "color": "red", "shape": "dot", "size": 10, "id": "Python" }, { "color": "red", "shape": "dot", "size": 10, "id": "Jupyter Notebook" }, { "color": "red", "shape": "dot", "size": 10, "id": "CityEngine" }, { "color": "red", "shape": "dot", "size": 10, "id": "ARCGIS" }]);
    // Note: Make sure that conversion from JSON is compatible
    const edges = new DataSet([{ "color": "blue", "width": 3, "from": "Historical Data", "to": "Augmented Reality" }, { "color": "blue", "width": 5, "from": "Historical Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 3, "from": "Historical Data", "to": "Virtual Reality" }, { "color": "blue", "width": 1, "from": "Historical Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Augmented Reality" }, { "color": "blue", "width": 4, "from": "Process Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Dashboard Visualization" }, { "color": "blue", "width": 4, "from": "Process Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 3, "from": "Process Data", "to": "Virtual Reality" }, { "color": "blue", "width": 8, "from": "Simulation Data", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 7, "from": "Simulation Data", "to": "Virtual Reality" }, { "color": "blue", "width": 2, "from": "Simulation Data", "to": "Data Visualization" }, { "color": "blue", "width": 3, "from": "Simulation Data", "to": "Augmented Reality" }, { "color": "blue", "width": 1, "from": "Simulation Data", "to": "Dashboard Visualization" }, { "color": "blue", "width": 1, "from": "Metadata", "to": "Augmented Reality" }, { "color": "blue", "width": 2, "from": "Metadata", "to": "3D Geometric Modeling" }, { "color": "blue", "width": 1, "from": "Metadata", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Geometric Data", "to": "Augmented Reality" }, { "color": "purple", "width": 17, "from": "Geometric Data", "to": "3D Geometric Modeling" }, { "color": "purple", "width": 10, "from": "Geometric Data", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Sensor data", "to": "Augmented Reality" }, { "color": "purple", "width": 10, "from": "Sensor data", "to": "3D Geometric Modeling" }, { "color": "purple", "width": 6, "from": "Sensor data", "to": "Dashboard Visualization" }, { "color": "purple", "width": 6, "from": "Sensor data", "to": "Virtual Reality" }, { "color": "blue", "width": 5, "from": "Sensor data", "to": "Data Visualization" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Raster Map" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Sensor data", "to": "Bathymetrical Map" }, { "color": "red", "width": 4, "from": "Landscape data", "to": "3D Geometric Modeling" }, { "color": "red", "width": 2, "from": "Landscape data", "to": "Virtual Reality" }, { "color": "red", "width": 2, "from": "Landscape data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Box Plot" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Raster Map" }, { "color": "red", "width": 1, "from": "Landscape data", "to": "Bathymetrical Map" }, { "color": "red", "width": 2, "from": "Biotic data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Stacked Bar Plot" }, { "color": "red", "width": 3, "from": "Biotic data", "to": "Network Graph" }, { "color": "red", "width": 2, "from": "Biotic data", "to": "Box Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Diel Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Radar Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Histogram" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Rose Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Sammon Map" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Bar Plot" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Line Graph" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "3D Geometric Modeling" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Dashboard Visualization" }, { "color": "red", "width": 1, "from": "Biotic data", "to": "Pie Chart" }, { "color": "red", "width": 1, "from": "Abiotic Data", "to": "Block Chart" }, { "color": "red", "width": 1, "from": "Abiotic Data", "to": "Diagram" }, { "color": "red", "width": 1, "from": "Behavioural Data", "to": "Heat Map" }, { "color": "red", "width": 1, "from": "Behavioural Data", "to": "Box Plot" }, { "color": "blue", "width": 6, "from": "Augmented Reality", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Augmented Reality", "to": "Wikitude" }, { "color": "blue", "width": 1, "from": "Augmented Reality", "to": "Creo" }, { "color": "blue", "width": 6, "from": "Data Visualization", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Verge3D" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "JQuery" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Bootstrap" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "WebXR" }, { "color": "blue", "width": 1, "from": "Data Visualization", "to": "Creo" }, { "color": "purple", "width": 10, "from": "3D Geometric Modeling", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Verge3D" }, { "color": "purple", "width": 3, "from": "3D Geometric Modeling", "to": "JQuery" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Bootstrap" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "WebXR" }, { "color": "purple", "width": 2, "from": "3D Geometric Modeling", "to": "Unreal Engine" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Autodesk Revit" }, { "color": "blue", "width": 2, "from": "3D Geometric Modeling", "to": "Autodesk Forge" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "OpenScene Graph" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "COVISE" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Wikitude" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Three.js" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "WebGL" }, { "color": "blue", "width": 1, "from": "3D Geometric Modeling", "to": "Creo" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "CityEngine" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "jsPanel" }, { "color": "purple", "width": 1, "from": "3D Geometric Modeling", "to": "Javascript" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "Backbone" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "3D Geometric Modeling", "to": "Blender" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Grafana" }, { "color": "purple", "width": 3, "from": "Dashboard Visualization", "to": "Unity3D" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Autodesk Revit" }, { "color": "blue", "width": 2, "from": "Dashboard Visualization", "to": "Autodesk Forge" }, { "color": "purple", "width": 1, "from": "Dashboard Visualization", "to": "Javascript" }, { "color": "blue", "width": 1, "from": "Dashboard Visualization", "to": "Creo" }, { "color": "red", "width": 1, "from": "Dashboard Visualization", "to": ".NET" }, { "color": "purple", "width": 8, "from": "Virtual Reality", "to": "Unity3D" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "Verge3D" }, { "color": "purple", "width": 2, "from": "Virtual Reality", "to": "JQuery" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "Bootstrap" }, { "color": "blue", "width": 2, "from": "Virtual Reality", "to": "WebXR" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "OpenScene Graph" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "COVISE" }, { "color": "blue", "width": 1, "from": "Virtual Reality", "to": "Creo" }, { "color": "purple", "width": 1, "from": "Virtual Reality", "to": "Unreal Engine" }, { "color": "red", "width": 1, "from": "Virtual Reality", "to": "CityEngine" }, { "color": "red", "width": 1, "from": "Diel Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Radar Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Histogram", "to": "R" }, { "color": "red", "width": 1, "from": "Rose Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Sammon Map", "to": "R" }, { "color": "red", "width": 1, "from": "Bar Plot", "to": "Python" }, { "color": "red", "width": 1, "from": "Bar Plot", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Line Graph", "to": "Python" }, { "color": "red", "width": 1, "from": "Line Graph", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Raster Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "Python" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "R" }, { "color": "red", "width": 1, "from": "Heat Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Bathymetrical Map", "to": "ARCGIS" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "Javascript" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "D3.js" }, { "color": "red", "width": 1, "from": "Pie Chart", "to": "R" }, { "color": "red", "width": 2, "from": "Box Plot", "to": "R" }, { "color": "red", "width": 1, "from": "Stacked Bar Plot", "to": "Python" }, { "color": "red", "width": 1, "from": "Stacked Bar Plot", "to": "Jupyter Notebook" }, { "color": "red", "width": 2, "from": "Network Graph", "to": "Python" }, { "color": "red", "width": 2, "from": "Network Graph", "to": "Jupyter Notebook" }, { "color": "red", "width": 1, "from": "Network Graph", "to": "R" }, { "color": "red", "width": 1, "from": "Block Chart", "to": "R" }, { "color": "red", "width": 1, "from": "Diagram", "to": "R" }]);

    nodes.forEach((node) => {
        node.label = node.id.toString();
    });
    var x = window.innerWidth / 2 + 70;
    var y = window.innerHeight / 2 + 30;
    var step = 70;
    nodes.add({
        id: "Data Type",
        color: "black",
        shape: "triangle",
        x: x,
        y: y,
        label: "Data Type",
        size: 10,
        fixed: true,
        physics: false,
    });
    nodes.add({
        id: "Visualization Technique",
        color: "black",
        shape: "square",
        x: x,
        y: y + step,
        label: "Visualization Technique",
        size: 10,
        fixed: true,
        physics: false,
    });
    nodes.add({
        id: "Visualization Tool",
        color: "black",
        shape: "dot",
        x: x,
        y: y + (2 * step),
        label: "Visualization Tool",
        size: 10,
        fixed: true,
        physics: false,
    });
    nodes.add({
        id: "Appears in digital twin data",
        color: "blue",
        shape: "square",
        x: x,
        y: y + (3 * step),
        label: "Appears in digital twin data",
        size: 10,
        fixed: true,
        physics: false,
    });
    nodes.add({
        id: "Appears in ecosystem data",
        color: "red",
        shape: "square",
        x: x,
        y: y + (4 * step),
        label: "Appears in ecosystem data",
        size: 10,
        fixed: true,
        physics: false,
    });
    nodes.add({
        id: "Appears in digital and ecosystem data",
        color: "purple",
        shape: "square",
        x: x,
        y: y + (5 * step),
        label: "Appears in digital twin and ecosystem data",
        size: 10,
        fixed: true,
        physics: false,
    });
    useEffect(() => {
        
    const data = {
        nodes: nodes,
        edges: edges,
    };

    const options = {
        // Forceatlas settings: https://visjs.github.io/vis-network/docs/network/physics.html#
        nodeDistance: 400, //
        springStrength: 0.10, //
        centralGravity: 0.33, //
        springLength: 1100, //  
        damping: 0.95, //
        legend: {
            enabled: true,
            items: [
                {
                    id: "Data Type",
                    content: "Data Type",
                    color: "black",
                    shape: "triangle",
                    x: 100,
                    y: 100,
                },
                {
                    id: "Visualization Technique",
                    content: "Visualization Technique",
                    color: "black",
                    shape: "square"
                },
                {
                    id: "Visualization Tool",
                    content: "Visualization Tool",
                    color: "black",
                    shape: "circle"
                }
            ]
        },
    };

        const network = new Network(containerRef.current, data, options);
    }, []);

    return <div id="graph-container" ref={containerRef} />;
};

export default Graph;
