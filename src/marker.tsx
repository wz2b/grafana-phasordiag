import React from "react";


export class Marker {
    static nextId: number = 0

    private _id: number

    get id(): string {
        return `marker${this._id}`
    }

    constructor(private className: string) {
        this._id = Marker.nextId++
    }

    //             .attr('viewBox', '0 0 20 20')
    //             .attr('refX', 2)
    //             .attr('refY', 10)
    //             .attr('markerWidth', 6)
    //             .attr('markerHeight', 6)
    //             .attr('orient', 'auto')
    //             .append('path')
    //             .attr('d', 'M 0 0 L 20 10 L 0 20 z')
    //             .attr('class', cssClass + " phase-arrow-head")
    //             .attr('stroke-width', 2.5);

    generateDef(): JSX.Element {
        return (
            <marker
                id={`marker${this.id}`}
                refX={2} refY={10}
                markerWidth={6} markerHeight={6}
                orient={"auto"}>
                <path d={"M 0 0 L 20 10 L 0 20 z"} className={this.className}></path>
            </marker>
        )
    }


}