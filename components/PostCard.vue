<template>
  <v-card 
    class="mb-4 post-card" 
    elevation="2" 
    @click.stop="$router.push(`/post/${post._id}`)"
    hover
  >
   <v-card-title class="pb-2 text-wrap">
     <h3 class="title-text">{{ post._source.titulo }}</h3>
   </v-card-title>
    
    <v-card-text>
      <v-chip size="small" color="blue" variant="tonal" class="mr-2">
        {{ post._source.disciplina }}
      </v-chip>
      <v-chip size="small" color="purple" variant="tonal" >
            {{  post._source.questoes.length }} Quest <span> {{ post._source.questoes.length > 1 ? 'ões' : 'ão'  }}  </span> 
      </v-chip>
        <small class="text-medium-emphasis">
           Publicado em {{ formatDate(post._source?.timestamp) }}
        </small>
      <v-row class="meta-info my-5" dense>
        <v-col cols="12" v-if="post._source?.arts">
          <v-chip size="small"  class="mr-1 mb-1" variant="tonal" v-for="art, a in post._source?.arts" :key="a">
            Art. {{ art }}
          </v-chip>
        </v-col>
        <v-col cols="6" v-else>
          <v-chip size="small" color="green" variant="tonal">
            Artigo {{ post._source?.art }}
          </v-chip>
        </v-col>
       
      </v-row>
      <div class="post-content mb-3 px-1">
        <div class="text-body-1 mb-4 line-height-relaxed text-content"  v-html="getTextPreview(highlightedContent || highlightedContent, expanded.has(post)) "> 
        </div>
        <v-btn
          variant="text"
          size="small"
          color="primary"
          class="pa-0 ml-1"
          @click.stop="$router.push(`/post/${post._id}`)"
        >
          {{ expanded.has(index) ? 'Ver menos' : 'Ver mais' }}
        </v-btn>
      </div>
      
      <div class="tags-container my-5">
         <v-chip-group>
                <v-chip
                  v-for="palavra in post._source.palavras_chaves?.slice(0, showAllKeywords.has(post) ?  post._source.palavras_chaves?.length : 4)"
                  :key="palavra"
                  size="x-small"
                  variant="outlined"
                  color="primary"
                >
                  {{ palavra }}
                </v-chip>
                <v-chip
                  v-if="post._source.palavras_chaves?.length > 4 && !showAllKeywords.has(post)"
                  size="x-small"
                  variant="text"
                  @click.stop="toggleKeywords(post)"
                >
                  +{{  post._source.palavras_chaves?.length - 4 }} mais
                </v-chip>
          </v-chip-group>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
  interface Props {
    post: any
  }

  const props = defineProps<Props>()

  const showAllKeywords = reactive(new Set())
  const expanded = reactive(new Set())

  const toggleExpanded = (index) => {
    if (expanded.has(index)) {
      expanded.delete(index)
    } else {
      expanded.add(index)
    }
  }

  const toggleKeywords = (index) => {
    if (showAllKeywords.has(index)) {
      showAllKeywords.delete(index)
    } else {
      showAllKeywords.add(index)
    }
  }

  const getTextPreview = (text, isExpanded) => {
    if (isExpanded || text?.length <= 500) {
      return text
    }
    return text?.substring(0, 500) + '...'
  }

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

  .title-text {
    font-size: 1.1rem;
    line-height: 1.3;
    font-weight: 600;
    color: rgb(15, 20, 25);
  }

</style>