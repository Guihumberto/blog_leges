<template>
  <v-container>
    <div v-if="pending" class="text-center py-8">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </div>
    
    <div v-else-if="error || !post" class="text-center py-8">
      <v-alert type="error">Post não encontrado</v-alert>
    </div>
    
    <div v-else>
      <v-breadcrumbs 
        :items="breadcrumbs" 
        class="px-0"
      ></v-breadcrumbs>
      
      <article>
        <header class="mb-6">
          <h1 class="text-h4 mb-4">{{ post.titulo }}</h1>
          
          <div class="meta-info mb-4">
            <v-row>
              <v-col cols="12" sm="6">
                <v-chip color="blue" variant="tonal">
                  <strong class="mr-2">Disciplina:</strong> {{ post.disciplina }}
                </v-chip>
              </v-col>
              <v-col cols="12" sm="6" md="3" v-if="post?.banca">
                <v-chip color="green" variant="tonal">
                  <strong>Banca:</strong> {{ post.banca }}
                </v-chip>
              </v-col>
              <v-col cols="12" sm="6" md="3" v-if="post?.concurso">
                <v-chip color="orange" variant="tonal">
                  <strong>Concurso:</strong> {{ post.concurso }}
                </v-chip>
              </v-col>
              <v-col cols="12" sm="6" md="3" v-if="post?.cargo">
                <v-chip color="purple" variant="tonal">
                  <strong>Cargo:</strong> {{ post.cargo }}
                </v-chip>
              </v-col>
            </v-row>
          </div>
          
          <div class="tags-container mb-4">
            <v-chip
              v-for="tag in post.palavras_chaves"
              :key="tag"
              class="me-2 mb-2"
              color="primary"
              variant="outlined"
            >
              {{ tag }}
            </v-chip>
          </div>
          
          <p class="text-body-2 text-medium-emphasis">
            Publicado em {{ formatDate(post?.timestamp) }}
          </p>
        </header>
        
        <div class="post-content" v-html="post.texto"></div>
      </article>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const { searchPosts } = useElasticsearch()

const post = ref(null)
const pending = ref(true)
const error = ref(null)

const breadcrumbs = computed(() => [
  { title: 'Início', to: '/' },
  { title: 'Post', disabled: true }
])

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO dinâmico
watchEffect(() => {
  if (post.value) {
    useHead({
      title: `${post.value.titulo} - Legislação Educacional`,
      meta: [
        { 
          name: 'description', 
          content: post.value.texto.substring(0, 160).replace(/<[^>]*>/g, '') + '...' 
        },
        { 
          name: 'keywords', 
          content: post.value.palavras_chaves.join(', ') 
        },
        { property: 'og:title', content: post.value.titulo },
        { property: 'og:description', content: post.value.texto.substring(0, 160).replace(/<[^>]*>/g, '') },
        { property: 'og:type', content: 'article' }
      ]
    })
  }
})

onMounted(async () => {
  try {
    const result = await $fetch(`/api/elasticsearch/post/${route.params.id}`)
    post.value = result.data
    error.value = null
  } catch (err) {
    error.value = err
    console.error('Erro ao carregar post:', err)
  } finally {
    pending.value = false
  }
})
</script>

<style scoped>
.post-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.post-content :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
}

.post-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 500;
}

.post-content :deep(p) {
  margin-bottom: 1rem;
}

.post-content :deep(ul), 
.post-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.meta-info {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #fafafa;
}
</style>