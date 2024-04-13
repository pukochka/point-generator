<template>
  <q-dialog v-model="generator.modal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Введите название файла</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="generator.filename" outlined />
      </q-card-section>

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
</script>

<style scoped></style>
