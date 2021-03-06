// importing d3 modules
import {select} from "d3-selection";
import {geoMercator,geoPath,path} from "d3-geo";
import {dispatch} from "d3-dispatch";

// importing texture module

// importing modules
import Legend from './Legend';

// instantiating modules
const legend = Legend();

// importing stylesheets

// importing utitily functions
import {statusDict} from '../utils/utils';

// defining global variables

// defining Factory function
function MapProjection(data) {

    // create getter-setter variables in factory scope
    let _margin = {t:0, r:0, b:0, l:0};
    let _isMobile = false;

    const dispatcher = dispatch(
        'tooltip:toggle',
        'tooltip:untoggle',
        'node:add:stroke',
        'node:remove:stroke',
        'node:reappend'
    );

    function exports(data) {

        // data transformation

        // selecting root element ==> chart container, div where function is called in index.js
        const root = this;
        const container = select(root);

        // declaring setup/layout variables
        const clientWidth = root.clientWidth;
        const clientHeight = root.clientHeight;
        const margin = _margin;
        const w = clientWidth - (margin.r + margin.l);
        const h = clientHeight - (margin.t + margin.b);

        // setting up geo projection
        const mapProjection = geoMercator()
            .scale(10000)
            .center([-72.6037393,43.85141865])
            .translate([w/2,h/2]);

        if (_isMobile || w < 500) {
            mapProjection.scale(7000)
                .center([-72.2037393,43.85141865])
                .translate([w/2,h/2]);
        }

        const path = geoPath()
            .projection(mapProjection);

        // setting up scales

        // appending svg to node
        // enter, exit, update pattern
        // update selection
        let svgUpdate = container.selectAll('.svg-map')
            .data([data]);
        // update selection
        const svgEnter = svgUpdate.enter()
            .append('svg')
            .classed('svg-map', true);
        // exit selection
        svgUpdate.exit().remove();
        // enter + update
        svgUpdate = svgUpdate.merge(svgEnter)
            .attr('width', clientWidth)
            .attr('height', clientHeight);

        // appending <g>s to SVG
        let plotUpdate = svgUpdate.selectAll('.plot')
            .data(d => [d]);
        const plotEnter = plotUpdate.enter()
            .append('g')
            .classed('plot',true);
        plotUpdate.exit().remove();
        plotUpdate = plotUpdate.merge(plotEnter)
            .attr('transform',`translate(${margin.l},${margin.t})`);

        // passing textures dictionary to legend function
        const legendX = _isMobile ? 165 : 2*w/3;

        let legendUpdate = svgUpdate.selectAll('.legend')
            .data([statusDict]);
        const legendEnter = legendUpdate.enter()
            .append('g')
            .classed('plot',true);
        legendUpdate.exit().remove();
        legendUpdate = legendUpdate.merge(legendEnter)
            .attr('transform',`translate(${legendX},${h-100})`)
                .each(legend);

        let mapUpdate = plotUpdate.selectAll('.map-tile')
            .data(d => d);
        const mapEnter = mapUpdate.enter()
            .append('g')
            .classed('map-tile',true);
        mapUpdate.exit().remove();
        mapUpdate = mapUpdate.merge(mapEnter);

        let mapNodesUpdate = mapUpdate.selectAll('.map-node')
            .data(d => [d]);
        const mapNodesEnter = mapNodesUpdate.enter()
            .append('g')
            .classed('map-node',true);
        mapNodesUpdate.exit().remove();
        mapNodesUpdate = mapNodesUpdate.merge(mapNodesEnter);

        let mapPathUpdate = mapNodesUpdate.selectAll('.map-path')
            .data(d => d.features);
        const mapPathEnter = mapPathUpdate.enter()
            .append('path')
            .attr('class', d => 'class')
            .classed('map-path',true);
        mapPathUpdate.exit().remove();
        mapPathUpdate = mapPathUpdate.merge(mapPathEnter)
            .attr('d', d => {
                return path(d);
            })
            .style('stroke', 'gainsboro')
            .style('stroke-width', d => {
                const color = d.properties.hasOwnProperty('TOWNNAME') ?
                0 :
                0.25;
                return color;
            })
            .style('fill',d => {
                const color = d.properties.hasOwnProperty('TOWNNAME') ? 'gainsboro' :
                d.properties.status === 'selected' ? '#9acd32' : '#ffa500';

                return color;
            })
            .style('pointer-events',d => {
                const events = d.properties.hasOwnProperty('TOWNNAME') ?
                'none' :
                'all';
                return events;
            })
            .on('mouseenter',function(d) {
                dispatcher.call('node:add:stroke',this,null);
                dispatcher.call('node:reappend',this,null);
                dispatcher.call('tooltip:toggle',this,d.properties);

            })
            .on('mouseleave',function(d) {
                dispatcher.call('node:remove:stroke',this,null);
                dispatcher.call('tooltip:untoggle',this,null);

            });



    }

    // create getter-setter pattern for customization
    exports.margin = function(_) {
            // _ expects a json object {t:,r:,b:,l:}
            if (_ === 'undefined') return _margin;
            _margin = _;
            return this;
    };

    exports.minDate = function(_) {
        // is a date object
        if (_ === 'undefined') return _minDate;
        _minDate = _;
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
export default MapProjection;
