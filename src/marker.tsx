import React from "react";


export class Marker {
    static nextId = 0

    private _id: number

    get id(): string {
        return `marker${this._id}`
    }

    constructor(protected className: string, protected color: string = "white") {
        this._id = Marker.nextId++
    }

    get url(): string {
        let url = `url(#${this.id})`;
        return url;
    }

    render(): JSX.Element {
        return (
            <marker
                className={this.className}
                stroke={this.color}
                fill={this.color}
                id={`${this.id}`}
                viewBox={"0 0 20 20"}
                refX={2}
                refY={10}
                markerWidth={6}
                markerHeight={6}
                orient={"auto"}>
                <path d={"M 0 0 L 20 10 L 0 20 z"} />
            </marker>
        )
    }


}
