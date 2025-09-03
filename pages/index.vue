<template>
  <Header />
  <section class="tw-bg-gradient-to-br tw-from-blue-600 tw-via-blue-700 tw-to-purple-800 tw-text-white tw-py-20 tw-relative tw-overflow-hidden">
        <div class="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-20"></div>

        <!-- Floating elements -->
        <div class="tw-absolute tw-top-10 tw-left-10 tw-opacity-20">
            <div class="tw-w-32 tw-h-32 tw-bg-white tw-rounded-full tw-animate-float"></div>
        </div>
        <div class="tw-absolute tw-bottom-10 tw-right-10 tw-opacity-20" style="animation-delay: -3s;">
            <div class="tw-w-24 tw-h-24 tw-bg-white tw-rounded-full tw-animate-float"></div>
        </div>

        <div class="tw-container tw-mx-auto tw-px-4 tw-relative tw-z-10">
            <div class="tw-max-w-4xl tw-mx-auto tw-text-center tw-animate-fade-in">
                <div class="tw-inline-flex tw-items-center tw-px-6 tw-py-3 tw-bg-white tw-bg-opacity-20 tw-rounded-full tw-mb-8 tw-backdrop-filter tw-backdrop-blur-sm tw-border tw-border-white tw-border-opacity-20">
                    <svg class="tw-w-5 tw-h-5 tw-mr-2 tw-text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="tw-font-semibold">CONTEÚDO PREMIUM</span>
                </div>

                <h1 class="tw-text-5xl tw-md:text-6xl tw-font-bold tw-mb-6 tw-leading-tight">
                    Blog <span class="tw-text-transparent tw-bg-clip-text tw-bg-gradient-to-r tw-from-yellow-400 tw-to-orange-500">Estudo da Lei</span>
                </h1>

                <p class="tw-text-xl tw-md:text-2xl tw-mb-8 tw-text-gray-100 tw-leading-relaxed tw-max-w-3xl tw-mx-auto">
                    Textos explicativos e questões sobre legislação para concursos<br>
                    <span class="tw-text-lg tw-opacity-90">Organizado por disciplina, banca, concurso e cargo</span>
                </p>

            </div>
        </div>
  </section>
  <section class="py-12 bg-blue-grey-lighten-5">
    <FilterPanel 
      :filters="filters" 
      :aggregations="aggregations"
      @update:filters="updateFilters"
    />
  </section>
  <v-container fluid style="max-width: 1250px;">    
    
    <v-row>
      <v-col cols="12">
        <div v-if="pending" class="text-center py-8">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
          <p class="mt-4">Carregando posts...</p>
        </div>
        
        <div v-else-if="error" class="text-center py-8">
          <v-alert type="error" class="mb-4">
            Erro ao carregar os posts. Tente novamente.
          </v-alert>
        </div>
        
        <div v-else>
          <div class="d-flex justify-space-between align-center mb-4">
            <span class="text-subtitle-2">
              {{ totalPosts }} posts encontrados
            </span>
          </div>
          
          <div v-if="posts.length === 0" class="text-center py-8">
            <v-icon icon="mdi-file-search" size="64" class="text-medium-emphasis mb-4"></v-icon>
            <p class="text-h6">Nenhum post encontrado</p>
            <p class="text-body-2">Tente ajustar os filtros de busca</p>
          </div>
          
          <div v-else>
            <PostCard 
              v-for="post in posts" 
              :key="post._id" 
              :post="post" 
            />
            
            <div v-if="hasMorePosts" class="text-center mt-6">
              <v-btn 
                color="primary" 
                variant="outlined"
                :loading="loadingMore"
                @click="loadMore"
              >
                Carregar Mais
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  // SEO
  useHead({
    title: 'Blog Leges -  Estudo da Lei: Comentários e questões de concurso',
    link: [
      { rel: 'canonical', href: 'https://blogleges.estudodalei.com.br/' }
    ],
    meta: [
      {
        name: 'description',
        content: 'Explore textos explicativos sobre legislação educacional organizados por disciplina, banca, concurso e cargo. Encontre informações atualizadas para concursos públicos.'
      },
      {
        name: 'keywords',
        content: 'legislação educacional, concursos públicos, direito educacional, leis de educação, normativas educacionais'
      }
    ]
  })

  import Header from '~/components/Header.vue'

  const { searchPosts, getAggregations } = useElasticsearch()

  // Estado reativo
  const posts = ref([])
  const aggregations = ref({})
  const totalPosts = ref(0)
  const currentPage = ref(1)
  const pending = ref(true)
  const error = ref(null)
  const loadingMore = ref(false)

  const filters = ref({
    search: '',
    disciplina: null,
    banca: null,
    concurso: null,
    cargo: null,
    area: null
  })

  // Computed
  const hasMorePosts = computed(() => {
    return posts.value.length < totalPosts.value
  })

  // Métodos
  const loadPosts = async (reset = true) => {
    try {
      if (reset) {
        pending.value = true
        currentPage.value = 1
      } else {
        loadingMore.value = true
      }

      const result = await searchPosts(filters.value, currentPage.value, 20)
      
      if (reset) {
        posts.value = result.hits
      } else {
        posts.value.push(...result.hits)
      }
      
      totalPosts.value = result.total.value
      error.value = null
    } catch (err) {
      error.value = err
      console.error('Erro ao carregar posts:', err)
    } finally {
      pending.value = false
      loadingMore.value = false
    }
  }

  const loadAggregations = async () => {
    try {
      aggregations.value = await getAggregations()
    } catch (err) {
      console.error('Erro ao carregar agregações:', err)
    }
  }

  const updateFilters = (newFilters: any) => {
    filters.value = { ...newFilters }
    loadPosts(true)
  }

  const loadMore = () => {
    currentPage.value++
    loadPosts(false)
  }

  // Lifecycle
  onMounted(async () => {
    await Promise.all([
      loadPosts(),
      loadAggregations()
    ])
  })
</script>

<style scoped>
.blog-header {
  background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  border-bottom: 1px solid #e0e0e0;
  padding: 2rem 0;
  margin-bottom: 2rem;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  gap: 3rem;
}

.content-section {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.icon-wrapper {
  background: rgba(33, 150, 243, 0.1);
  border-radius: 50%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  height: 80px;
}

.text-content {
  flex: 1;
}

.blog-title {
  font-size: 2.5rem !important;
  font-weight: 700 !important;
  color: #263238 !important;
  margin-bottom: 0.75rem !important;
  line-height: 1.2 !important;
  letter-spacing: -0.02em;
}

.blog-subtitle {
  font-size: 1.1rem !important;
  color: #546e7a !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  font-weight: 400 !important;
}

.highlight-text {
  color: #37474f;
  font-weight: 500;
}

.image-section {
  flex-shrink: 0;
  position: relative;
}

.law-illustration {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
}

.decorative-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
  height: 1px;
}

.line-1 {
  top: 30%;
  left: -20px;
  right: -20px;
  opacity: 0.6;
}

.line-2 {
  top: 50%;
  left: -30px;
  right: -30px;
  opacity: 0.4;
}

.line-3 {
  top: 70%;
  left: -20px;
  right: -20px;
  opacity: 0.6;
}

/* Responsividade */
@media (max-width: 960px) {
  .header-container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .content-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .blog-title {
    font-size: 2rem !important;
  }
  
  .image-section {
    display: none;
  }
}

@media (max-width: 600px) {
  .blog-header {
    padding: 1.5rem 0;
  }
  
  .header-container {
    padding: 0 1rem;
  }
  
  .blog-title {
    font-size: 1.75rem !important;
  }
  
  .blog-subtitle {
    font-size: 1rem !important;
  }
  
  .icon-wrapper {
    min-width: 60px;
    height: 60px;
    padding: 0.75rem;
  }
}</style>
