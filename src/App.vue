<template>
  <div style="display: flex; justify-content: center;">
    <select class="input select-property" @change="e => handleChange(e, 'property')">
      <option
        v-for="key in Object.keys(property)"
        :key="key"
        :value="key"
      >
        {{property[~~(key)]}}
      </option>
    </select>
  </div>

  <div style="display: flex; justify-content: center; align-items: start;">
    <input-value
      @change:value="e => handleChange(e, 'valueA')"
      @change:unit="e => handleChange(e, 'unitA')"
      :unit="Object.keys(factor[state.property])"
      :value="state.valueA"
    />
    <div class="divider">=</div>
    <input-value
      @change:value="e => handleChange(e, 'valueB')"
      @change:unit="e => handleChange(e, 'unitB')"
      :unit="Object.keys(factor[state.property])"
      :value="state.valueB"
    />
  </div>
  <ReloadPrompt />
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import { property, factor, convert } from './unit'
import ReloadPrompt from './components/ReloadPrompt.vue'
import InputValue from './components/InputValue.vue'

interface State {
  [key: string]: number;
  property: number;
  unitA: number;
  unitB: number;
  valueA: number;
  valueB: number;
}

const state: State = reactive({
  property: 0,
  unitA: 0,
  unitB: 0,
  valueA: 0,
  valueB: 0
})

const handleChange = (e: Event, prop: string) => {
  const {value} = (<HTMLInputElement>e.currentTarget)
  state[prop] = parseInt(value)

  if (prop === 'valueB') {
    state.valueA = convert(state.valueB, [state.unitB, state.unitA])
  } else {
    state.valueB = convert(state.valueA, [state.unitA, state.unitB])
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  max-width: 600px;
  width: 100%;
  margin: auto;
  padding: 2em;
  background: #2c3e50;
  color: #fff;
}
.divider {
  font-size: medium;
  margin: 0 .2em;
	padding: .7em;
}
.input {
	background-color: #3b556f;
	color: #eee;
	border: 1px solid transparent;
	border-radius: 0.375rem;
	padding: .7em;
	font-weight: bold;
  font-size: medium;
}
.input:focus {
	outline: none;
	box-shadow: 0 0 0 0 #fff, 0 0 0 calc(1px + 0px) rgba(59, 130, 246, 0.5), 0 0 #0000;
	box-shadow: 0 0 0 0 #fff, 0 0 0 calc(1px + 0px) rgba(59, 130, 246, 0.5), 0 0 #0000;
	border-color: #2563eb;
}

.select-property {
  margin-bottom: 1em;
}
</style>
