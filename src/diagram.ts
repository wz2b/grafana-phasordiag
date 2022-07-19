import * as d3 from 'd3';
import './styles.scss';
import {PfCalculator, Phasor} from "./phasor";


export class PhasorDiagram {
    private canvas: d3.Selection<any, any, any, any>;
    private center: d3.Selection<any, any, any, any>;
    private defs: d3.Selection<any, any, any, any>;
    private margin = {top: 40, right: 20, bottom: 30, left: 40};

    private voltsRefLine: d3.Selection<any, any, any, any>;
    private ampsScaleLocation: string = "bottom";
    private ampsMax = 600;

    private voltsScaleLocation: string = "top";
    private voltsMax = 300;

    private ref: number = 277.0;

    private svgWidth: number = 400;
    private svgHeight: number = 400;
    private aspectX: number = 1;
    private aspectY: number = 1;

    private width: number = this.svgWidth - this.margin.left - this.margin.right;
    private height: number = this.svgHeight - this.margin.top - this.margin.bottom;
    private radius: number = Math.min(this.width, this.height) / 2;

    private arrow_ia: Phasor;
    private arrow_ib: Phasor;
    private arrow_ic: Phasor;
    private arrow_van: Phasor;
    private arrow_vbn: Phasor;
    private arrow_vcn: Phasor;

    private p_a: PfCalculator;
    private p_b: PfCalculator;
    private p_c: PfCalculator;


    constructor(private svg: d3.Selection<any, any, any, any>) {
        this.defs = svg.append("defs");
        this._draw();
        this.p_a = new PfCalculator(this.arrow_ia, 0);
        this.p_b = new PfCalculator(this.arrow_ib, -120);
        this.p_c = new PfCalculator(this.arrow_ic, -240);
    }

    _draw() {
        this.svg.attr('width', this.svgWidth).attr('height', this.svgHeight);

        this.svg.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', this.svgWidth)
            .attr('height', this.svgHeight)
            .attr('class', 'phasordiag_background');

        this.canvas = this.svg.append('g')
            .attr('transform', `scale(${this.aspectX}, ${this.aspectY})`)
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
        /*
         * Draw a background
         */
        /* Define the canvase - the drawing area without the margins */

        /* Translate the canvas so that 0,0 is the center */

        this.center = this.canvas.append('g')
            .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

        this._draw_grid();
        this._draw_labels();
        this._create_lines();
    }


    _draw_labels() {
        /* Label 0 degrees */
        this.center.append('text')
            .attr('x', this.radius + 15)
            .attr('y', 0)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'start')
            .attr('class', 'phasordiag_radial_label')
            .text('0\u00B0');

        /* Label 90 degrees */
        this.center.append('text')
            .attr('x', 0)
            .attr('y', -this.radius - 25)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .attr('class', 'phasordiag_radial_label')
            .text(' 90\u00B0');

        /* Label 180 degrees */
        this.center.append('text')
            .attr('x', -this.radius - 15)
            .attr('y', 0)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'end')
            .attr('class', 'phasordiag_radial_label')
            .text(' 180\u00B0');

        /* Label 270 degrees */
        this.center.append('text')
            .attr('x', 0)
            .attr('y', this.radius + 25)
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .attr('class', 'phasordiag_radial_label')
            .text('270\u00B0');

        /*
         * Label amps
         */
        if (this.ampsScaleLocation != null) {
            let flip = this.ampsScaleLocation === 'top' ? -1 : 1;
            /* Label volts */
            for (let amps = 100; amps <= this.ampsMax; amps += 100) {
                this.center.append('text')
                    .attr('class', 'phasordiag_grid_label_shadow')
                    .attr('x', 0)
                    .attr('y', flip * this.radius * (amps / this.ampsMax))
                    .text(`${amps}A`);

                this.center.append('text')
                    .attr('class', 'phasordiag_grid_label')
                    .attr('x', 0)
                    .attr('y', flip * this.radius * (amps / this.ampsMax))
                    .text(`${amps}A`);
            }
        }

        /*
         * Label volts
         */
        if (this.voltsScaleLocation != null) {
            let flip = this.voltsScaleLocation === 'top' ? -1 : 1;
            /* Label volts */
            for (let amps = 100; amps <= this.voltsMax; amps += 100) {
                this.center.append('text')
                    .attr('class', 'phasordiag_grid_label_shadow')
                    .attr('x', 0)
                    .attr('y', flip * this.radius * (amps / this.voltsMax))
                    .text(`${amps}V`);

                this.center.append('text')
                    .attr('class', 'phasordiag_grid_label')
                    .attr('x', 0)
                    .attr('y', flip * this.radius * (amps / this.voltsMax))
                    .text(`${amps}V`);
            }
        }
    }


    _draw_grid() {

        this.center.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', this.radius + 10)
            .attr('class', 'phasordiag_canvas');


        /*
         * The minor circular grid
         */
        for (let i = (1 / 2 - 1 / 6); i < 1; i += 1 / 6) {
            this.center.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', this.radius * i)
                .attr('class', 'phasordiag_minor_grid');
        }

        /*
         * The major circular grid
         */
        for (let i = 0; i <= 1; i += 1 / 6) {
            this.center.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', this.radius * i)
                .attr('class', 'phasordiag_major_grid');
        }


        /* Draw a special circle around the reference (277 for a 480V system) */
        this.voltsRefLine = this.center.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', this.radius * this.ref / this.voltsMax)
            .attr('display', this.ref == null ? 'hidden' : 'inherit')
            .attr('class', 'phasordiag_optimal_grid');


        /* Draw radial grid lines */
        for (let a = 0; a < 360; a += 60) {
            let rotated = this.center.append('g')
                .attr('transform', 'rotate(' + a + ')');
            rotated.append('line')
                .attr('x1', this.radius * 0.2)
                .attr('y1', 0)
                .attr('x2', this.radius * 0.99)
                .attr('y2', 0)
                .attr('class', 'phasordiag_radial_grid');

        }

        // /* Draw radial grid lines */
        // for (let a = 0; a < 360; a += 30) {
        //     let rotated = this.center.append('g')
        //         .attr('transform', `rotate(${a})`);
        //
        //     rotated.append('line')
        //         .attr('x1', this.radius * 0.33)
        //         .attr('y1', 0)
        //         .attr('x2', this.radius * 0.99)
        //         .attr('y2', 0)
        //         .attr('class', 'phasordiag_radial_grid');
        //
        // }
    }

    _create_lines() {
        this.arrow_van = new Phasor(this.svg, this.center, this.radius, 'V', 'AN', 'Van', 300);
        this.arrow_vbn = new Phasor(this.svg, this.center, this.radius, 'V', 'BN', 'Vbn', 300);
        this.arrow_vcn = new Phasor(this.svg, this.center, this.radius, 'V', 'CN', 'Vcn', 300);

        this.arrow_ia = new Phasor(this.svg, this.center, this.radius, 'I', 'A', 'Ia',  600);
        this.arrow_ib = new Phasor(this.svg, this.center, this.radius, 'I', 'B', 'Ib',  600);
        this.arrow_ic = new Phasor(this.svg, this.center, this.radius, 'I', 'C', 'Ic',  600);


        this.arrow_van.angle = 0;
        this.arrow_vbn.angle = -120;
        this.arrow_vcn.angle = -240;

        this.arrow_ia.angle = 0;
        this.arrow_ib.angle = -120;
        this.arrow_ic.angle = -240;
    }
}
