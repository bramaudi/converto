<template>
  <select @change="e => handleChange(e, 'property')">
    <option
      v-for="key in Object.keys(property)"
      :key="key"
      :value="key"
    >
      {{property[~~(key)]}}
    </option>
  </select>

  <h1>Convert</h1>
  <div style="display: flex; justify-content: center;">
    <div>
      <div>
        <input
          type="number"
          @input="e => handleChange(e, 'valueA')"
          :value="state.valueA"
        />
      </div>
      <select @change="e => handleChange(e, 'unitA')">
        <option
          v-for="(unitName, index) in unit[state.property]"
          :key="index"
          :value="index"
        >
          {{unitName}}
        </option>
      </select>
    </div>
    <div>=</div>
    <div>
      <div>
        <input
          type="number"
          @input="e => handleChange(e, 'valueB')"
          :value="state.valueB"
        />
      </div>
      <select @change="e => handleChange(e, 'unitB')">
        <option
          v-for="(unitName, index) in unit[state.property]"
          :key="index"
          :value="index"
        >
          {{unitName}}
        </option>
      </select>
    </div>
  </div>
  <ReloadPrompt />
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue"
import ReloadPrompt from './components/ReloadPrompt.vue'

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
const property: { [key: number]: string } = {}
const unit: { [key: number]: string[] } = {}
const factor: { [key: number]: number[] } = {}

property[0] = 'Binary'
unit[0] = ['KB', 'MB', 'GB']
factor[0] = [1, 0.0009765625, 9.5367431640625e-7]

const calculateValueA = (): number => {
  const propFactor = factor[state.property]
  if (state.unitA == state.unitB) return state.valueB  
  return (state.unitB > state.unitA)
    ? state.valueB / propFactor[state.unitB]
    : state.valueB * propFactor[state.unitA]
}
const calculateValueB = (): number => {
  const propFactor = factor[state.property]
  if (state.unitA == state.unitB) return state.valueA
  return (state.unitB > state.unitA)
    ? state.valueA * propFactor[state.unitB]
    : state.valueA / propFactor[state.unitA]
}
const handleChange = (e: Event, stateProp: string) => {
  const target = (<HTMLInputElement>e.currentTarget)
  state[stateProp] = ~~(target.value)
  
  if (stateProp === 'unitA') state.valueA = calculateValueA()
  if (stateProp === 'unitB') state.valueB = calculateValueB()
}

watch(() => state.valueA, () => {
  state.valueB = calculateValueB()
})
watch(() => state.valueB, () => {
  state.valueA = calculateValueA()
})
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  background: #2c3e50;
  color: #fff;
}
</style>
