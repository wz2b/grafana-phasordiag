export class MarkerDefinition {

    private static _idgen: number = 0;
    private id: string;
    private marker: d3.Selection<any, any, any, any>;

    constructor(private svg: d3.Selection<any, any, any, any>, private cssClass: string) {

        this.id = `arrowhead_${++MarkerDefinition._idgen}`;

        let defs = svg.select('defs');
        if (defs === null) {
            defs = svg.append('defs');
        }

        this.marker = defs.append('marker')
            .attr('id', this.id)
            .attr('viewBox', '0 0 20 20')
            .attr('refX', 2)
            .attr('refY', 10)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M 0 0 L 20 10 L 0 20 z')
            .attr('class', cssClass + " phase-arrow-head")
            .attr('stroke-width', 2.5);
    }

    get url(): string {
        let url = `url(#${this.id})`;
        return url;
    }
}