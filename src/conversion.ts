import { temperatureIncrement as temp, references } from './unit'

const property: string[] = Object.keys(references)
const factor: { [key: number]: {[key: string]: number} } = Object.values(references)

const convert = (property: number, value: number, units: [number, number], temperature = false): number => {
	const [unitA, unitB] = units
	const unit = (i: number) => Object.keys(factor[property])[i]
	// unit temperature need different treat (just invert normal calc)
	const divide = (a: number, b: number) => temperature ? (a * b) : (a / b)
	const times = (a: number, b: number) => temperature ? (a / b) : (a * b)
	
	if (unitA == unitB) return value
	if (temperature) value += temp[unitA]

	const factorA = divide(value, factor[property][unit(unitA)])
	const factorB = times(value, factor[property][unit(unitB)])

	value = (unitA < unitB)
		? times(factorA, factor[property][unit(unitB)])
		: divide(factorB, factor[property][unit(unitA)])

	if (temperature) value -= temp[unitB]

	return +parseFloat(value.toString()).toPrecision(6)
}

const formula = (property: number, units: [number, number]) => {
	const [unitA, unitB] = units
	const math = (unitA > unitB) ? 'times' : 'divide'
	const unitFactor = convert(property, 1, unitA < unitB ? [unitB, unitA] : [unitA, unitB])
	return [math, unitFactor]
}

const formulaTemperature = (valueA: number, units: [number, number]): string => {
	const [unitA, unitB] = units
	const valueB = convert(property.findIndex(x => x === 'Temperature'), valueA, units, true)
	const arrEqual = (a: [number, number], b: [number, number]) => {
		return a.every((val, index) => val === b[index]);
	}
	// [Celsius, Fahrenheit, Kelvin, Rankine]
	if (arrEqual(units, [0,1]) || arrEqual(units, [1,0])) {
		return (unitA < unitB)
			? `(${valueA} °C × 9/5) + 32 = ${valueB} °F`
			: `(${valueA} °F − 32) × 5/9 = ${valueB} °C`
	}
	if (arrEqual(units, [0,2]) || arrEqual(units, [2,0])) {
		return (unitA < unitB)
			? `${valueA} °C + 273,15 = ${valueB} K`
			: `${valueA} K - 273,15 = ${valueB} °C`
	}
	if (arrEqual(units, [0,3]) || arrEqual(units, [3,0])) {
		return (unitA < unitB)
			? `${valueA} °C × 9/5 + 491,67 = ${valueB} °R`
			: `(${valueA} °R − 491,67) × 5/9 = ${valueB} °C`
	}
	if (arrEqual(units, [1,2]) || arrEqual(units, [2,1])) {
		return (unitA < unitB)
			? `(${valueA} °F − 32) × 5/9 + 273,15 = ${valueB} K`
			: `(${valueA} K − 273,15) × 9/5 + 32 = ${valueB} °F`
	}
	if (arrEqual(units, [1,3]) || arrEqual(units, [3,1])) {
		return (unitA < unitB)
			? `${valueA} °F + 459,67 = ${valueB} °R`
			: `${valueA} °R - 459,67 = ${valueB} °F`
	}
	if (arrEqual(units, [2,3]) || arrEqual(units, [3,2])) {
		return (unitA < unitB)
			? `${valueA} K × 1,8 = ${valueB} °R`
			: `${valueA} °R × 5/9 = ${valueB} K`
	}
	return ''
}

export { property, factor, convert, formula, formulaTemperature }