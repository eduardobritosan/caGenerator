export abstract class LFSR {
  constructor(private registers: number[], private taps: number[]) {
  }

  getRegisters() {
    return this.registers;
  }

  getTaps() {
    this.taps;
  }

  setRegisters(_registers: number[]) {
    this.registers = _registers;
  }

  setTaps(_taps: number[]) {
    this.taps = _taps;
  }
}