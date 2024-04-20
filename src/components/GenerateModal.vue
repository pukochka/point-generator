<template>
  <q-dialog full-width v-model="generator.modal" position="bottom">
    <q-card>
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        color="amber"
        :rows-per-page-options="[0]"
        hide-bottom
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              <div class="text-h6">{{ col.label }}</div>
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body-cell="props">
          <q-td :props="props" v-if="props.col.name === 'name' + ''">
            <div class="text-wrap text-h6" v-html="props.value"></div>
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
          no-caps
          flat
          size="md"
          label="Закрыть"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGeneratorStore } from 'stores/generatorStore';
import { rows } from 'src/lib/meta';

const generator = useGeneratorStore();

const columns: any = [
  { name: 'name', align: 'center', label: 'Объект', field: 'name' },
  { name: 'rls', label: 'РЛС', field: 'rls' },
  { name: 'freq', label: 'ДРЧ, МГц', field: 'freq' },
  { name: 'repeat', label: 'Частота повторения, Гц', field: 'repeat' },
  { name: 'power', label: 'Мощность излучения, кВт', field: 'power' },
  { name: 'gain', label: 'Коэфициент усиления, дБ', field: 'gain' },
];
</script>

<style scoped>
.text-wrap {
  white-space: pre-wrap;
}
</style>
