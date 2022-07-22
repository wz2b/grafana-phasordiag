import {DataFrame, PanelPlugin} from '@grafana/data';
import {PhasorDiagramOptions} from './types';
import {PhasorDiagram} from './PhasorDiagram';

export const plugin = new PanelPlugin<PhasorDiagramOptions>(PhasorDiagram).setPanelOptions(builder => {
    return builder

        /* Scaling */
        .addNumberInput({category: ["Scaling"], defaultValue: 300, name: "Max. Volts", path: "max_volts"})
        .addNumberInput({category: ["Scaling"], defaultValue: 100, name: "Max. Amperes", path: "max_amps"})
        .addNumberInput({category: ["Scaling"], defaultValue: 100, name: "Major Grid (Volts)", path: "volts_grid"})
        .addNumberInput({category: ["Scaling"], defaultValue: 50, name: "Minor Grid (Volts)", path: "volts_subgrid"})

        /* Phase Voltages */
        .addFieldNamePicker({category: ["Phase Voltages"], defaultValue: "", name: "Voltage A", path: "van_field"})
        .addColorPicker({category: ["Phase Voltages"], defaultValue: "white", name: "Voltage A Color", path: "van_color"})

        .addFieldNamePicker({category: ["Phase Voltages"], defaultValue: "", name: "Voltage B", path: "vbn_field"})

        .addFieldNamePicker({category: ["Phase Voltages"], defaultValue: "", name: "Voltage C", path: "vcn_field"})

        /* Phase Currents */
        .addFieldNamePicker({category: ["Phase Currents"], defaultValue: "", name: "Current A", path: "ia_field"})

        .addFieldNamePicker({category: ["Phase Currents"], defaultValue: "", name: "Current B", path: "ib_field"})

        .addFieldNamePicker({category: ["Phase Currents"], defaultValue: "", name: "Current C", path: "ic_field"})

        /* Power Factor */
        .addBooleanSwitch({
            category: ["Power Factor"],
            defaultValue: false,
            name: "Use Nominal (PF=1)",
            path: "use_nominal_pf",
        })
        .addFieldNamePicker({
            category: ["Power Factor"], defaultValue: "", name: "Phase A Power Factor (0-2)", path: "pfa_field",
            showIf(currentOptions: PhasorDiagramOptions, data: DataFrame[] | undefined): boolean | undefined {
                return currentOptions.use_nominal_pf !== true;
            }
        })
        .addFieldNamePicker({
            category: ["Power Factor"], defaultValue: "", name: "Phase B Power Factor (0-2)", path: "pfb_field",
            showIf(currentOptions: PhasorDiagramOptions, data: DataFrame[] | undefined): boolean | undefined {
                return currentOptions.use_nominal_pf !== true;
            }
        })
        .addFieldNamePicker({
            category: ["Power Factor"], defaultValue: "", name: "Phase C Power Factor (0-2)", path: "pfc_field",
            showIf(currentOptions: PhasorDiagramOptions, data: DataFrame[] | undefined): boolean | undefined {
                return currentOptions.use_nominal_pf !== true;
            }
        })

        /* Background and Border */
        .addColorPicker({
            category: ["Background and Border"], defaultValue: "transparent", name: "Paper Color", path: "paper_color",
        })
        .addColorPicker({
            category: ["Background and Border"],
            defaultValue: "rgb(255,255,255)",
            name: "Border",
            path: "border_color"
        })
        .addNumberInput({
            category: ["Background and Border"],
            defaultValue: 3.0,
            name: "Border Width (px)",
            path: "border_px",
            settings: {
                min: 0.0,
                max: 5.0
            }
        })

        /* Grid lines and radials */
        .addColorPicker({
            category: ["Gridlines"],
            defaultValue: "rgb(234, 234, 234)",
            name: "Radial Color",
            path: "radial_color"
        })
        .addNumberInput({
            category: ["Gridlines"],
            defaultValue: 1.0,
            name: "Radial Grid (px)",
            path: "radial_px",

            settings: {
                min: 0.0,
                max: 5.0
            }
        })
        .addNumberInput({
                category: ["Gridlines"],
                defaultValue: 30.0,
                name: "Radial Spacing (degrees)",
                path: "radial_spacing_deg",

                settings: {
                    min: 5,
                    max: 90,
                    integer: true,
                    step: 5
                }
            })
        .addColorPicker({
            category: ["Gridlines"],
            defaultValue: "rgb(255, 255, 255)",
            name: "Major Grid Color",
            path: "major_grid_color"
        })
        .addNumberInput({
            category: ["Gridlines"],
            defaultValue: 1.0,
            name: "Major Grid Line (px)",
            path: "major_grid_px",

            settings: {
                min: 0.0,
                max: 5.0
            }
        })
        .addColorPicker({
            category: ["Gridlines"],
            defaultValue: "rgb(234, 234, 234)",
            name: "Minor Grid Color",
            path: "minor_grid_color"
        })
        .addNumberInput({
            category: ["Gridlines"],
            defaultValue: 1.0,
            name: "Minor Grid (px)",
            path: "minor_grid_px",

            settings: {
                min: 0.0,
                max: 5.0
            }
        })

        /* Nominal Value ring */
        .addNumberInput({
            category: ["Nominal Value"],
            defaultValue: 0,
            name: "Nominal Voltage",
            path: "nominal_volts"
        })
        .addColorPicker({
            category: ["Nominal Value"],
            defaultValue: "rgb(0, 180, 0)",
            name: "Nominal Value Line",
            path: "nom_value_color"
        })
        .addNumberInput({
            category: ["Nominal Value"],
            defaultValue: 1.0,
            name: "Nominal Grid (px)",
            path: "nom_value_px",
            settings: {
                min: 0.0,
                max: 5.0
            }
        })


});
