import {Marker} from "./marker";
import {Scale} from "./scale";
import React from "react";

export class Phasor {
    private _marker: Marker
    magnitude: number
    degrees: number

    get markerDef() {
        return this._marker.render()
    }

    constructor(protected className: string, protected scale: Scale, protected color: string = "#808080") {
        this.magnitude = 0
        this.degrees = 0
        this._marker = new Marker(className, color)
    }


    render(): JSX.Element {
        const m = this.magnitude
        const hidden = (m == null || m === undefined || isNaN(m) || m === 0)

        return(
            <g display={hidden ? "none" : "inherit"}>
                <line className={this.className}
                      stroke={this.color}
                      fill={this.color}
                      x1={0} y1={0} x2={this.scale.domainToRange(this.magnitude)} y2={0}
                      transform={`rotate(${this.degrees})`}
                      markerEnd={ this._marker.url }
                />
            </g>
        )

    }



}
