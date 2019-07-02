// importing d3 modules
import {select} from "d3-selection";

// importing texture module

// importing modules

// importing stylesheets

// importing utitily functions

// instantiating mobile check

// defining global variables

// defining Factory function
function Legend(data) {

    // create getter-setter variables in factory scope
    let _margin = {t:0, r:0, b:0, l:0};
    let _isMobile = false;
    let _textures = {};

    function exports(data) {

        // selecting root element ==> chart container, div where function is called in index.js
        const root = this;
        const container = select(root);

        // declaring setup/layout variables
        // const clientWidth = root.clientWidth;
        // const clientHeight = root.clientHeight;
        // const margin = _margin;
        // const w = clientWidth - (margin.r + margin.l);
        // const h = clientHeight - (margin.t + margin.b);

        // appending <g> to SVG
        let legendGroupUpdate = container.selectAll('.legend-group')
            .data(Object.keys(data));
        const legendGroupEnter = legendGroupUpdate.enter()
            .append('g')
            .classed('legend-group',true);
        legendGroupUpdate.exit().remove();
        legendGroupUpdate = legendGroupUpdate.merge(legendGroupEnter)
            .attr('transform',(d,i) => `translate(0,${i*30})`);

        let rectUpdate = legendGroupUpdate.selectAll('.legend-rect')
            .data(d => [d]);
        const rectEnter = rectUpdate.enter()
            .append('rect')
            .classed('legend-rect',true);
        rectUpdate.exit().remove();
        rectUpdate = rectUpdate.merge(rectEnter)
            .attr('width',15)
            .attr('height',15)
            .attr('fill',d => {
                return d === 'no contamination' ? 'gainsboro ': _textures[`${d} legend`].url();
            });

        let labelUpdate = legendGroupUpdate.selectAll('.legend-label')
            .data(d => [d]);
        const labelEnter = labelUpdate.enter()
            .append('text')
            .classed('legend-label',true);
        labelUpdate.exit().remove();
        labelUpdate = labelUpdate.merge(labelEnter)
            .attr('x',18)
            .attr('y',12)
            .text(d => data[d]);


        //
        // let mapNodesUpdate = mapUpdate.selectAll('.map-node')
        //     .data(d => [d]);
        // const mapNodesEnter = mapNodesUpdate.enter()
        //     .append('g')
        //     .classed('map-node',true);
        // mapNodesUpdate.exit().remove();
        // mapNodesUpdate = mapNodesUpdate.merge(mapNodesEnter);
        //
        // let mapPathUpdate = mapNodesUpdate.selectAll('.map-path')
        //     .data(d => d.features);
        // const mapPathEnter = mapPathUpdate.enter()
        //     .append('path')
        //     .attr('class', d => 'class')
        //     .classed('map-path',true);
        // mapPathUpdate.exit().remove();
        // mapPathUpdate = mapPathUpdate.merge(mapPathEnter)
        //     .style('stroke', 'gainsboro')
        //     .style('stroke-width', 0.25)
        //     .style('fill',d => {
        //         const town = d.properties.TOWNNAME.toLowerCase();
        //         if (contamination.includes(town)) {
        //             const type = datasetMap.get(town).type;
        //             return textures[type].url();
        //         }
        //         return 'gainsboro';
        //     })
        //     .style('pointer-events',d => {
        //         const town = d.properties.TOWNNAME.toLowerCase();
        //         if (!contamination.includes(town)) {
        //             return 'none';
        //         }
        //         return 'all';
        //     })
        //     .attr('d', d => {
        //         return path(d);
        //     })
        //     .on('mouseenter',function(d) {
        //         const town = d.properties.TOWNNAME.toLowerCase();
        //
        //         const tooltipData = dataset.filter(e => e.city.toLowerCase() === town);
        //
        //         dispatcher.call('node:add:stroke',this,null);
        //         dispatcher.call('node:reappend',this,null);
        //         dispatcher.call('tooltip:toggle',this,tooltipData);
        //     })
        //     .on('mouseleave',function(d) {
        //         dispatcher.call('node:remove:stroke',this,null);
        //         dispatcher.call('tooltip:untoggle',this,null);
        //
        //     });

    }

    // create getter-setter pattern for customization
    exports.margin = function(_) {
            // _ expects a json object {t:,r:,b:,l:}
            if (_ === 'undefined') return _margin;
            _margin = _;
            return this;
    };

    exports.textures = function(_) {
        // is a date object
        if (_ === 'undefined') return _textures;
        _textures = _;
        return this;
    };

    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.on = function(eventType,cb) {
        // eventType is a string representing a custom event
        // cb is a callback function
        dispatcher.on(eventType,cb);
        return this;
    };

    // returning of module
    return exports;
}

// exporting factory function as default
export default Legend;
