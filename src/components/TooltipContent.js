// importing d3 modules
import {select} from 'd3-selection';

// importing util functions
import {formatDecimals} from '../utils/utils';

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
                    <p><strong>${d.city}</strong> <span class='badge'>${d.county} county</span></p>
                    <p>First discovered: <strong>${d.discovery}</strong></p>
                `);

        let tooltipTableUpdate = container.selectAll('.tooltip-table')
            .data([data.items]);
        const tooltipTableEnter = tooltipTableUpdate.enter()
            .append('div')
            .classed('tooltip-table',true);
        tooltipTableUpdate.exit().remove();
        tooltipTableUpdate = tooltipTableUpdate.merge(tooltipTableEnter)
            .each(table);

        let tooltipCommentUpdate = container.selectAll('.tooltip-comment')
            .data([data]);
        const tooltipCommentEnter = tooltipCommentUpdate.enter()
            .append('div')
            .classed('tooltip-table',true);
        tooltipCommentUpdate.exit().remove();
        tooltipCommentUpdate = tooltipCommentUpdate.merge(tooltipCommentEnter)
            .html(d => `<p class="tooltip-comment">${d.comment}</p>`);

        //
        // // append tooltip
        // let tooltipDetailUpdate = container.selectAll('.tooltip-detail')
        //     .data([data]);
        // const tooltipDetailEnter = tooltipDetailUpdate.enter()
        //     .append('div')
        //     .classed('tooltip-detail',true);
        // tooltipDetailUpdate.exit().remove();
        // tooltipDetailUpdate = tooltipDetailUpdate.merge(tooltipDetailEnter)
        //     .html(d =>
        //         `<p><strong>Median household income:</strong> $${formatDecimals(+d["med-household-income"])}</p>
        //         <p><strong>Median property value:</strong> $${formatDecimals(+d["med-house-value"])}</p>
        //         <p><strong>Ratio:</strong> ${formatDecimals(+d["ratio"])}</p>`);

    }

    return exports;
}

export default TooltipContent;
