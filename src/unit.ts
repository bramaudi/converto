const property: { [key: number]: string } = {}
const factor: { [key: number]: {[key: string]: number} } = {}
const unit = (i: number) => Object.keys(factor[0])[i]

property[0] = 'Data Storage'
factor[0] = {
	b: 1,
	kb: 0.0009765625,
	mb: 9.5367431640625e-7
}

const convert = (value: number, units: [number, number]) => {
	const [unitA, unitB] = units
	if (unitA == unitB) return value
	return (unitA < unitB)
		? value * factor[0][unit(unitA > 0 ? unitA : unitB)]
		: value / factor[0][unit(unitB > 0 ? unitB : unitA)]
}

export { property, factor, unit, convert }