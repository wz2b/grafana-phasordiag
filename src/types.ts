

export interface PhasorFields {
    amps: string,
    volts: string,
    watts: string,
    vars: string,
}
export interface PhasorDescr {
    fields: PhasorFields,
    color: string
}

export interface PhasorDiagramOptions {
    max_volts: number,
    max_amps: number,
    volts_grid: number,
    volts_subgrid: number,
    arrow_size: number,

    a: PhasorDescr,
    b: PhasorDescr,
    c: PhasorDescr,

    nominal_volts: number,

    paper_color: string,

    radial_color: string,
    radial_px: number,
    radial_spacing_deg: number,

    major_grid_color: string,
    major_grid_px: number,

    minor_grid_color: string,
    minor_grid_px: number,

    nom_value_color: string,
    nom_value_px: number,

    border_color: string,
    border_px: number,
}
