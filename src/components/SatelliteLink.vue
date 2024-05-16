<template>
  <q-tabs dense no-caps v-model="tab" active-class="bg-primary text-white">
    <q-tab name="efs" label="Формуляр" class="col" />
    <q-tab name="info" label="Сведения о РЭС" class="col" />
  </q-tabs>

  <q-tab-panels
    v-model="tab"
    animated
    transition-next="fade"
    transition-prev="fade"
  >
    <q-tab-panel name="efs" class="q-pa-none">
      <q-item dense class="text-center text-weight-bold">
        <q-item-section>Дата</q-item-section>

        <q-item-section>Коорд.</q-item-section>

        <q-item-section>Частота, МГц</q-item-section>
      </q-item>

      <q-list dense style="width: 700px; max-height: 500px; overflow-y: scroll">
        <q-item v-for="(item, index) of efs" :key="index" class="text-center">
          <q-item-section>
            {{ item.date }}
          </q-item-section>

          <q-item-section>
            {{ item.lat.toFixed(3) }}, {{ item.lon.toFixed(3) }}
          </q-item-section>

          <q-item-section>
            {{ item.freq.toFixed() }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-tab-panel>

    <q-tab-panel name="info" class="q-pa-none">
      <q-item class="text-weight-bold">
        <q-item-section>
          <q-item-label>Название</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>Описание</q-item-label>
        </q-item-section>

        <q-item-section class="text-center">
          <q-item-label>ДРЧ, МГц</q-item-label>
        </q-item-section>
      </q-item>

      <div class="" v-for="item in observations" :key="item.label">
        <div class="text-center text-body1 text-weight-bold">
          {{ item.label }}
        </div>

        <q-list dense>
          <q-item
            v-for="(rls, index) of store.tab === '1'
              ? item.list
              : item.list.filter((r) => r.civilian)"
            :key="index"
          >
            <q-item-section>
              <q-item-label>{{ rls.label }}</q-item-label>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ rls.desc }}</q-item-label>
            </q-item-section>

            <q-item-section class="text-center">
              <q-item-label>{{ rls.range[0] }}-{{ rls.range[1] }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { efs1, efs2, observations } from 'src/lib/meta';
import { useGeneratorStore } from 'stores/generatorStore';

const store = useGeneratorStore();

const tab = ref('efs');

const efs = computed(() => (store.tab === '1' ? efs1 : efs2));
</script>

<style scoped></style>
