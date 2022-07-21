function translateToCenterTransform(height: number, width: number) {
    return `translate(${width / 2},${height / 2})`

}

/*
 * Generate a sequence of numbers from A to B with a step size of step
 */
function linspace(start: number, stop: number, step: number) {
    const steps =(stop - start) / step
    return Array.from({length: steps}, (x, i) => start + ((i+1) * step) )
}

// function generateScale(numTicks: number, scale: number, offset = 0) {
//     return Array.from({length: numTicks},
//         (x, i) => scale * (i + (1 + offset) / (numTicks)))
// }

export default {linspace, translateToCenterTransform}
