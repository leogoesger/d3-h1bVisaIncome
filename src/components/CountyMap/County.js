import React, { Component } from 'react';
import _ from 'lodash';

const ChoroplethColors = _.reverse([
    'rgb(247,252,253)',
    'rgb(224,236,244)',
    'rgb(191,211,230)',
    'rgb(158,188,218)',
    'rgb(140,150,198)',
    'rgb(140,107,177)',
    'rgb(136,65,157)',
    'rgb(129,15,124)',
    'rgb(77,0,75)',
]);

const BlankColor = 'rgb(240,240,240)';

// Combine array of colors and quantize scale to pick fill color
// Return a <path> element
class County extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        const { zoom, value } = this.props;

        return zoom !== nextProps.zoom || value !== nextProps.value;
    }

    render() {
        const { value, geoPath, feature, quantize } = this.props;

        let color = BlankColor;

        if (value) {
            color = ChoroplethColors[quantize(value)];
        }

        return (
            <path
                d={geoPath(feature)}
                style={{ fill: color }}
                title={feature.id}
            />
        );
    }
}

export default County;
