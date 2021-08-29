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

export { property, factor, convert, formula }