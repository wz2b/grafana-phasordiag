import React from "react";


export class Marker {
    static nextId = 0

    private _id: number

    get id(): string {
        return `marker${this._id}`
    }

    constructor(protected className: string) {
        this._id = Marker.nextId++
    }



    render(): JSX.Element {
        return (
            <marker
                id={`marker${this.id}`}
                refX={2} refY={10}
                markerWidth={6} markerHeight={6}
                orient={"auto"}>
                <path d={"M 0 0 L 20 10 L 0 20 z"} className={this.className + " phase-arrow-head"}/>
            </marker>
        )
    }


}
