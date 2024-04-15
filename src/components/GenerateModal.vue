<template>
  <q-dialog full-width v-model="generator.modal">
    <q-card>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        color="amber"
        hide-bottom
      >
        <template v-slot:body-cell="props">
          <q-td :props="props" v-if="props.col.name === 'name' + ''">
            <q-badge color="blue" :label="props.value" />
          </q-td>

          <q-td :props="props" v-else>
            <div class="" v-for="item in props.value" :key="item">
              {{ item }}
            </div>
          </q-td>
        </template>
      </q-table>

      <q-card-actions align="right">
        <q-btn
          flat
          size="md"
          label="OK"
          color="primary"
          @click="generator.createFile"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGeneratorStore } from 'stores/generatorStore';

const generator = useGeneratorStore();

const rows = [
  {
    name: 'Авианосец «Нимиц» (CVN-68)',
    rls: ['AN/SPS-48E', 'AN/SPS-49(V)5', 'AN/SPN-46'],
    freq: ['2900-3100', '880-910', '3590-3700;33000-33400'],
    repeat: ['1000-2350', '3.3-4.85', '2000'],
    power: ['2400', '360', '50'],
    gain: ['38.5', '38', '30'],
  },
  {
    name: 'Kрейсера типа «Тикондерог»',
    rls: ['AN/SPY-1A', 'AN/SPS-49', 'AN/SPS-55'],
    freq: ['2900-3100', '880-910', '3590-3700;33000-33400'],
    repeat: ['1000-2350', '3.3-4.85', '2000'],
    power: ['2400', '360', '50'],
    gain: ['38.5', '38', '30'],
  },
];

const columns = [
  { name: 'name', align: 'center', label: 'Объект', field: 'name' },
  { name: 'rls', label: 'РЛС', field: 'rls' },
  { name: 'freq', label: 'ДРЧ, МГц', field: 'freq' },
  { name: 'repeat', label: 'Частота повторения, Гц', field: 'repeat' },
  { name: 'power', label: 'Мощность излучения, кВт', field: 'power' },
  { name: 'gain', label: 'Коэфициент усиления, дБ', field: 'gain' },
];
</script>

<style scoped></style>
