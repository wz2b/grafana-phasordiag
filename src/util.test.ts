import util from "./util";
import {Scale} from './scale'
describe('util', () => {
    it('should generate 100-600 in 100V steps', async () => {
        const a = util.linspace(0, 600, 100)
        expect(a).toEqual([100, 200, 300, 400, 500, 600])
    })


    it('should generate 100-600 in 100V steps', async () => {
        const a = util.linspace(50, 600, 100)
        console.log(a)
        expect(a).toEqual([150, 250, 350, 450, 550])
    })
})

describe('scale', () => {
    it('should scale properly', async () => {
        const scale = new Scale(1000, 600)
        expect(scale.domainToRange(0)).toEqual(0)
        expect(scale.domainToRange(300)).toEqual(500)
        expect(scale.domainToRange(600)).toEqual(1000)

    })
})
