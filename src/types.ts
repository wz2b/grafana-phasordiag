export interface PhasorDiagramOptions {
    major_gridlines: number,
    max_volts: number,
    max_amps: number,
    ia_field: string,
    ib_field: string,
    ic_field: string,
    va_field: string,
    vb_field: string,
    vc_field: string,

    has_pf: boolean,
    pfa_field: string,
    pfb_field: string,
    pfc_field: string
}
