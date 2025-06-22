<template>
  <v-card 
    class="mb-4 post-card" 
    elevation="2" 
    :to="`/post/${post._id}`"
    hover
  >
    <v-card-title class="text-h6 pb-2">
      {{ post._source.titulo }}
    </v-card-title>
    
    
    <v-card-text>
        <small class="text-medium-emphasis">
           Publicado em {{ formatDate(post._source?.timestamp) }}
        </small>
      <v-row class="meta-info mb-5" dense>
        <v-col cols="6">
          <v-chip size="small" color="blue" variant="tonal" v-if="post._source.disciplina">
            {{ post._source.disciplina }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="3" v-if="post._source?.banca">
          <v-chip size="small" color="green" variant="tonal">
            {{ post._source?.banca }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="3" v-if="post._source?.concurso">
          <v-chip size="small" color="orange" variant="tonal" >
            {{ post._source?.concurso }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="3" v-if="post._source.cargo">
          <v-chip size="small" color="purple" variant="tonal" >
            {{ post._source.cargo }}
          </v-chip>
        </v-col>
      </v-row>
      <div class="post-content mb-3 px-1">
        <div v-html="highlightedContent"></div>
      </div>
      
      <div class="tags-container my-5">
        <v-chip
          v-for="tag in post._source.palavras_chaves"
          :key="tag"
          size="small"
          class="me-1 mb-1"
          color="primary"
          variant="outlined"
        >
          {{ tag }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
interface Props {
  post: any
}

const props = defineProps<Props>()

const highlightedContent = computed(() => {
  if (props.post.highlight?.texto?.[0]) {
    return props.post.highlight?.texto[0]
  }
  return props.post._source?.texto //?.substring(0, 300) + '...'
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.post-card {
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-2px);
}

.post-content {
  line-height: 1.6;
}

.tags-container {
  min-height: 32px;
}

.meta-info {
  border-top: 1px solid #e0e0e0;
  padding-top: 12px;
}
</style>