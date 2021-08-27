<template>
	<div>
		<input
			class="input"
			type="number"
			@input="e => $emit('change:value', e)"
			:value="value"
		/>
		
		<select class="input" style="width: 100%;" @click="e => $emit('change:unit', e)">
			<option
				v-for="(unitName, index) in unit"
				:key="index"
				:value="index"
			>
				{{unitName}}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
interface Props {
  unit: string[]
	value: number
}
defineProps<Props>()
defineEmits(['change:value', 'change:unit'])
const rand = Math.floor(Math.random() * 9999).toString();
</script>

<style>
/* .radio {
	display: flex;
	align-items: center;
	padding: .5em;
	padding-left: 0;
}
.radio input {
	cursor: pointer;
	appearance: none;
	user-select: none;
	color: #55678e;
	margin: 0;
	margin-right: .5em;
}
.radio input:checked {
	background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
	background-color: currentColor;
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat;
}
.radio label {
	width: 100%;
	text-align: left;
	cursor: pointer;
	font-weight: bold;
} */

input[type=number] {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	-moz-appearance: textfield;
	width: 100%;
	margin-bottom: 1em;
}
</style>