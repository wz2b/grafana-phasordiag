import {PanelOptionsEditorBuilder, PanelPlugin} from '@grafana/data';
import {PhasorDiagramOptions} from './types';
import {PhasorDiagram} from './PhasorDiagram';

const SECTION = {
    APPEARANCE: ["Appearance"],
    SCALING: ["Scaling"],
    DATA: ["Data Mapping"]
}

export const plugin = new PanelPlugin<PhasorDiagramOptions>(PhasorDiagram).setPanelOptions((builder: PanelOptionsEditorBuilder<PhasorDiagramOptions>) => {
    return builder
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Voltage A-N", path: "a.fields.volts"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Current A", path: "a.fields.amps"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Phase A Real Power (Watts)", path: "a.fields.watts"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Phase A Reactive Power (VAr)", path: "a.fields.vars"})

        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Voltage B-N", path: "b.fields.volts"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Current B", path: "b.fields.amps"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Phase B Real Power (Watts)", path: "b.fields.watts"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Phase B Reactive Power (VAr)", path: "b.fields.vars"})

        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Voltage C-N", path: "c.fields.volts"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Current C", path: "c.fields.amps"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Phase C Real Power (Watts)", path: "c.fields.watts"})
        .addFieldNamePicker({category: SECTION.DATA, defaultValue: "", name: "Phase C Reactive Power (VAr)", path: "c.fields.vars"})

        /* Scaling */
        .addNumberInput({category: SECTION.SCALING, defaultValue: 300, name: "Max. Volts", path: "max_volts"})
        .addNumberInput({category: SECTION.SCALING, defaultValue: 100, name: "Max. Amperes", path: "max_amps"})
        .addNumberInput({category: SECTION.SCALING, defaultValue: 100, name: "Major Grid (Volts)", path: "volts_grid"})
        .addNumberInput({
            category: SECTION.SCALING,
            defaultValue: 50,
            name: "Minor Grid (Volts)",
            path: "volts_subgrid"
        })




        /* Background and Border */
        .addColorPicker({
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(184, 144, 115)",
            name: "Voltage A-N",
            path: "a.color"
        })
        .addColorPicker({
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(255, 140, 75)",
            name: "Voltage B-N",
            path: "b.color"
        })
        .addColorPicker({
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(255, 255, 0)",
            name: "Voltage C-N",
            path: "c.color"
        })
        .addColorPicker({
            category: SECTION.APPEARANCE, defaultValue: "transparent", name: "Paper Color", path: "paper_color",
        })
        .addColorPicker({
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(255,255,255)",
            name: "Border",
            path: "border_color"
        })
        .addNumberInput({
            category: SECTION.APPEARANCE,
            defaultValue: 3.0,
            name: "Border Width (px)",
            path: "border_px",
            settings: {
                min: 0.0,
                max: 5.0
            }
        })

        .addNumberInput({
            category: SECTION.APPEARANCE,
            defaultValue: 10, name: "Arrow Head (px))",
            path: "arrow_size",
            settings: {min: 0, max: 100, step: 1}
        })

        /* Grid lines and radials */
        .addColorPicker({
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(234, 234, 234)",
            name: "Radial Color",
            path: "radial_color"
        })
        .addNumberInput({
            category: SECTION.APPEARANCE,
            defaultValue: 1.0,
            name: "Radial Grid (px)",
            path: "radial_px",

            settings: {
                min: 0.0,
                max: 5.0
            }
        })
        .addNumberInput({
            category: SECTION.APPEARANCE,
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
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(255, 255, 255)",
            name: "Major Grid Color",
            path: "major_grid_color"
        })
        .addNumberInput({
            category: SECTION.APPEARANCE,
            defaultValue: 1.0,
            name: "Major Grid Line (px)",
            path: "major_grid_px",

            settings: {
                min: 0.0,
                max: 5.0
            }
        })
        .addColorPicker({
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(234, 234, 234)",
            name: "Minor Grid Color",
            path: "minor_grid_color"
        })
        .addNumberInput({
            category: SECTION.APPEARANCE,
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
            category: SECTION.APPEARANCE,
            defaultValue: 0,
            name: "Nominal Voltage",
            path: "nominal_volts"
        })
        .addColorPicker({
            category: SECTION.APPEARANCE,
            defaultValue: "rgb(0, 180, 0)",
            name: "Nominal Value Line",
            path: "nom_value_color"
        })
        .addNumberInput({
            category: SECTION.APPEARANCE,
            defaultValue: 1.0,
            name: "Nominal Grid (px)",
            path: "nom_value_px",
            settings: {
                min: 0.0,
                max: 5.0
            }
        })


});
