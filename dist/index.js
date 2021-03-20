"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g2LFSR = exports.g1LFSR = exports.LFSR = void 0;
class LFSR {
    constructor(registers) {
        this.registers = registers;
    }
    getRegisters() {
        return this.registers;
    }
    setRegisters(_registers) {
        this.registers = _registers;
    }
}
exports.LFSR = LFSR;
class g1LFSR extends LFSR {
    constructor(registers) {
        super(registers);
    }
    shift() {
        this.getRegisters().unshift((this.getRegisters()[9] ^
            this.getRegisters()[2]));
        const shiftedNumber = this.getRegisters().pop();
        if (typeof shiftedNumber === "number") {
            return shiftedNumber;
        }
        else {
            return -1;
        }
    }
}
exports.g1LFSR = g1LFSR;
class g2LFSR extends LFSR {
    constructor(registers, satelliteId) {
        super(registers);
        this.satelliteId = satelliteId;
        this.prn = [[2, 6], [3, 7], [4, 8], [5, 9], [1, 9], [2, 10], [1, 8], [2, 9],
            [3, 10], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
            [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], [6, 9], [1, 3], [4, 6],
            [5, 7], [6, 8], [7, 9], [8, 10], [1, 6], [2, 7], [3, 8], [4, 9]
        ];
    }
    getSatellitedId() {
        return this.satelliteId;
    }
    setSatelliteId(_satelliteId) {
        this.satelliteId = _satelliteId;
    }
    getPrn() {
        return this.prn;
    }
    shift() {
        if (this.getSatellitedId() > this.getPrn().length) {
            throw new Error("Satellite id invalid");
        }
        this.getRegisters().unshift(this.getRegisters()[9] ^
            this.getRegisters()[8] ^ this.getRegisters()[7] ^ this.getRegisters()[5] ^
            this.getRegisters()[2] ^ this.getRegisters()[1]);
        this.getRegisters().pop();
        return this.getRegisters()[this.getPrn()[this.getSatellitedId() - 1][0]] ^
            this.getRegisters()[this.getPrn()[this.getSatellitedId() - 1][1]];
    }
}
exports.g2LFSR = g2LFSR;
class CA {
    constructor() { }
    ;
    generator(g1, g2, sequenceLength) {
        const caSequence = [];
        if (g1.getRegisters().length === g2.getRegisters().length) {
            for (let index = 0; index < sequenceLength; index++) {
                console.log(`G1: ${g1.getRegisters().toString()}`);
                let g1Returns = g1.shift();
                console.log(`Realimentacion: ${g1Returns}\n`);
                console.log(`G2: ${g2.getRegisters().toString()}`);
                let g2Returns = g2.shift();
                console.log(`Realimentacion: ${g2Returns}\n`);
                caSequence.push(g1Returns ^ g2Returns);
                console.log(`Secuencia: ${caSequence}`);
            }
        }
        return caSequence;
    }
}
const testArray1 = Array(10).fill(0b1);
const testArray2 = Array(10).fill(0b1);
const g1 = new g1LFSR(testArray1);
const g2 = new g2LFSR(testArray2, 1);
const caCode = CA.prototype.generator(g1, g2, 14);
//# sourceMappingURL=index.js.map