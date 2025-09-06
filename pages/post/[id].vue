<template>
  <div class="tw-min-h-screen tw-bg-gray-50">
    <div class="tw-max-w-5xl tw-mx-auto tw-px-4 tw-py-8">
      <div v-if="pending" class="tw-flex tw-justify-center tw-items-center tw-py-16">
        <div class="tw-animate-spin tw-rounded-full tw-h-16 tw-w-16 tw-border-b-2 tw-border-blue-600"></div>
      </div>

      <div v-else-if="error || !post" class="tw-text-center tw-py-16">
        <div class="tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-2xl tw-p-8 tw-max-w-md tw-mx-auto">
          <svg class="tw-w-12 tw-h-12 tw-text-red-500 tw-mx-auto tw-mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <h3 class="tw-text-lg tw-font-semibold tw-text-red-800 tw-mb-2">Post não encontrado</h3>
          <p class="tw-text-red-600">Ocorreu um erro ao carregar o conteúdo.</p>
        </div>
      </div>

      <div v-else class="tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border tw-border-gray-200 tw-overflow-hidden tw-animate-slide-up">
        <div class="tw-p-6 lg:tw-p-8">
          <!-- Breadcrumbs -->
          <nav class="tw-flex tw-mb-6" aria-label="Breadcrumb">
            <ol class="tw-inline-flex tw-items-center tw-space-x-1 md:tw-space-x-3">
              <li class="tw-inline-flex tw-items-center">
                <router-link to="/" class="tw-inline-flex tw-items-center tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-text-blue-600">
                  <svg class="tw-w-3 tw-h-3 tw-mr-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2A1 1 0 0 0 1 10v9a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-6a1 1 0 0 0 1-1h8a1 1 0 0 0 1 1v6a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-9a1 1 0 0 0 .293-.707Z"/>
                  </svg>
                  Início
                </router-link>
              </li>
              <li>
                <div class="tw-flex tw-items-center">
                  <svg class="tw-w-3 tw-h-3 tw-text-gray-400 tw-mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
                  </svg>
                  <span class="tw-ml-1 tw-text-sm tw-font-medium tw-text-gray-500 md:tw-ml-2">Post</span>
                </div>
              </li>
            </ol>
          </nav>

          <article>
            <header class="tw-mb-8">
              <h1 class="tw-text-3xl lg:tw-text-4xl tw-font-bold tw-text-gray-800 tw-mb-6 tw-leading-tight">
                {{ post.titulo }}
              </h1>

              <!-- Chips de informação -->
              <div class="tw-flex tw-flex-wrap tw-gap-3 tw-mb-6">
                <span class="tw-bg-blue-100 tw-text-blue-800 tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-semibold tw-flex tw-items-center">
                  <svg class="tw-w-4 tw-h-4 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                  {{ post.disciplina }}
                </span>
                <span v-if="post?.banca" class="tw-bg-green-100 tw-text-green-800 tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-semibold tw-flex tw-items-center">
                  <svg class="tw-w-4 tw-h-4 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  {{ post.banca }}
                </span>
                <span v-if="post?.concurso" class="tw-bg-orange-100 tw-text-orange-800 tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-semibold tw-flex tw-items-center">
                  <svg class="tw-w-4 tw-h-4 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ post.concurso }}
                </span>
                <span v-if="post?.cargo" class="tw-bg-purple-100 tw-text-purple-800 tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-semibold tw-flex tw-items-center">
                  <svg class="tw-w-4 tw-h-4 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8"/>
                  </svg>
                  {{ post.cargo }}
                </span>
              </div>

              <!-- Tags -->
              <div class="tw-flex tw-flex-wrap tw-gap-2 tw-mb-6">
                <span
                  v-for="tag in post.palavras_chaves"
                  :key="tag"
                  class="tw-bg-gray-100 hover:tw-bg-gray-200 tw-text-gray-700 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium tw-transition-colors tw-cursor-pointer"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Data de publicação -->
              <div class="tw-flex tw-items-center tw-text-sm tw-text-gray-500">
                <svg class="tw-w-4 tw-h-4 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Publicado em {{ formatDate(post?.timestamp) }}
              </div>
            </header>

            <!-- Conteúdo do post -->
            <div class="tw-prose tw-prose-lg tw-max-w-none tw-text-gray-700 tw-leading-relaxed tw-mb-8" v-html="processedContent"></div>

            <!-- Mind Map Section -->
            <div v-if="mindMap" class="tw-mb-8">
              <!-- <div class="tw-bg-blue-50 tw-rounded-2xl tw-p-6 tw-border tw-border-blue-200">
                <div class="tw-flex tw-items-center tw-justify-between tw-mb-4">
                  <div class="tw-flex tw-items-center">
                    <svg class="tw-w-5 tw-h-5 tw-text-blue-600 tw-mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                    <span class="tw-text-lg tw-font-semibold tw-text-gray-800">Mapa Mental Disponível</span>
                  </div>
                  <button
                    @click="openMindMapDialog"
                    class="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-rounded-lg tw-font-medium tw-transition-colors"
                  >
                    <svg class="tw-w-4 tw-h-4 tw-mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    Visualizar Mapa Mental
                  </button>
                </div>
                <p class="tw-text-gray-600 tw-text-sm">
                  Clique no botão acima para visualizar e interagir com o mapa mental deste artigo.
                </p>
              </div> -->

              <!-- Mind Map Dialog -->
              <newCompMindMap
                v-model="showMindMapDialog"
                :title="`Mapa Mental - ${post?.titulo || 'Post'}`"
                :mapleges="formatMindMapData(mindMap)"
                :original-map-data="mindMap"
                :mind-map-id="mindMap.id"
              />
            </div>

            <!-- Questões Section -->
            <div v-if="post?.questoes?.length" class="tw-bg-gray-50 tw-rounded-2xl tw-p-6 tw-border tw-border-gray-200">
              <div class="tw-flex tw-items-center tw-justify-between tw-mb-6">
                <div class="tw-flex tw-items-center">
                  <svg class="tw-w-5 tw-h-5 tw-text-blue-600 tw-mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="tw-text-lg tw-font-semibold tw-text-gray-800">
                    {{ post?.questoes?.length }} Quest{{ post?.questoes?.length > 1 ? 'ões' : 'ão' }}
                  </span>
                </div>

                <div class="tw-flex tw-items-center tw-gap-2">
                  <v-btn
                    @click="toggleQuestions(post)"
                    class="tw-flex tw-items-center tw-px-4 tw-py-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-rounded-lg tw-font-medium tw-transition-colors"
                    density="compact"
                    variant="text"
                  >
                    {{ showQuestions.has(post) ? 'Ocultar' : 'Ver' }} Questões
                  </v-btn>

                  <button
                    @click="shareCard(post)"
                    class="tw-p-2 tw-text-gray-500 hover:tw-text-gray-700 tw-transition-colors"
                  >
                    <svg class="tw-w-5 tw-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <transition name="slide-fade">
                <div v-if="showQuestions.has(post)" class="tw-space-y-4">
                  <div
                    v-for="(questao, qIndex) in post.questoes"
                    :key="qIndex"
                    class="tw-bg-white tw-rounded-xl tw-p-6 tw-border tw-border-gray-200 tw-shadow-sm"
                  >
                    <h3 class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-mb-4">
                      {{ questao.enunciado }}
                    </h3>

                    <div class="tw-space-y-3 tw-mb-6">
                      <div
                        v-for="(alternativa, altKey) in questao.alternativas"
                        :key="altKey"
                        class="tw-flex tw-items-start tw-p-3 tw-rounded-lg tw-border tw-cursor-pointer tw-transition-all tw-duration-200"
                        :class="getAlternativeClass(post, qIndex, altKey)"
                        @click="selectAlternative(post, qIndex, altKey)"
                      >
                        <div class="tw-flex tw-items-center tw-mr-3">
                          <input
                            type="radio"
                            :name="`question-${qIndex}`"
                            :value="altKey"
                            :checked="userAnswers.get(`${post}-${qIndex}`) === altKey"
                            :disabled="showAnswers.has(`${post}-${qIndex}`)"
                            class="tw-w-4 tw-h-4 tw-text-blue-600 tw-border-gray-300 focus:tw-ring-blue-500"
                          />
                        </div>
                        <div class="tw-flex-1">
                          <span class="tw-font-semibold tw-text-gray-700 tw-mr-2">{{ altKey.toUpperCase() }})</span>
                          <span class="tw-text-gray-700">{{ alternativa }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="tw-flex tw-justify-center tw-gap-3 tw-mb-4">
                      <button
                        v-if="userAnswers.has(`${post}-${qIndex}`) && !showAnswers.has(`${post}-${qIndex}`)"
                        @click="revealAnswer(post, qIndex, questao.resposta_correta)"
                        class="tw-px-4 tw-py-2 tw-bg-green-600 hover:tw-bg-green-700 tw-text-white tw-rounded-lg tw-font-medium tw-transition-colors"
                      >
                        Ver Resposta
                      </button>

                      <button
                        v-if="showAnswers.has(`${post}-${qIndex}`)"
                        @click="resetQuestion(post, qIndex)"
                        class="tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50 tw-rounded-lg tw-font-medium tw-transition-colors"
                      >
                        Tentar Novamente
                      </button>
                    </div>

                    <transition name="slide-fade">
                      <div v-if="showAnswers.has(`${post}-${qIndex}`)" class="tw-bg-green-50 tw-rounded-lg tw-p-4 tw-border tw-border-green-200">
                        <div class="tw-text-center tw-mb-4">
                          <span
                            class="tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-semibold"
                            :class="getResultClass(post, qIndex, questao.resposta_correta)"
                          >
                            <svg class="tw-w-4 tw-h-4 tw-mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getResultIconPath(post, qIndex, questao.resposta_correta)"/>
                            </svg>
                            {{ getResultText(post, qIndex, questao.resposta_correta) }}
                          </span>
                        </div>

                        <div class="tw-mb-3">
                          <span class="tw-font-semibold tw-text-gray-800">
                            Resposta Correta: {{ questao.resposta_correta.toUpperCase() }}
                          </span>
                        </div>

                        <div>
                          <p class="tw-text-gray-700">
                            <strong>Justificativa:</strong> {{ questao.justificativa }}
                          </p>
                        </div>
                      </div>
                    </transition>
                  </div>
                </div>
              </transition>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { parseMixedMarkdown } from '@/utils/parseMixedMarkdown'
  import newCompMindMap from '@/components/newCompMindMap.vue'

  interface Post {
    _id: string
    titulo: string
    texto: string
    disciplina: string
    banca?: string
    concurso?: string
    cargo?: string
    palavras_chaves: string[]
    timestamp: string
    questoes?: Questao[]
    id_law?: string
    art?: string
    [key: string]: any
  }

  interface Questao {
    enunciado: string
    alternativas: Record<string, string>
    resposta_correta: string
    justificativa: string
  }

  const route = useRoute()
  const { searchPosts } = useElasticsearch()

  const post = ref<Post | null>(null)
  const mindMap = ref<any>(null)
  const showMindMapDialog = ref(false)
  const pending = ref(true)
  const error = ref<Error | null>(null)

  // Extract ID from slug-id format (slug-id)
  const extractIdFromSlug = (slugId: string) => {
    const parts = slugId.split('-')
    // Find the last part that looks like an ID (assuming IDs are longer and contain numbers/letters)
    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].length > 10 && /^[a-zA-Z0-9]+$/.test(parts[i])) {
        return parts.slice(i).join('-')
      }
    }
    // Fallback: assume the last part is the ID
    return parts[parts.length - 1]
  }

  const postId = computed(() => extractIdFromSlug(route.params.id as string))

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }

  // Estados reativos
  const expanded = reactive(new Set())
  const showQuestions = reactive(new Set())
  const showAllKeywords = reactive(new Set())
  const favorites = reactive(new Set())
  const userAnswers = reactive(new Map())
  const showAnswers = reactive(new Set())

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
        link: [
          { rel: 'canonical', href: `https://blogleges.estudodalei.com.br/post/${generateSlug(post.value.titulo)}-${post.value._id}` }
        ],
        meta: [
          {
            name: 'description',
            content: post.value.texto.substring(0, 160).replace(/<[^>]*>/g, '') + '...'
          },
          {
            name: 'keywords',
            content: post.value.palavras_chaves.join(', ')
          },
          { name: 'author', content: 'Legislação Educacional' },
          { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
          { property: 'og:title', content: post.value.titulo },
          { property: 'og:description', content: post.value.texto.substring(0, 160).replace(/<[^>]*>/g, '') },
          { property: 'og:type', content: 'article' },
          { property: 'og:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' },
          { property: 'og:url', content: `https://blogleges.estudodalei.com.br/post/${generateSlug(post.value.titulo)}-${post.value._id}` },
          { property: 'og:site_name', content: 'Blog Leges' },
          { property: 'og:locale', content: 'pt_BR' },
          { property: 'article:author', content: 'Legislação Educacional' },
          { property: 'article:section', content: post.value.disciplina },
          { property: 'article:tag', content: post.value.palavras_chaves.join(', ') },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: post.value.titulo },
          { name: 'twitter:description', content: post.value.texto.substring(0, 160).replace(/<[^>]*>/g, '') },
          { name: 'twitter:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' }
        ]
      })
    }
  })

  const toggleQuestions = (index: Post) => {
    if (showQuestions.has(index)) {
      showQuestions.delete(index)
    } else {
      showQuestions.add(index)
    }
  }

  const shareCard = (item: Post) => {
    if (navigator.share) {
      navigator.share({
        title: item.titulo,
        text: item.texto.substring(0, 100) + '...',
        url: window.location.href
      })
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(item.titulo + '\n\n' + item.texto)
    }
  }

  const selectAlternative = (cardIndex: Post, questionIndex: number, alternative: string) => {
    const questionId = `${cardIndex}-${questionIndex}`
    if (!showAnswers.has(questionId)) {
      userAnswers.set(questionId, alternative)
    }
  }

  const getAlternativeClass = (cardIndex: Post, questionIndex: number, alternative: string) => {
    const questionId = `${cardIndex}-${questionIndex}`
    const userAnswer = userAnswers.get(questionId)
    const isAnswerRevealed = showAnswers.has(questionId)

    if (!isAnswerRevealed) {
      return {
        'tw-cursor-pointer hover:tw-bg-blue-50': true,
        'tw-bg-blue-100 tw-border-blue-300': userAnswer === alternative
      }
    }

    if (!post.value?.questoes) return {}

    const correctAnswer = post.value.questoes[questionIndex].resposta_correta

    return {
      'tw-bg-green-100 tw-border-green-300': alternative === correctAnswer,
      'tw-bg-red-100 tw-border-red-300': userAnswer === alternative && alternative !== correctAnswer,
      'tw-cursor-not-allowed tw-opacity-60': true
    }
  }

  const revealAnswer = (cardIndex: Post, questionIndex: number, correctAnswer: string) => {
    const questionId = `${cardIndex}-${questionIndex}`
    showAnswers.add(questionId)
  }

  const resetQuestion = (cardIndex: Post, questionIndex: number) => {
    const questionId = `${cardIndex}-${questionIndex}`
    userAnswers.delete(questionId)
    showAnswers.delete(questionId)
  }

  const getResultClass = (cardIndex: Post, questionIndex: number, correctAnswer: string) => {
    const questionId = `${cardIndex}-${questionIndex}`
    const userAnswer = userAnswers.get(questionId)
    return userAnswer === correctAnswer
      ? 'tw-bg-green-100 tw-text-green-800'
      : 'tw-bg-red-100 tw-text-red-800'
  }

  const getResultIconPath = (cardIndex: Post, questionIndex: number, correctAnswer: string) => {
    const questionId = `${cardIndex}-${questionIndex}`
    const userAnswer = userAnswers.get(questionId)
    return userAnswer === correctAnswer
      ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      : 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
  }

  const getResultText = (cardIndex: Post, questionIndex: number, correctAnswer: string) => {
    const questionId = `${cardIndex}-${questionIndex}`
    const userAnswer = userAnswers.get(questionId)
    return userAnswer === correctAnswer ? 'Parabéns! Resposta correta!' : 'Resposta incorreta'
  }

  const processedContent = computed(() => {
    if (!post.value) return ''

    try {
      const originalHtmlWithMarkdown = post.value.texto
      const htmlContent = parseMixedMarkdown(originalHtmlWithMarkdown)
      return htmlContent
    } catch (error) {
      console.error('Erro ao processar markdown:', error)
      return post.value.texto
    }
  })

  const openMindMapDialog = () => {
    showMindMapDialog.value = true
  }

  const formatMindMapData = (mindMapData: any) => {
    if (!mindMapData) return []

    console.log('Raw mind map data:', mindMapData)

    // If the data already has the correct structure, return it
    if (Array.isArray(mindMapData) && mindMapData.length > 0 && mindMapData[0].name) {
      return mindMapData
    }

    // If it has children property, use that
    if (mindMapData.children && Array.isArray(mindMapData.children)) {
      return mindMapData.children
    }

    // If it's a single node with title, convert to name
    if (mindMapData.title) {
      const converted = {
        name: mindMapData.title,
        children: mindMapData.children || [],
        _id: mindMapData.id,
        art: mindMapData.art,
        subtitle: mindMapData.subtitle,
        type: mindMapData.type
      }
      console.log('Converted mind map data:', converted)
      return [converted]
    }

    // If it's a single node with name, wrap it in an array
    if (mindMapData.name) {
      return [mindMapData]
    }

    // Fallback: try to create a basic structure
    const fallback = [{
      name: mindMapData.title || mindMapData.name || 'Mapa Mental',
      children: mindMapData.children || [],
      _id: mindMapData.id,
      art: mindMapData.art
    }]
    console.log('Fallback mind map data:', fallback)
    return fallback
  }

  onMounted(async () => {
    try {
      const result = await $fetch(`/api/elasticsearch/post/${postId.value}`)
      post.value = result.data as Post
      mindMap.value = result.mindMap
      console.log('Post data:', post.value)
      console.log('Mind map data:', mindMap.value)
      console.log('Has id_law:', post.value?.id_law)
      console.log('Has art:', post.value?.art)
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Erro desconhecido')
      console.error('Erro ao carregar post:', err)
    } finally {
      pending.value = false
    }
  })
</script>

<style scoped>
/* Animations */
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.tw-animate-slide-up {
  animation: slide-up 0.6s ease-out;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Prose content styling */
.tw-prose :deep(h2) {
  @apply tw-text-2xl tw-font-bold tw-text-gray-800 tw-mt-8 tw-mb-4;
}

.tw-prose :deep(h3) {
  @apply tw-text-xl tw-font-semibold tw-text-gray-800 tw-mt-6 tw-mb-3;
}

.tw-prose :deep(p) {
  @apply tw-mb-4 tw-leading-relaxed;
}

.tw-prose :deep(ul),
.tw-prose :deep(ol) {
  @apply tw-mb-4 tw-pl-6;
}

.tw-prose :deep(li) {
  @apply tw-mb-2;
}

.tw-prose :deep(blockquote) {
  @apply tw-border-l-4 tw-border-blue-500 tw-pl-4 tw-italic tw-text-gray-600 tw-my-4;
}

.tw-prose :deep(code) {
  @apply tw-bg-gray-100 tw-px-2 tw-py-1 tw-rounded tw-text-sm tw-font-mono;
}

.tw-prose :deep(pre) {
  @apply tw-bg-gray-100 tw-p-4 tw-rounded-lg tw-overflow-x-auto tw-my-4;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .tw-text-3xl {
    @apply tw-text-2xl;
  }

  .tw-text-4xl {
    @apply tw-text-3xl;
  }

  .tw-p-6 {
    @apply tw-p-4;
  }

  .tw-gap-3 {
    @apply tw-gap-2;
  }

  .tw-mb-6 {
    @apply tw-mb-4;
  }
}

@media (max-width: 480px) {
  .tw-px-4 {
    @apply tw-px-3;
  }

  .tw-text-lg {
    @apply tw-text-base;
  }

  .tw-p-3 {
    @apply tw-p-2;
  }
}

/* Focus states for accessibility */
button:focus,
input:focus {
  @apply tw-outline-none tw-ring-2 tw-ring-blue-500 tw-ring-opacity-50;
}

/* Print styles */
@media print {
  .tw-bg-gray-50 {
    @apply tw-bg-white;
  }

  .tw-shadow-sm {
    box-shadow: none;
  }

  .tw-border {
    border: 1px solid #000;
  }
}
</style>
