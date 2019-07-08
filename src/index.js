// importing d3 modules
import {select} from "d3-selection";
import {json} from "d3-fetch";

// importing util functions
import {isMobile} from "./utils/utils";

// importing CSS

// importing containers
import Main from './containers/Main';

// instantiating mobile check
const mobile = isMobile();

// instantiating containers
const main = Main()
    .isMobile(mobile);

// loading data
const towns = json('./data/vt-towns.json');
const oppo = json('./data/tracts.json');

// calling drawing function
Promise.all([towns,oppo]).then(([towns,oppo]) => {

    select('.d3-wrapper')
        .data([[towns,oppo]])
        .each(main);

});
