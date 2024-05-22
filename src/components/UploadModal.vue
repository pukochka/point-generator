<template>
  <q-dialog v-model="store.modal">
    <q-card flat bordered style="width: 100%">
      <q-card-section>
        <div class="text-h6">Выберите файл</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list separator class="rounded-borders overflow-hidden">
          <q-item
            clickable
            @click="selected = 1"
            :active="selected === 1"
            active-class="bg-blue text-white"
          >
            <q-item-section>Обстановка 1</q-item-section>
          </q-item>

          <q-item
            clickable
            @click="selected = 2"
            :active="selected === 2"
            active-class="bg-blue text-white"
          >
            <q-item-section>Обстановка 2</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat size="md" label="Закрыть" color="primary" v-close-popup />

        <q-btn
          unelevated
          size="md"
          label="Выбрать"
          color="primary"
          @click="selectSituation"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useGeneratorStore } from 'stores/generatorStore';
import { ref } from 'vue';
import {
  firstGroup,
  forthGroup,
  secondGroup,
  thirdGroup,
} from 'src/lib/three/axes';

const store = useGeneratorStore();

const selected = ref(0);

const selectSituation = () => {
  store.situation = selected.value;

  if (selected.value === 1) {
    firstGroup.visible = true;
    secondGroup.visible = false;
    thirdGroup.visible = false;
    forthGroup.visible = false;
    return;
  }

  firstGroup.visible = false;
  secondGroup.visible = false;
  thirdGroup.visible = true;
  forthGroup.visible = false;
};
</script>

<style scoped></style>
