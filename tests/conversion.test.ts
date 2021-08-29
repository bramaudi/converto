import { property, factor, convert } from '../src/conversion'

const convertTemperature = (value: number, units: [number, number]) => {
	return convert(property.findIndex(x => x === 'Temperature'), value, units, true)
}

it('should match unit name with reference', () => {
	const unit = (i: number) => Object.keys(factor[2])[i]
	expect(property[2]).toBe('Data');
	expect(unit(2)).toBe('kilobits [Kb]');
	expect(unit(3)).toBe('kilobytes [KB]');
	expect(unit(4)).toBe('megabits [Mb]');
	expect(unit(5)).toBe('megabytes [MB]');

	expect(factor[2][unit(5)]).toBe(1099511627776.000000);
	expect(property.findIndex(x => x === 'Data')).toBe(2);
});

test('Upstair and downstair based conversion', () => {
	// 1 MB = 1024 KB and vice versa
	expect(convert(2, 1, [5, 3])).toBe(1024);
	expect(convert(2, 1, [3, 5])).toBeCloseTo(0.0009765625);
});

test('Temperature unit conversion, which treat differently', () => {
	// 1 Celsius = 33.8 Fahrenheit
	expect(convertTemperature(1, [0, 1])).toBeCloseTo(33.8);
	// 1 Fahrenheit = -17,2222 Celsius
	expect(convertTemperature(1, [1, 0])).toBeCloseTo(-17.2222);
	// 250 Kelvin = -9,67 Fahrenheit
	expect(convertTemperature(250, [2, 1])).toBeCloseTo(-9.67);
})


// Celcius to Fahrenheit, Kelvin, Rankine and vice versa

test('Celcius to Fahrenheit (<)', () => {
	expect(convertTemperature(1, [0, 1])).toBeCloseTo(33.8000000000018);
});
test('Celcius to Kelvin (>)', () => {
	expect(convertTemperature(1, [0, 2])).toBe(274.15);
});
test('Celcius to Rankine (<)', () => {
	expect(convertTemperature(1, [0, 3])).toBeCloseTo(493.4700000000018);
});

// Fahrenheit to Celsius, Kelvin, Rankine and vice versa

test('Fahrenheit to Kelvin (<)', () => {
	expect(convertTemperature(1, [1, 2])).toBeCloseTo(255.92777777779497);
});
test('Fahrenheit to Celcius (>)', () => {
	expect(convertTemperature(1, [1, 0])).toBeCloseTo(-17.222222222205);
});
test('Fahrenheit to Rankine (>)', () => {
	expect(convertTemperature(1, [1, 3])).toBe(460.67);
});

// Kelvin to Celsius, Fahrenheit, Rankine and vice versa

test('Kelvin to Celcius (>)', () => {
	expect(convertTemperature(1, [2, 0])).toBe(-272.15);
});
test('Kelvin to Fahrenheit (>)', () => {
	expect(convertTemperature(1, [2, 1])).toBeCloseTo(-457.8700000004898);
});
test('Kelvin to Rankine (<)', () => {
	expect(convertTemperature(1, [2, 3])).toBeCloseTo(1.7999999995101916);
});

// Kelvin to Celsius, Fahrenheit, Rankine and vice versa

test('Rankine to Celsius (>)', () => {
	expect(convertTemperature(1, [3, 0])).toBeCloseTo(-272.59444444417187);
});
test('Rankine to Fahrenheit (>)', () => {
	expect(convertTemperature(1, [3, 1])).toBeCloseTo(-458.67);
});
test('Rankine to Kelvin (>)', () => {
	expect(convertTemperature(1, [3, 2])).toBeCloseTo(0.5555555558281071);
});