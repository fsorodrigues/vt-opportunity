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

        // data transformation

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
                const color = d === 'selected' ? '#9acd32' : '#ffa500';

                return color;
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
