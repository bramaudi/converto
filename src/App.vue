<template>
  <div class="app">
    <div class="sm-only" style="display: flex; justify-content: center;">
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
    
    <property-sidebar
      :property="() => property"
      :property-selected="state.property"
      @change:value="e => handleChange(e, 'property')"
    />
    <div class="conversion">
      <input-value
        @change:value="e => handleChange(e, 'valueA')"
        @change:unit="e => handleChange(e, 'unitA')"
        :unit="Object.keys(factor[state.property])"
        :unit-selected="state.unitA"
        :value="state.valueA"
      />
      <div class="divider">=</div>
      <input-value
        @change:value="e => handleChange(e, 'valueB')"
        @change:unit="e => handleChange(e, 'unitB')"
        :unit="Object.keys(factor[state.property])"
        :unit-selected="state.unitB"
        :value="state.valueB"
      />
    </div>

    <div class="formula">{{formulaComputed}}</div>
    <ReloadPrompt />
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue"
import { property, factor, convert, formula, formulaTemperature } from './conversion'
import ReloadPrompt from './components/ReloadPrompt.vue'
import InputValue from './components/InputValue.vue'
import PropertySidebar from "./components/PropertySidebar.vue"

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

watch(() => state.property, () => {
  state.valueA = 0
  state.valueB = 0
  state.unitA = 0
  state.unitB = 0
})

const handleChange = (e: Event, prop: string) => {
  const {value} = (<HTMLInputElement>e.currentTarget)
  const temperatur = property[state.property] === 'Temperature'
  state[prop] = parseInt(value)

  if (prop === 'valueA' || prop === 'unitB' || prop === 'unitA') {
    state.valueB = convert(state.property, state.valueA, [state.unitA, state.unitB], temperatur)
    return
  }
  if (prop === 'valueB') {
    state.valueA = convert(state.property, state.valueB, [state.unitA, state.unitB], temperatur)
    return
  }
}

const formulaComputed = computed(() => {
  const [math, unitFactor] = formula(state.property, [state.unitA, state.unitB])
  const propName = property[state.property].toLowerCase()
  if (state.unitA == state.unitB) return ''
  return (property[state.property] === 'Temperature')
    ? `[Formula] ${formulaTemperature(state.valueA, [state.unitA, state.unitB])}`
    : `[Formula] ${math} ${propName} value with ${unitFactor}`
})
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
  height: 100vh;
  width: 100%;
  margin: auto;
  padding: 2em;
  background: #2c3e50;
  color: #fff;
}
.conversion {
  float: left;
  display: flex;
}
.formula {
  text-align: center;
  margin: 3em 0;
  float: left;
  width: 100%;
}
.divider {
  font-size: xx-large;
  margin: 0 .3em;
  padding: .1em;
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

@media screen and (min-width: 768px) {
  body {
    max-width: 1024px;
    padding: 2em;
  }

  .conversion, .formula { width: 70%; }

  .sm-only { display: none !important; }
}
</style>
