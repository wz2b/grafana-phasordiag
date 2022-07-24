import React from 'react';
import {DataFrame, GrafanaTheme2, PanelProps} from '@grafana/data';
import {PhasorDiagramOptions} from 'types';
import {useStyles2} from '@grafana/ui';
import {css, cx} from 'emotion';
import u from "./util";
import {Scale} from "./scale";
import {Phasor} from "./phasor";
import {MarkerDef} from "./markerDef";

interface Props extends PanelProps<PhasorDiagramOptions> {
}

//
// see https://github.com/VolkovLabs/volkovlabs-echarts-panel/blob/main/src/components/EChartsPanel/EChartsPanel.tsx
// for an example of how to use useEffect
// to only render parts that need rendering
//
export const PhasorDiagram: React.FC<Props> = ({options, data, width, height}) => {
    // const getColorByName = useTheme2().visualization.getColorByName

    const lastValue = (data: DataFrame, name: string) => {
        const values = data.fields.find((field) => field.name === name)?.values
        return values?.get(values.length - 1)
    }
    const van_mag = lastValue(data.series[0], options.van.field)
    const vbn_mag = lastValue(data.series[0], options.vbn.field)
    const vcn_mag = lastValue(data.series[0], options.vcn.field)

    const ia_mag = lastValue(data.series[0], options.ia.field)
    const ib_mag = lastValue(data.series[0], options.ib.field)
    const ic_mag = lastValue(data.series[0], options.ic.field)


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

    return (
        <div className={cx(phasorDiagramStyles.wrapper)}>
            <svg width={width} height={height} className={phasorDiagramStyles.svg}>
                <defs>
                    <MarkerDef id={"vm_Van"} color={options.van.color} fill={options.van.color} size={options.arrow_size}/>
                    <MarkerDef id={"vm_Vbn"} color={options.vbn.color} fill={options.vbn.color} size={options.arrow_size}/>
                    <MarkerDef id={"vm_Vcn"} color={options.vcn.color} fill={options.vcn.color} size={options.arrow_size}/>

                    <MarkerDef id={"vm_Ia"} color={options.ia.color} fill={"black"} size={options.arrow_size}/>
                    <MarkerDef id={"vm_Ib"} color={options.ib.color} fill={"black"} size={options.arrow_size}/>
                    <MarkerDef id={"vm_Ic"} color={options.ic.color} fill={"black"} size={options.arrow_size}/>
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

                    <Phasor markerId={"vm_Ia"} color={options.ia.color} magnitude={ia_mag} degrees={183} scale={scale}
                            strokeDasharray={"4,4"}/>
                    <Phasor markerId={"vm_Ib"} color={options.ib.color} magnitude={ib_mag} degrees={302} scale={scale}
                            strokeDasharray={"4,4"}/>
                    <Phasor markerId={"vm_Ic"} color={options.ic.color} magnitude={ic_mag} degrees={92} scale={scale}
                            strokeDasharray={"4,4"}/>

                    <Phasor markerId={"vm_Van"} color={options.van.color} magnitude={van_mag} degrees={5} scale={scale}/>
                    <Phasor markerId={"vm_Vbn"} color={options.vbn.color} magnitude={vbn_mag} degrees={122} scale={scale}/>
                    <Phasor markerId={"vm_Vcn"} color={options.vcn.color} magnitude={vcn_mag} degrees={272} scale={scale}/>

                </g>
            </svg>
        </div>
    );
}
