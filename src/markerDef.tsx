import React from "react";

export interface MarkerDefProps {
    id: string,
    color: string,
    fill: string,
    strokeWidth: number,
    size: number
}

export interface MarkerDefState {
}

export class MarkerDef extends React.Component<MarkerDefProps, MarkerDefState> {

    static defaultProps = {
        size: 10,
        strokeWidth: 2
    }

    constructor(props: MarkerDefProps, state: MarkerDefState) {
        super(props, state)
    }


    render(): JSX.Element {
        const s = this.props.size

        return (
            <marker
                id={`${this.props.id}`}
                stroke={this.props.color}
                strokeWidth={`${this.props.strokeWidth}px`}
                fill={this.props.fill}
                refX={s}
                refY={s/2}
                markerWidth={s}
                markerHeight={s}>
                <path d={`M 0 0 L ${s} ${s/2} L 0 ${s} z`}/>
            </marker>
        )
    }
}
