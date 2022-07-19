import React from 'react';
import {PanelProps} from '@grafana/data';
import {SimpleOptions} from 'types';
import {css, cx} from 'emotion';
import {stylesFactory, useTheme} from '@grafana/ui';
import {Phasor} from "./phasor";
import {PhasorDiagram} from "./diagram";

interface Props extends PanelProps<SimpleOptions> {
}

export const SimplePanel: React.FC<Props> = ({options, data, width, height}) => {
    const theme = useTheme();
    const styles = getStyles();

    const svg = (<svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
    >
    </svg>)


    const p = new PhasorDiagram(svg)

    return (
        <div
            className={cx(
                styles.wrapper,
                css`
                  width: ${width}px;
                  height: ${height}px;
                `
            )}
        >

            ${svg}

        </div>
    );
};

const getStyles = stylesFactory(() => {
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
          padding: 10px;
        `,
    };
});
