
export interface PhasorDescr {
    field: string,
    color: string
}

export interface PhasorDiagramOptions {
    max_volts: number,
    max_amps: number,
    volts_grid: number,
    volts_subgrid: number,
    arrow_size: number,

    ia: PhasorDescr,
    ib: PhasorDescr,
    ic: PhasorDescr,

    van: PhasorDescr,
    vbn: PhasorDescr,
    vcn: PhasorDescr,

    nominal_volts: number,

    use_nominal_pf: boolean,
    va_a_field: string,
    va_b_field: string,
    va_c_field: string,
    var_a_field: string,
    var_b_field: string,
    var_c_field: string,


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
