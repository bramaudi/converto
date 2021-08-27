const property: { [key: number]: string } = {}
const factor: { [key: number]: {[key: string]: number} } = {}

property[0] = 'Length'
factor[0] = {
	'Kilometer (km)':		1,
	'Hektometer (hm)':	Math.pow(10, 1),
	'Dekameter (dam)':	Math.pow(10, 2),
	'Meter (m)':				Math.pow(10, 3),
	'Desimeter (dm)':		Math.pow(10, 4),
}

property[1] = 'Data Storage'
factor[1] = {
	'Byte (b)': 			1,
	'Kilobyte (kB)':	(1/Math.pow(1024, 1)),
	'Megabyte (MB)':	(1/Math.pow(1024, 2)),
	'Gigabyte (GB)':	(1/Math.pow(1024, 3)),
	'Terabyte (TB)':	(1/Math.pow(1024, 4)),
	'Petabyte (PB)':	(1/Math.pow(1024, 5)),
}

const convert = (property: number, value: number, units: [number, number]) => {
	const unit = (i: number) => Object.keys(factor[property])[i]
	const [unitA, unitB] = units
	if (unitA == unitB) return value
	return (unitA < unitB)
		? (value * factor[property][unit(unitA)]) / factor[property][unit(unitB)]
		: (value / factor[property][unit(unitB)]) * factor[property][unit(unitA)]
}

export { property, factor, convert }