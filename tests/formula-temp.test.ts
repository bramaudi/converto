import { formulaTemperature } from '../src/conversion'

test('Conversion between Celsius and Fahreheit', () => {
	expect(formulaTemperature(1, [0,1])).toBe('(1 °C × 9/5) + 32 = 33.8 °F');
	expect(formulaTemperature(1, [1,0])).toBe('(1 °F − 32) × 5/9 = -17.2222 °C');
});

test('Conversion between Celsius and Kelvin', () => {
	expect(formulaTemperature(1, [0,2])).toBe('1 °C + 273,15 = 274.15 K');
	expect(formulaTemperature(1, [2,0])).toBe('1 K - 273,15 = -272.15 °C');
});

test('Conversion between Celsius and Rankine', () => {
	expect(formulaTemperature(1, [0,3])).toBe('1 °C × 9/5 + 491,67 = 493.47 °R');
	expect(formulaTemperature(1, [3,0])).toBe('(1 °R − 491,67) × 5/9 = -272.594 °C');
});

test('Conversion between Fahrenheit and Kelvin', () => {
	expect(formulaTemperature(1, [1,2])).toBe('(1 °F − 32) × 5/9 + 273,15 = 255.928 K');
	expect(formulaTemperature(1, [2,1])).toBe('(1 K − 273,15) × 9/5 + 32 = -457.87 °F');
});

test('Conversion between Fahrenheit and Rankine', () => {
	expect(formulaTemperature(1, [1,3])).toBe('1 °F + 459,67 = 460.67 °R');
	expect(formulaTemperature(1, [3,1])).toBe('1 °R - 459,67 = -458.67 °F');
});

test('Conversion between Kelvin and Rankine', () => {
	expect(formulaTemperature(1, [2,3])).toBe('1 K × 1,8 = 1.8 °R');
	expect(formulaTemperature(1, [3,2])).toBe('1 °R × 5/9 = 0.555556 K');
});