<template>
	<div>
		<input
			class="input"
			type="number"
			@input="e => $emit('change:value', e)"
			:value="value"
		/>
		
		<select class="input" style="width: 100%;" @change="e => $emit('change:unit', e)">
			<option
				v-for="(unitName, index) in unit"
				:key="index"
				:value="index"
				:selected="index == selectedUnit"
			>
				{{unitName}}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  unit: string[]
	unitSelected: number
	value: number
}
const props = defineProps<Props>()
defineEmits(['change:value', 'change:unit'])

const selectedUnit = computed(() => props.unitSelected)
</script>

<style>
input[type=number] {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	-moz-appearance: textfield;
	width: 100%;
	margin-bottom: 1em;
}
</style>