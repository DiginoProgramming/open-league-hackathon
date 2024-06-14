const {Cell} = require("./Cell");
const {BitString} = require("./BitString");

/**
 * @param cell  {Cell}
 * @return {BitString}
 */
const parseSnakeCells = (cell) => {
    /** @type {Cell} */
    let c = cell;
    /** @type {BitString} */
    let result = new BitString(0);
    while (c) {
        /** @type {BitString} */
        const newResult = new BitString(result.getUsedBits() + c.bits.getUsedBits());
        newResult.writeBitString(result);
        newResult.writeBitString(c.bits);

        result = newResult;
        c = c.refs[0];
    }
    return result;
}

/**
 * @param bytes {Uint8Array}
 * @param rootCellBitsUsed {number}
 * @return {Cell}
 */
const makeSnakeCells = (bytes, rootCellBitsUsed = 0) => {
    const CELL_BYTE_LENGTH = 127; // floor(1023 / 8)
    const rootCellBytesUsed = Math.ceil(rootCellBitsUsed / 8);
    const rootCellBytesAvailable = CELL_BYTE_LENGTH - rootCellBytesUsed;

    /** @type {Cell} */
    const root = new Cell();
    root.bits.writeBytes(bytes.slice(0, Math.min(bytes.length, rootCellBytesAvailable)));

    const cellCount = Math.ceil((bytes.length - rootCellBytesAvailable) / CELL_BYTE_LENGTH);
    if (cellCount > 16) {
        throw new Error('Text too long');
    }

    /** @type {Cell} */
    let cell = root;
    for (let i = 0; i < cellCount; i++) {
        /** @type {Cell} */
        const prevCell = cell;
        cell = new Cell();
        const cursor = rootCellBytesAvailable + i * CELL_BYTE_LENGTH;
        cell.bits.writeBytes(bytes.slice(cursor, Math.min(bytes.length, cursor + CELL_BYTE_LENGTH)));
        prevCell.refs[0] = cell;
    }

    return root;
}

/**
 * @param s {string}
 * @return {Cell}
 */
const stringToSnakeCells = (s) => {
    /** @type {Uint8Array} */
    const stringBytes = new TextEncoder().encode(s);

    const OP_BYTES_SIZE = 32 / 8; // 32bit OP zero prefix for text body

    /** @type {Uint8Array} */
    const bytes = new Uint8Array(OP_BYTES_SIZE + stringBytes.length);
    bytes.set(stringBytes, OP_BYTES_SIZE);

    return makeSnakeCells(bytes);
}

/**
 * @param cell  {Cell}
 * @return {string | null}
 */
const parseStringSnakeCells = (cell) => {
    /** @type {BitString} */
    const bitString = parseSnakeCells(cell);
    if (bitString.length % 8 !== 0) {
        return null;
    } else {
        /** @type {Uint8Array} */
        const array = bitString.array;

        if (array.length < 4 || array[0] !== 0 || array[1] !== 0 || array[2] !== 0 || array[3] !== 0) { // not zero OP
            return null;
        }
        return new TextDecoder().decode(array.slice(4));
    }
}

module.exports = {makeSnakeCells, stringToSnakeCells, parseSnakeCells, parseStringSnakeCells};