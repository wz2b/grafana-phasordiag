import React from 'react';
import {GrafanaTheme2, PanelProps} from '@grafana/data';
import {PhasorDiagramOptions} from 'types';
import {useStyles2, useTheme2} from '@grafana/ui';
import {css, cx} from 'emotion';
import u from "./util";
import {Scale} from "./scale";
import {Phasor} from "./phasor";

interface Props extends PanelProps<PhasorDiagramOptions> {
}

//
// see https://github.com/VolkovLabs/volkovlabs-echarts-panel/blob/main/src/components/EChartsPanel/EChartsPanel.tsx
// for an example of how to use useEffect
// to only render parts that need rendering
//
export const PhasorDiagram: React.FC<Props> = ({options, data, width, height}) => {
    const getColorByName = useTheme2().visualization.getColorByName

    const phasorDiagramStyles = useStyles2((theme: GrafanaTheme2) => {
        const getColorByName = theme.visualization.getColorByName

        return {
            wrapper: css({
                position: "relative"
            }),
            svg: css({
                position: "absolute",
                top: 0,
                left: 0
            }),
            textBox: css({
                position: "absolute",
                bottom: 0,
                left: 0,
                padding: "10px"
            }),
            minor: css({
                stroke: getColorByName(options.minor_grid_color),
                'stroke-width': `${options.minor_grid_color || 1.0}px`,
                'stroke-dasharray': "2, 10",
                fill: "none"
            }),
            major: css({
                stroke: getColorByName(options.major_grid_color),
                'stroke-width': `${options.major_grid_px || 1.0}`,
                'stroke-dasharray': "3, 3",
                fill: 'none'
            }),
            radial: css({
                stroke: getColorByName(options.radial_color),
                'stroke-width': `${options.radial_px || 2.5}px`,
                'stroke-dasharray': "5px, 5px"
            }),
            nominal_ring: css({
                stroke: getColorByName(options.nom_value_color),
                'stroke-width': `${options.nom_value_px || 1.0}px`,
                'stroke-dasharray': "2, 2",
                fill: "none"
            }),
            border: css({
                stroke: getColorByName(options.border_color),
                'stroke-width': `${options.border_px || 3.0}px`,
                fill: "none"
            }),
            paper: css({
                stroke: "none",
                fill: getColorByName(options.paper_color)
            }),
            VVector: css({
                'stroke-width': "2px",
                "&.phase-arrow-head": css({
                    fill: "inherit"
                })
            }),
            IVector: css({
                'stroke-width': "2px",
                'stroke-dasharray': "2, 1",
                "&.phase-arrow-head": css({
                    fill: "none"
                })
            })
        }
    });

    //
    // Calculate the radius of the circle, and leave room for the border so
    // that it does not get flattened out if the user choose it to be really thick
    //
    const r = (Math.min(width, height) / 2.0) - (options.border_px || 2.0)

    const scale = new Scale(r, options.max_volts)

    const major = u.linspace(0, options.max_volts, options.volts_grid)
    const minor = u.linspace(options.volts_subgrid, options.max_volts, options.volts_grid)

    const radials = u.linspace(0, 360, options.radial_spacing_deg || 30)

    const ia = new Phasor(phasorDiagramStyles.IVector, scale, getColorByName("purple"))
    const ib = new Phasor(phasorDiagramStyles.IVector, scale)
    const ic = new Phasor(phasorDiagramStyles.IVector, scale)
    const van = new Phasor(phasorDiagramStyles.VVector, scale, getColorByName(options.van_color))
    const vbn = new Phasor(phasorDiagramStyles.VVector, scale)
    const vcn = new Phasor(phasorDiagramStyles.VVector, scale)

    van.magnitude = 277;
    van.degrees = 0;

    vbn.magnitude = 277;
    vbn.degrees = 120;

    vcn.magnitude = 277;
    vcn.degrees = 240;

    ia.magnitude = 123;
    ia.degrees = 5;

    return (
        <div className={cx(phasorDiagramStyles.wrapper)}>
            <svg width={width} height={height} className={phasorDiagramStyles.svg}>
                <defs>
                    {ia.markerDef}
                    {ib.markerDef}
                    {ic.markerDef}
                    {van.markerDef}
                    {vbn.markerDef}
                    {vcn.markerDef}
                </defs>
                <g transform={u.translateToCenterTransform(height, width)}>
                    <circle key={`minor{$v}`} className={cx(phasorDiagramStyles.paper)} cx={0} cy={0} r={r}/>

                    {major.map((v) => (
                        <circle key={`minor{$v}`} className={cx(phasorDiagramStyles.major)}
                                cx={0}
                                cy={0}
                                r={scale.domainToRange(v)}/>
                    ))}

                    {minor.map((v) => (
                        <circle key={`minor{$v}`} className={cx(phasorDiagramStyles.minor)}
                                cx={0}
                                cy={0}
                                r={scale.domainToRange(v)}/>
                    ))}

                    {radials.map((v) => (
                        <line key={`radial${v}`} className={cx(phasorDiagramStyles.radial)}
                              x1={-r}
                              x2={r}
                              y1={0}
                              y2={0}
                              transform={`rotate(${v})`}
                        />

                    ))}

                    {options.nominal_volts !== 0 && <circle
                        className={cx(phasorDiagramStyles.nominal_ring)}
                        cx={0}
                        cy={0}
                        r={scale.domainToRange(options.nominal_volts)}/>
                    }

                    <circle key={`minor{$v}`} className={cx(phasorDiagramStyles.border)} cx={0} cy={0} r={r}/>

                    {ia.render()}
                    {ib.render()}
                    {ic.render()}
                    {van.render()}
                    {vbn.render()}
                    {vcn.render()}

                </g>
            </svg>
        </div>
    );
}


