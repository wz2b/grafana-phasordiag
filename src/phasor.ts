import * as d3 from 'd3';
import {MarkerDefinition} from "./markerdef";

export class Phasor {
    private group: d3.Selection<any, any, any, any>;
    private line: d3.Selection<any, any, any, any>;
    private labelSelection: d3.Selection<any, any, any, any>;
    private labelShadow: d3.Selection<any, any, any, any>;
    private markerDef: MarkerDefinition;

    public get name() : string {
        return this.label + "(" + this.phase + ")";
    }

    private _mag: number = 0;
    private _ang: number = 0;

    constructor(svg: d3.Selection<any, any, any, any>,
                center: d3.Selection<any, any, any, any>,
                private radius: number,
                private label: string,
                private phase: string,
                cssClass: string,
                private maxScale: number) {

        this.markerDef = new MarkerDefinition(svg, cssClass);

        this.group = center.append('g').attr("class", cssClass);

        this.line = this.group.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 0)
            .attr('transform', 'rotate(0)')
            .attr('marker-end', this.markerDef.url);

        this.labelShadow = this.group.append('text')
            .attr('class', 'phasordiag_vector_label_shadow')
            .attr('x', 0)
            .attr('y', 0)
            .text(label);

        this.labelShadow.append('tspan')
            .attr('baseline-shift', 'sub')
            .text(phase);

        this.labelSelection = this.group.append('text')
            .attr('class', 'phasordiag_vector_label')
            .attr('x', 0)
            .attr('y', 0)
            .text(label);

        this.labelSelection.append('tspan')
            .attr('baseline-shift', 'sub')
            .text(phase);

        this.angle = 0;
        this.hide();
    }

    set magnitude(magnitude: number | undefined) {

        if (magnitude == null || magnitude === undefined || Number.NaN === magnitude || magnitude == 0) {
            this.hide();
        } else {
            console.log("Set magnitude", this.name, this.magnitude);
            this._mag = magnitude / this.maxScale;
            this.line.attr('x2', this.radius * this._mag - 5);
            this.repositionLabel();
            this.show();
        }
    }

    set angle(angle: number | undefined) {
        if(angle !== undefined) {
            this._ang = angle;
            this.line.attr('transform', 'rotate(' + (this._ang) + ')');
            this.repositionLabel();
        }
    }

    /**
     * Reposition the label that goes at the end of the arrow
     */
    private repositionLabel() {
        this.labelSelection.attr('transform', `rotate(${this._ang}) translate(${this.radius * this._mag}) rotate(${-this._ang})`);
        this.labelShadow.attr('transform', `rotate(${this._ang}) translate(${this.radius * this._mag}) rotate(${-this._ang})`);

        let quadrant = Math.floor(Math.abs((this._ang / 90) % 4) + 1);
        if (quadrant == 2) {
            this.labelSelection.attr('x', 15).attr('y', -5)
            this.labelShadow.attr('x', 15).attr('y', -5)
        } else {
            this.labelSelection.attr('x', 10).attr('y', 15)
            this.labelShadow.attr('x', 10).attr('y', 15)
        }

    }

    hide() {
        this.group.attr('display', 'none');
    }

    show() {
        console.log("Unhiding", this.name)
        this.group.attr('display', null);
    }
}



export class PfCalculator {
    private _kw: number;
    private _kvar: number;

    constructor(private line: Phasor, private baseAngle: number) {
        this._kw = 0;
        this._kvar = 0;
    }

    public set kw(value: number) {
        this._kw = value;
        this._update();
    }

    public set kvar(value: number) {
        this._kvar = value;
        this._update();
    }

    private _update() {
        if(this._kvar != null && this._kw != null) {
            if(this._kw != 0) {
                let ratio =  this._kvar / this._kw;
                let radians: number = Math.atan(ratio);
                let degrees = this.baseAngle + (radians * 180.0 / Math.PI);

                if(this._kw < 0) {
                    degrees = degrees - 180;
                }
                console.log("Setting", this.line.name, "to",
                    this._kvar, "/", this._kw,
                    "=",
                    radians, "radians,",
                    degrees, "degrees");
                this.line.angle = degrees;
            } else {
                this.line.angle = this.baseAngle;
            }
        }
    }
}
