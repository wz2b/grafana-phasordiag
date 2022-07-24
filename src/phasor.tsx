import {Scale} from "./scale";
import React from "react";

export interface PhasorProps {
    markerId: string,
    color: string,
    strokeWidth: number,
    strokeDasharray: string,
    magnitude: number,
    degrees: number,
    scale: Scale
}

export interface PhasorState {
}

export class Phasor extends React.Component<PhasorProps, PhasorState> {
    static defaultProps = {
        strokeWidth: 1.5,
        strokeDasharray: "1"
    }

    constructor(props: PhasorProps, state: PhasorState) {
        super(props, state);
    }

    render(): JSX.Element {
        const m = this.props.magnitude
        const hidden = (m == null || m === undefined || isNaN(m) || m === 0)

        return (
            <g display={hidden ? "none" : "inherit"}>
                <line stroke={this.props.color}
                      fill={this.props.color}
                      strokeWidth={`${this.props.strokeWidth}px`}
                      strokeDasharray={this.props.strokeDasharray}
                      x1={0} y1={0} x2={this.props.scale.domainToRange(this.props.magnitude)} y2={0}
                      transform={`rotate(-${this.props.degrees})`}
                      markerEnd={`url(#${this.props.markerId})`}
                />
            </g>
        )
    }
}
