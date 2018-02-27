import React, {Component} from 'react';
import _ from 'lodash';

import ControlRow from './ControlRow';

class Controls extends Component {
  state = {yearFilter: () => true, year: '*'};

  updateYearFilter(year, reset) {
    let filter = d => d.submit_date.getFullYear() === year;

    if (reset || !year) {
      filter = () => true;
      year = '*';
    }

    this.setState({yearFilter: filter, year});
  }

  componentDidUpdate() {
    this.reportUpdateUpTheChain();
  }

  reportUpdateUpTheChain() {}

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(this.state, nextState);
  }

  render() {}
}
