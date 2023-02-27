import React, { useRef, useEffect } from 'react';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import './Graph.css';

const Graph = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const nodes = new DataSet([
            { id: 1, label: 'Node 1' },
            { id: 2, label: 'Node 2' },
            { id: 3, label: 'Node 3' },
            { id: 4, label: 'Node 4' },
            { id: 5, label: 'Node 5' },
        ]);

        const edges = new DataSet([
            { from: 1, to: 2 },
            { from: 1, to: 3 },
            { from: 2, to: 4 },
            { from: 3, to: 4 },
            { from: 4, to: 5 },
        ]);

        const data = {
            nodes: nodes,
            edges: edges,
        };

        const options = {
        };

        const network = new Network(containerRef.current, data, options);
    }, []);

    return <div id="graph-container" ref={containerRef} />;
};

export default Graph;
