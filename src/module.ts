import {DataFrame, PanelPlugin} from '@grafana/data';
import { PhasorDiagramOptions } from './types';
import { PhasorDiagram } from './PhasorDiagram';

export const plugin = new PanelPlugin<PhasorDiagramOptions>(PhasorDiagram).setPanelOptions(builder => {
  return builder
      .addNumberInput({
          defaultValue: 6,
          name: "Major Gridlines",
          path: "major_gridlines"
      })
      .addNumberInput({
          defaultValue: 300,
          name: "Max. Volts",
          path: "max_volts"
      })
      .addNumberInput({
          defaultValue: 100,
          name: "Max. Amperes",
          path: "max_amps"
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "Current A",
          path: "ia_field",
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "Current B",
          path: "ib_field",
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "Current C",
          path: "ic_field",
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "Voltage A",
          path: "va_field",
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "Voltage B",
          path: "vb_field",
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "Voltage C",
          path: "vc_field",
      })

      .addBooleanSwitch({
          defaultValue: false,
          name: "PF Available?",
          path: "has_pf",
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "PF Field A",
          path: "pfa_field",
          showIf(currentOptions: PhasorDiagramOptions, data: DataFrame[] | undefined): boolean | undefined {
              return currentOptions.has_pf;
          }
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "PF Field B",
          path: "pfb_field",
          showIf(currentOptions: PhasorDiagramOptions, data: DataFrame[] | undefined): boolean | undefined {
              return currentOptions.has_pf;
          }
      })

      .addFieldNamePicker({
          defaultValue: "",
          name: "PF Field C",
          path: "pfc_field",
          showIf(currentOptions: PhasorDiagramOptions, data: DataFrame[] | undefined): boolean | undefined {
              return currentOptions.has_pf;
          }
      })

});
