export interface PhasorDiagramOptions {
    max_volts: number,
    max_amps: number,
    volts_grid: number,
    volts_subgrid: number,

    ia_field: string,

    ib_field: string,

    ic_field: string,

    van_field: string,
    van_color: string,

    vbn_field: string,
    vbn_color: string,

    vcn_field: string,
    vcn_color: string,


    nominal_volts: number,

    use_nominal_pf: boolean,
    pfa_field: string,
    pfb_field: string,
    pfc_field: string,

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
