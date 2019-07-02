// importing d3 modules
import {select,mouse} from "d3-selection";

// importing util functions
// import {} from "../utils/utils";

// importing CSS
import '../style/main.css';
import '../style/table.css';

// importing containers

// importing components
import MapProjection from '../components/MapProjection';
import Tooltip from '../components/Tooltip';

// instantiating components
const mapProjection = MapProjection();
const tooltip = Tooltip();

function Main(_) {

    let _margin = {t:0, r:0, b:0, l:0};
    let _isMobile = false;

    function exports(data) {

        // access to root elements
        const root = this;
        const container = select(root);

        // root element dimensions
        const clientWidth = root.clientWidth;
        const clientHeight = root.clientHeight;
        const margin = _margin;
        const w = clientWidth - (margin.r + margin.l);
        const h = clientHeight - (margin.t + margin.b);

        // // getting unique values
        // const filterData = data[_default];

        // passing down values to drawing function
        mapProjection.isMobile(_isMobile);
        tooltip.isMobile(_isMobile);

        // appending container for map projection
        let mapUpdate = container.selectAll('.map-container')
            .data([data]);
        const mapEnter = mapUpdate.enter()
            .append('div')
            .classed('map-container',true);
        mapUpdate.exit().remove();
        mapUpdate = mapUpdate.merge(mapEnter)
            .each(mapProjection);

        // appending tooltip container
        let tooltipContainerUpdate = container.selectAll('.tooltip-container')
            .data([1]);
        const tooltipContainerEnter = tooltipContainerUpdate.enter()
            .append('div')
            .classed('tooltip-container',true);
        tooltipContainerUpdate.exit().remove();
        tooltipContainerUpdate = tooltipContainerUpdate.merge(tooltipContainerEnter);

        // handling events
        mapProjection.on('node:add:stroke',function() {
            select(this).style('stroke', 'black')
                .style('stroke-width', 1.5);

        }).on('node:remove:stroke',function() {
            select(this).style('stroke', 'gainsboro')
                .style('stroke-width', 0.25);

        }).on('node:reappend',function() {
            this.parentNode.appendChild(this);

        }).on('tooltip:toggle',function(d) {
            tooltip.toggle(true)
                .eventNode(this);

            tooltipContainerUpdate.data([d])
                .each(tooltip);

        }).on('tooltip:untoggle',function(d) {
            tooltip.toggle(false);
            tooltipContainerUpdate.each(tooltip);

        });

    }

    // getter-setter functions
    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.margin = function(_) {
        // _ expects an object with t,r,b,l properties
        if (_ === 'undefined') return _margin;
        _margin = _;
        return this;
    };

    return exports;
};

export default Main;
