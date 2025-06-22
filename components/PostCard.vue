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
        <v-col cols="6" sm="4" v-if="post._source?.disciplina">
          <v-chip size="small" color="blue" variant="tonal" >
            {{ post._source.disciplina }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="2" v-if="post._source?.art">
          <v-chip size="small" color="green" variant="tonal">
            Artigo {{ post._source?.art }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="3" v-if="post._source?.arts">
          outros artigos: 
          <v-chip size="small" color="orange" class="mr-1" variant="tonal" v-for="art, a in post._source?.arts" :key="a">
            {{ art }}
          </v-chip>
        </v-col>
        <v-col cols="6" sm="3" v-if="post._source?.questoes?.length">
          <v-chip size="small" color="purple" variant="tonal" >
            {{  post._source.questoes.length }} Quest <span> {{ post._source.questoes.length > 1 ? 'ões' : 'ão'  }}  </span> 
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