export class PfCalculator {

    /*
     * Calculate the angle between the phase and current.  If the real power
     * is negative, show the angle in the opposite direction.
     *
     * If watts is zero this will return NaN.  The phasor likely
     * should be hidden in this case.
     */
    static degrees(baseAngle: number, watts: number, vars: number): number{
        const ratio = vars / watts;
        const radians = Math.atan(ratio);
        const degrees = baseAngle + (radians * 180.0 / Math.PI);

        if (watts < 0) {
            return degrees - 180;
        } else {
            return degrees
        }
    }
}
