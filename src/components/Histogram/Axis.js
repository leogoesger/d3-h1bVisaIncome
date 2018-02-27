import React, {Component} from 'react';
import * as d3 from 'd3';

const blackBox = D3render => {
  return class Blackbox extends Component {
    componentDidMount() {
      D3render.call(this);
    }
    componentDidUpdate() {
      D3render.call(this);
    }

    render() {
      const {x, y} = this.props;
      return <g transform={`translate(${x}, ${y})`} ref="anchor" />;
    }
  };
};

const Axis = blackBox(() => {
  const axis = d3
    .axisLeft()
    .tickFormat(d => `${d3.format('.2s')(d)}`)
    .scale(this.props.scale)
    .ticks(this.props.data.length);
  d3.select(this.refs.anchor).call(axis);
});

export default Axis;
