export class Scale {
    constructor(private range: number, private domain: number) {
    }

    domainToRange(value: number): number {
        return value * this.range / this.domain;
    }
}
