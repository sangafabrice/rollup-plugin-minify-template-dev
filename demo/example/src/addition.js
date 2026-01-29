/** @flow */

export default function add(
    ...operand: Array<number>
): number {
    return operand.reduce(
        (result, value) => result + value
    );
}