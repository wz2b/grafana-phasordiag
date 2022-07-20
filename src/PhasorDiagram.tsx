import React from 'react';
import {PanelProps} from '@grafana/data';
import {PhasorDiagramOptions} from 'types';
import {useStyles2} from '@grafana/ui';
import {css, cx} from 'emotion';
import {translateToCenterTransform} from "./util";

interface Props extends PanelProps<PhasorDiagramOptions> {
}

export const PhasorDiagram: React.FC<Props> = ({options, data, width, height}) => {

    const phasorDiagramStyles = useStyles2(() => {
        return {
            wrapper: css`
              position: relative;
            `,
            svg: css`
              position: absolute;
              top: 0;
              left: 0;
            `,
            textBox: css`
              position: absolute;
              bottom: 0;
              left: 0;
              padding: 10px;`,

            minor: css`
              stroke: burlywood;
              stroke-width: 1px;
              stroke-dasharray: 2, 10;
              fill: none;`,

            major: css`
                stroke: white;
                stroke-width: 1px;
                stroke-dasharray: 3, 3;
                fill: none;`,

            border: css`
             stroke: white;
             stroke-width: 1px;
             fill: none;`
        };
    });

    const r = Math.min(width, height) / 2.0


    const major = Array.from({ length: options.major_gridlines},
        (x, i) => r * (i+1)/(options.major_gridlines))
    const minor = Array.from({ length: options.major_gridlines-1},
        (x, i) => r * (i+1.5)/(options.major_gridlines))

    return (
        <div className={cx(phasorDiagramStyles.wrapper)}>
            <svg width={width} height={height} className={phasorDiagramStyles.svg}>
                <g transform={translateToCenterTransform(height, width)}>
                    {major.map((v) => (
                        <circle key={`minor{$v}`} className={cx(phasorDiagramStyles.major)} cx={0} cy={0} r={v}></circle>
                    ))}

                    {minor.map((v) => (
                        <circle key={`minor{$v}`} className={cx(phasorDiagramStyles.minor)} cx={0} cy={0} r={v}></circle>
                    ))}
                    <circle key={`minor{$v}`} className={cx(phasorDiagramStyles.border)} cx={0} cy={0} r={r}></circle>


                </g>
            </svg>
        </div>
    );


}


