import React, {Component} from 'react';
import * as d3 from 'd3';

class MedianLine extends Component {
  constructor(props) {
    super(props);
    this.yScale = d3.scaleLinear();
    this.updateD3(props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
  }

  updateD3(props) {
    const domain = [0, d3.max(props.data, props.value)];
    this.yScale
      .domain(domain)
      .range([0, props.height - props.y - props.bottomMargin]);
  }

  render() {
    const median =
        this.props.median || d3.median(this.props.data, this.props.value),
      line = d3.line()([[0, 5], [this.props.width, 5]]);

    const translate = `translate(${this.props.x}, ${this.yScale(median)})`,
      medianLabel = `Median Household: $${this.yScale.tickFormat()(median)}`;

    return (
      <g className="mean" transform={translate}>
        <text x={this.props.width - 5} y="0" textAnchor="end">
          {medianLabel}
        </text>
        <path d={line} />
      </g>
    );
  }
}
export default MedianLine;
