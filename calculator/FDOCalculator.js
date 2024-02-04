// Femoral Derotation Osteotomy Calculator
class FDOCalculator {
	static #A = 0;
	static #N = 4;
	static #DECIMAL_PLACES_FOR_MM = 1;
	static #DECIMAL_PLACES_FOR_IN = 2;
	constructor() {}

	static calculate(diameter1, diameter2, unit, degreeStart, degreeStep) {
		degreeStart = parseFloat(degreeStart);
		degreeStep = parseFloat(degreeStep);
		let TARGET_FEMORAL_ROTATIONS_IN_DEGREES = [];

		const results = new Map();
		const arrayLength = Math.ceil(90 / degreeStep);

		if (degreeStart === 0) {
			TARGET_FEMORAL_ROTATIONS_IN_DEGREES = Array.from({ length: arrayLength }, (_, i) => degreeStep * (i + 1));
		} else {
			TARGET_FEMORAL_ROTATIONS_IN_DEGREES = Array.from(
				{ length: arrayLength },
				(_, i) => degreeStart + degreeStep * i
			);
		}

		for (const deg of TARGET_FEMORAL_ROTATIONS_IN_DEGREES) {
			results.set(deg, this.#getSimpsonsRuleResult(diameter1, diameter2, deg, unit));
		}

		return results;
	}
	static #f(diameter1, diameter2, t) {
		return Math.sqrt(diameter1 ** 2 * Math.sin(t) ** 2 + diameter2 ** 2 * Math.cos(t) ** 2);
	}
	static #getSimpsonsRuleResult(diameter1, diameter2, angle, unit) {
		const b = this.#getUpperBound(angle, diameter1, diameter2);
		const deltaX = this.#getDeltaX(b);
		const inputs = this.#range(this.#A, b, deltaX);
		let sum = this.#f(diameter1, diameter2, inputs[0]) + this.#f(diameter1, diameter2, inputs[inputs.length - 1]);

		for (let i = 1; i < inputs.length - 1; i++) {
			if (i % 2 === 0) {
				sum += 2 * this.#f(diameter1, diameter2, inputs[i]);
			} else {
				sum += 4 * this.#f(diameter1, diameter2, inputs[i]);
			}
		}

		return ((sum * deltaX) / 3).toFixed(unit === "mm" ? this.#DECIMAL_PLACES_FOR_MM : this.#DECIMAL_PLACES_FOR_IN);
	}
	static #range(start, end, step) {
		let arr = [];
		for (let i = start; i <= end; i += step) {
			arr.push(i);
		}
		return arr;
	}
	static #radians(degrees) {
		return (degrees * Math.PI) / 180;
	}
	static #getUpperBound(deg, diameter1, diameter2) {
		return Math.atan((diameter1 * Math.tan(this.#radians(deg))) / diameter2);
	}
	static #getDeltaX(b) {
		return (b - this.#A) / this.#N;
	}
}

export default FDOCalculator;
