// importing d3.js
import {select} from 'd3-selection';

// importing util functions
import {toProperCase,formatNumber} from '../utils/utils';

function Table(_) {

    const listColumns = ['Rate'];
    const listRows = ['unemployment', 'poverty'];
    let _sourceFooter = 'CHANGE TEXT HERE';
    let _isMobile = false;
    let _isFooter = false;
    let _index = 0;

    function exports(data) {

        // setting up containers
        const root = this;
        const container = select(root);

        // data transformation

        // appending title
        // appending table + table elements
        // ENTER + EXIT + UPDATE pattern
        let tableContainerUpdate = container.selectAll('.table-container')
            .data([1]);
        const tableContainerEnter = tableContainerUpdate.enter()
            .append('div')
            .classed('table-container',true);
        tableContainerUpdate.exit().remove();
        tableContainerUpdate = tableContainerUpdate.merge(tableContainerEnter);

        // table
        let tableUpdate = tableContainerUpdate.selectAll('.table')
            .data([1]);
        const tableEnter = tableUpdate.enter()
            .append('table')
            .classed('table',true)
            .classed('table-striped',true)
            .classed('table-sm',true);
        tableUpdate.exit().remove();
        tableUpdate = tableUpdate.merge(tableEnter);

        // thead
        let theadUpdate = tableUpdate.selectAll('thead')
            .data([data]);
        const theadEnter = theadUpdate.enter()
            .append('thead')
            .classed('table-header',true);
        theadUpdate.exit().remove();
        theadUpdate = theadUpdate.merge(theadEnter);
        
        // tr
        let rowHeaderUpdate = theadUpdate.selectAll('tr')
            .data([data]);
        const rowHeaderEnter = rowHeaderUpdate.enter()
            .append('tr')
            .classed('table-header-row',true);
        rowHeaderUpdate.exit().remove();
        rowHeaderUpdate = rowHeaderUpdate.merge(rowHeaderEnter);
        
        // th
        let thUpdate = rowHeaderUpdate.selectAll('th')
            .data(listColumns);
        const thEnter = thUpdate.enter()
            .append('th')
            .classed('table-header-cell',true);
        thUpdate.exit().remove();
        thUpdate = thUpdate.merge(thEnter)
            .attr('colspan',listRows.length)
            .text(d => d);

        // tbody
        let tbodyUpdate = tableUpdate.selectAll('tbody')
            .data([data]);
        const tbodyEnter = tbodyUpdate.enter()
            .append('tbody')
            .classed('table-body',true);
        tbodyUpdate.exit().remove();
        tbodyUpdate = tbodyUpdate.merge(tbodyEnter);

        // tr
        let rowBodyUpdate = tbodyUpdate.selectAll('tr')
            .data(listRows);
        const rowBodyEnter = rowBodyUpdate.enter()
            .append('tr')
            .classed('table-body-row',true);
        rowBodyUpdate.exit().remove();
        rowBodyUpdate = rowBodyUpdate.merge(rowBodyEnter);

        // td
        let tdUpdate = rowBodyUpdate.selectAll('td')
            .data(d => [`${d}`,data[`${d}-rate`]]);
        const tdEnter = tdUpdate.enter()
            .append('td')
            .classed('table-body-cell',true);
        tdUpdate.exit().remove();
        tdUpdate = tdUpdate.merge(tdEnter)
            .html(d => typeof(d) === 'number' ? formatNumber(d) : toProperCase(d));

        // if (_isFooter) {
        //     // tfoot
        //     let tfootUpdate = tableUpdate.selectAll('tfoot')
        //         .data([data]);
        //     const tfootEnter = tfootUpdate.enter()
        //         .append('tfoot')
        //         .classed('table-footer',true);
        //     tfootUpdate.exit().remove();
        //     tfootUpdate = tfootUpdate.merge(tfootEnter);

        //     // tr
        //     let rowFooterUpdate = tfootUpdate.selectAll('tr')
        //         .data([data]);
        //     const rowFooterEnter = rowFooterUpdate.enter()
        //         .append('tr')
        //         .classed('table-footer-row',true);
        //     rowFooterUpdate.exit().remove();
        //     rowFooterUpdate = rowFooterUpdate.merge(rowFooterEnter);

        //     // td
        //     let tdFooterUpdate = rowFooterUpdate.selectAll('th')
        //         .data([data]);
        //     const tdFooterEnter = tdFooterUpdate.enter()
        //         .append('th')
        //         .classed('table-footer-cell',true);
        //     tdFooterUpdate.exit().remove();
        //     tdFooterUpdate = tdFooterUpdate.merge(tdFooterEnter)
        //         .attr('colspan', listColumns.length)
        //         .style('text-align', 'right')
        //         .text(d => `Source: ${_source}`);
        // }

    }

    exports.isMobile = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isMobile;
        _isMobile = _;
        return this;
    };

    exports.showFooter = function(_) {
        // _ expects a boolean
        if (_ === 'undefined') return _isFooter;
        _isFooter = _;
        return this;
    };

    exports.sourceFooter =  function(_) {
        // _ expects a string
        if (_ === 'undefined') return _sourceFooter;
        _sourceFooter = _;
        return this;
    };

    exports.index = function(_) {
        // expects an integer
        if (_ === 'undefined') return _index;
        _index = _;
        return this;
    };

    return exports;
}

export default Table;
