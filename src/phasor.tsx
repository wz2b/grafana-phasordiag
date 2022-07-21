import {Marker} from "./marker";

export class Phasor {

    private _marker: Marker
    get markerDef() {
        return this._marker.generateDef()
    }

    constructor(className: string) {
        this._marker = new Marker(className)
    }
}