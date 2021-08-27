const factor = {}
factor[0] = {
	b: 1,
	kb: 0.0009765625,
	mb: 9.5367431640625e-7
}

const unit = (i) => Object.keys(factor[0])[i]

const convert = (value, units) => {
	const [unitA, unitB] = units
	if (unitA == unitB) return value
	return (unitA < unitB)
		? value * factor[0][unit(unitA > 0 ? unitA : unitB)]
		: value / factor[0][unit(unitB > 0 ? unitB : unitA)]
}

test('factor keys should in order', () => {	
	expect(unit(0)).toBe('b');
	expect(unit(1)).toBe('kb');
	expect(unit(2)).toBe('mb');
});

test('1b = b,kb,mb', () => {
	expect(convert(1, [0,0])).toBe(1);
	expect(convert(1, [0,1])).toBe(0.0009765625);
	expect(convert(1, [0,2])).toBe(9.5367431640625e-7);
});
test('1kb = b,kb,mb', () => {
	expect(convert(1, [1,0])).toBe(1024);
	expect(convert(1, [1,1])).toBe(1);
	expect(convert(1, [1,2])).toBe(0.0009765625);
});
test('1mb = b,kb,mb', () => {
	expect(convert(1, [2,0])).toBe(1048576);
	expect(convert(1, [2,1])).toBe(1024);
	expect(convert(1, [2,2])).toBe(1);
});
