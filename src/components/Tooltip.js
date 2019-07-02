// importing d3 modules
import {select,mouse} from 'd3-selection';
import {dispatch} from 'd3-dispatch';

// importing components
import TooltipContent from './TooltipContent';

// instantiating components
const tooltipcontent = TooltipContent();

// importing stylesheets

function Tooltip() {

    let _isMobile = false;
    let _eventNode;
    let _toggle = true;

    const dispatcher = dispatch('tooltip:untoggle');

    function exports(data) {

        // access to root elements
        const root = this;
        const container = select(this);

        // append tooltip container
        let tooltipUpdate = container.selectAll('.tooltip')
            .data([data]);
        const tooltipEnter = tooltipUpdate.enter()
            .append('div')
            .classed('tooltip',true);
        tooltipUpdate.exit().remove();
        tooltipUpdate = tooltipUpdate.merge(tooltipEnter);

        if (_isMobile & _toggle) {
            container.style('top',`${0}px`)
                .style('left',`${0}px`)
                .style('right','')
                .style('bottom','');

            let closeButtonUpdate = container.selectAll('.close-btn')
                .data([1]);
            const closeButtonEnter = closeButtonUpdate.enter()
                .append('div')
                .classed('close-btn',true);
            closeButtonUpdate.exit().remove();
            closeButtonUpdate = closeButtonUpdate.merge(closeButtonEnter)
                .on('click', (d) => {
                    dispatcher.call('tooltip:untoggle',null,null);
                });

            // remove intial transparency
            container.style("opacity",1);

        } else if (_toggle){

            // parent coordinates
            const parentNode = root.parentNode;
            const parentCoordinates = parentNode.getBoundingClientRect();
            const mouseCoordinates = _eventNode.getBoundingClientRect();

            const _offset = mouseCoordinates.width;

            // append tooltip container
            let tooltipUpdate = container.selectAll('.tooltip')
                .data([data]);
            const tooltipEnter = tooltipUpdate.enter()
                .append('div')
                .classed('tooltip',true);
            tooltipUpdate.exit().remove();
            tooltipUpdate = tooltipUpdate.merge(tooltipEnter)
                .each(tooltipcontent);

            // compute positions
            let vPos = mouseCoordinates.top - parentCoordinates.top;
            let hPos = mouseCoordinates.left - parentCoordinates.left;

            // handle vertical position
            if (vPos > 2*parentCoordinates.height/3) {
                vPos = parentCoordinates.bottom - mouseCoordinates.bottom;
                container.style('bottom',`${vPos}px`)
                    .style('top','');
            } else {
                container.style('top',`${vPos}px`)
                    .style('bottom','');
            }

            // handle horizontal position
            if (hPos > parentCoordinates.width/2) {
                hPos = parentCoordinates.right - mouseCoordinates.right;
                container.style('right',`${hPos + _offset}px`)
                    .style('left','');
            } else {
                container.style('left',`${hPos + _offset}px`)
                    .style('right','');
            }

            // remove intial transparency
            container.style("opacity",1);


        } else {
            container.style('top',`${-1000}px`)
                .style('left',`${-1000}px`)
                .style('right','')
                .style('bottom','');
        }

    }

    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.eventNode = function(_) {
        // _ expects a node
        if (_ === 'undefined') return _eventNode;
        _eventNode = _;
        return this;
    };

    exports.toggle = function(_) {
        // _ expects a json object
        if (_ === 'undefined') return _toggle;
        _toggle = _;
        return this;
    };

    exports.on = function(eventType,cb) {
        // eventType is a string representing a custom event
        // cb is a callback function
        dispatcher.on(eventType,cb);
        return this;
    };

    return exports;
}

export default Tooltip;
