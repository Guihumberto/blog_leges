<template>
  <v-card class="mb-4">
    <v-card-title>
      <v-icon icon="mdi-filter" class="me-2"></v-icon>
      Filtros
    </v-card-title>
    
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="localFilters.search"
            label="Buscar"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            clearable
            @input="debounceSearch"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="localFilters.disciplina"
            :items="disciplinas"
            label="Disciplina"
            variant="outlined"
            density="compact"
            clearable
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="localFilters.banca"
            :items="bancas"
            label="Banca"
            variant="outlined"
            density="compact"
            clearable
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="localFilters.concurso"
            :items="concursos"
            label="Concurso"
            variant="outlined"
            density="compact"
            clearable
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="localFilters.cargo"
            :items="cargos"
            label="Cargo"
            variant="outlined"
            density="compact"
            clearable
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="localFilters.area"
            :items="areas"
            label="Área"
            variant="outlined"
            density="compact"
            clearable
          ></v-select>
        </v-col>
        
        <v-col cols="12" sm="6" md="3">
          <v-btn
            color="primary"
            variant="outlined"
            @click="clearFilters"
            block
          >
            Limpar Filtros
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  filters: any
  aggregations: any
}

interface Emits {
  (e: 'update:filters', value: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localFilters = ref({ ...props.filters })

// Computed para as opções dos selects
const disciplinas = computed(() => 
  props.aggregations?.disciplinas?.buckets?.map((bucket: any) => ({
    title: `${bucket.key} (${bucket.doc_count})`,
    value: bucket.key
  })) || []
)

const bancas = computed(() => 
  props.aggregations?.bancas?.buckets?.map((bucket: any) => ({
    title: `${bucket.key} (${bucket.doc_count})`,
    value: bucket.key
  })) || []
)

const concursos = computed(() => 
  props.aggregations?.concursos?.buckets?.map((bucket: any) => ({
    title: `${bucket.key} (${bucket.doc_count})`,
    value: bucket.key
  })) || []
)

const cargos = computed(() => 
  props.aggregations?.cargos?.buckets?.map((bucket: any) => ({
    title: `${bucket.key} (${bucket.doc_count})`,
    value: bucket.key
  })) || []
)

const areas = computed(() => 
  props.aggregations?.areas?.buckets?.map((bucket: any) => ({
    title: `${bucket.key} (${bucket.doc_count})`,
    value: bucket.key
  })) || []
)

// Debounce para busca
const debounceSearch = useDebounceFn(() => {
  emit('update:filters', { ...localFilters.value })
}, 500)

// Watch para mudanças nos filtros
watch(localFilters, (newFilters) => {
  emit('update:filters', { ...newFilters })
}, { deep: true })

const clearFilters = () => {
  localFilters.value = {
    search: '',
    disciplina: null,
    banca: null,
    concurso: null,
    cargo: null,
    area: null
  }
}

// Função de debounce simples
function useDebounceFn(fn: Function, delay: number) {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
</script>