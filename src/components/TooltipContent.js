// importing d3 modules
import {select} from 'd3-selection';

// importing util functions
import {statusDict} from '../utils/utils';

// importing components
import Table from './Table';

// instantiating components
const table = Table();


function TooltipContent() {

    function exports(data) {

        // access to root elements
        const root = this;
        const container = select(this);

        // data transformation

        // append tooltip
        let tooltipTitleUpdate = container.selectAll('.tooltip-text')
            .data([data]);
        const tooltipTitleEnter = tooltipTitleUpdate.enter()
            .append('div')
            .classed('tooltip-text',true);
        tooltipTitleUpdate.exit().remove();
        tooltipTitleUpdate = tooltipTitleUpdate.merge(tooltipTitleEnter)
            .html(d => `
                <p>Census tract <strong>${d['tract-nb']}</strong></p>
                <p><span class="small-span">${d.municipality}</span><span class='small-span faded'> - ${d.county} county</span></p>
                <p><span class='badge badge-${d.status.split(' ').join('-')}'>${statusDict[d.status].toUpperCase()}</span></p>
                `
            );

        let tooltipTableUpdate = container.selectAll('.tooltip-table')
            .data([data]);
        const tooltipTableEnter = tooltipTableUpdate.enter()
            .append('div')
            .classed('tooltip-table',true);
        tooltipTableUpdate.exit().remove();
        tooltipTableUpdate = tooltipTableUpdate.merge(tooltipTableEnter)
            .each(table);

    }

    return exports;
}

export default TooltipContent;
