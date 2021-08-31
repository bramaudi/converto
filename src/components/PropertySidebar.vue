<template>
	<div class="property-sidebar">
		<div
			v-for="(propName, index) in property()"
			:key="index"
			class="radio"
		>
			<input
				:value="index"
				:checked="index == selected"
				:id="`radio_${index}`"
				@click="e => $emit('change:value', e)"
				class="input"
				type="radio"
				name="property"
			/>
			<label :for="`radio_${index}`">{{propName}}</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  property: () => string[]
	propertySelected: number
}

const props = defineProps<Props>()
defineEmits(['change:value'])

const selected = computed(() => props.propertySelected)
</script>

<style>
.property-sidebar {
	display: none;
	padding-right: 3em;
	float: left;
	width: 25%;
}
.radio {
	display: flex;
	align-items: center;
	padding: 0;
}
.radio input {
	cursor: pointer;
	appearance: none;
	user-select: none;
	color: #55678e;
	margin: 0;
	margin-right: .5em;
	margin-bottom: .3em;
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
	padding: .5em;
}

@media screen and (min-width: 700px) {
	.property-sidebar {
		display: block !important;
	}
}
</style>