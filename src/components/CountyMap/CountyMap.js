import React, {Component} from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import _ from 'lodash';

import County from './County';

class CountyMap extends Component {
  constructor(props) {
    super(props);
    this.projection = d3.geoAlbersUsa().scale(1200);
    this.geoPath = d3.geoPath().projection(this.projection);
    this.quantize = d3.scaleQuantize().range(d3.range(9));
    this.updateD3(props);
  }
  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.projection
      .translate([props.width / 2, props.height / 2])
      .scale(props.width * 1.3);
    if (props.values) {
      this.quantize.domain([
        d3.quantile(props.values, 0.15, d => d.value),
        d3.quantile(props.values, 0.85, d => d.value),
      ]);
    }
  }

  render() {
    if (!this.props.usTopoJson) {
      return null;
    }
    const us = this.props.usTopoJson,
      statesMesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b),
      counties = topojson.feature(us, us.objects.counties).features;

    //[{countyID : 1231, value: 1}, {countyID : 1234, value: 2}] => [[1231, 1], [1234, 2]] => [{1231: 1}, {1234: 2}]
    const countyValueMap = _.fromPairs(
      this.props.values.map(d => [d.countyID, d.value])
    );

    return (
      <g transform={`translate(${this.props.x}, ${this.props.y})`}>
        {counties.map(feature => (
          <County
            geoPath={this.geoPath}
            feature={feature}
            zoom={null}
            key={feature.id}
            quantize={this.quantize}
            value={countyValueMap[feature.id]}
          />
        ))}
        <path
          d={this.geoPath(statesMesh)}
          style={{
            fill: 'none',
            stroke: '#fff',
            strokeLinejoin: 'round',
          }}
        />
      </g>
    );
  }
}

export default CountyMap;
