<template>
  <v-container style="max-width: 1080px;">
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
          
          <div class="meta-info my-5">
            <div class="tags-container">
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
          </div>
      
          
          <p class="text-body-2 text-medium-emphasis">
            Publicado em {{ formatDate(post?.timestamp) }}
          </p>
        </header>
        
        <div class="post-content" v-html="processedContent"></div>

        <!-- Questões -->
            <div class="questions-section mt-10">
              <div class="d-flex align-center mb-2">
                <v-icon size="small" color="primary">mdi-format-list-checks</v-icon>
                <span class="text-subtitle-2 font-weight-medium ml-3">
                  {{ post?.questoes?.length }} quest{{ post?.questoes?.length > 1 ? 'ões' : 'ão' }}
                </span>
              </div>

               <!-- Ações do Card -->
              <v-card-actions class="pt-0">
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  @click.stop="toggleQuestions(post)"
                >
                  <v-icon size="small" class="mr-1">
                    {{ showQuestions.has(post) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                  </v-icon>
                  {{ showQuestions.has(post) ? 'Ocultar' : 'Ver' }} questões
                </v-btn>
                
                <v-spacer></v-spacer>
                
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click.stop="shareCard(post)"
                >
                  <v-icon size="small">mdi-share-variant</v-icon>
                </v-btn>
              </v-card-actions>
              
              <v-expand-transition>
                <div v-if="showQuestions.has(post)">
                  <v-card
                    v-for="(questao, qIndex) in post.questoes"
                    :key="qIndex"
                    variant="outlined"
                    class="mb-3 question-card"
                  >
                    <v-card-text class="pa-3">
                      <p class="text-body-2 font-weight-medium mb-3">
                        {{ questao.enunciado }}
                      </p>
                      
                      <div class="alternatives mb-3">
                        <div
                          v-for="(alternativa, altKey) in questao.alternativas"
                          :key="altKey"
                          class="alternative-item mb-2"
                          :class="getAlternativeClass(post, qIndex, altKey)"
                          @click="selectAlternative(post, qIndex, altKey)"
                        >
                          <v-radio-btn
                            :model-value="userAnswers.get(`${post}-${qIndex}`) === altKey"
                            :disabled="showAnswers.has(`${post}-${qIndex}`)"
                            color="primary"
                            class="mr-2"
                          ></v-radio-btn>
                          <div class="alternative-content">
                            <span class="alternative-letter">{{ altKey.toUpperCase() }})</span>
                            <span class="alternative-text">{{ alternativa }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="question-actions mb-3">
                        <v-btn
                          v-if="userAnswers.has(`${post}-${qIndex}`) && !showAnswers.has(`${post}-${qIndex}`)"
                          variant="text"
                          color="primary"
                          size="small"
                          @click="revealAnswer(post, qIndex, questao.resposta_correta)"
                        >
                          Ver Resposta
                        </v-btn>
                        
                        <v-btn
                          v-if="showAnswers.has(`${post}-${qIndex}`)"
                          variant="outlined"
                          size="small"
                          @click="resetQuestion(post, qIndex)"
                          class="ml-2"
                        >
                          Tentar Novamente
                        </v-btn>
                      </div>

                      <v-expand-transition>
                        <div v-if="showAnswers.has(`${post}-${qIndex}`)" class="answer-section">
                          <div class="result-feedback mb-3">
                            <v-chip
                              :color="getResultColor(post, qIndex, questao.resposta_correta)"
                              variant="tonal"
                              size="small"
                              class="mb-2"
                            >
                              <v-icon size="small" class="mr-1">
                                {{ getResultIcon(post, qIndex, questao.resposta_correta) }}
                              </v-icon>
                              {{ getResultText(post, qIndex, questao.resposta_correta) }}
                            </v-chip>
                          </div>
                          
                          <div class="correct-answer mb-2">
                            <span class="text-subtitle-2 font-weight-medium">
                              Resposta Correta: {{ questao.resposta_correta.toUpperCase() }}
                            </span>
                          </div>
                          
                          <div class="justification">
                            <p class="text-body-2 text-medium-emphasis">
                              <strong>Justificativa:</strong> {{ questao.justificativa }}
                            </p>
                          </div>
                        </div>
                      </v-expand-transition>
                    </v-card-text>
                  </v-card>
                </div>
              </v-expand-transition>
            </div>
      </article>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { marked } from 'marked'
import DOMPurify from 'dompurify'

const markdownText = '# Hello\n\n**Isso é um teste!**'


marked.setOptions({
  breaks: true,
  gfm: true,
  smartLists: true,
  smartypants: true
})

const route = useRoute()
const { searchPosts } = useElasticsearch()

const post = ref(null)
const pending = ref(true)
const error = ref(null)

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
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: 'https://blogleges.estudodalei.com.br/og-image.jpg' }
      ]
    })
  }
})

const toggleQuestions = (index) => {
  if (showQuestions.has(index)) {
    showQuestions.delete(index)
  } else {
    showQuestions.add(index)
  }
}

const shareCard = (item) => {
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

const selectAlternative = (cardIndex, questionIndex, alternative) => {
  const questionId = `${cardIndex}-${questionIndex}`
  if (!showAnswers.has(questionId)) {
    userAnswers.set(questionId, alternative)
  }
}

const getAlternativeClass = (cardIndex, questionIndex, alternative) => {
  const questionId = `${cardIndex}-${questionIndex}`
  const userAnswer = userAnswers.get(questionId)
  const isAnswerRevealed = showAnswers.has(questionId)
  
  if (!isAnswerRevealed) {
    return {
      'alternative-selectable': true,
      'alternative-selected': userAnswer === alternative
    }
  }
  
  const correctAnswer = post.value.questoes[questionIndex].resposta_correta
  
  return {
    'alternative-correct': alternative === correctAnswer,
    'alternative-incorrect': userAnswer === alternative && alternative !== correctAnswer,
    'alternative-disabled': true
  }
}

const revealAnswer = (cardIndex, questionIndex, correctAnswer) => {
  const questionId = `${cardIndex}-${questionIndex}`
  showAnswers.add(questionId)
}

const resetQuestion = (cardIndex, questionIndex) => {
  const questionId = `${cardIndex}-${questionIndex}`
  userAnswers.delete(questionId)
  showAnswers.delete(questionId)
}

const getResultColor = (cardIndex, questionIndex, correctAnswer) => {
  const questionId = `${cardIndex}-${questionIndex}`
  const userAnswer = userAnswers.get(questionId)
  return userAnswer === correctAnswer ? 'success' : 'error'
}

const getResultIcon = (cardIndex, questionIndex, correctAnswer) => {
  const questionId = `${cardIndex}-${questionIndex}`
  const userAnswer = userAnswers.get(questionId)
  return userAnswer === correctAnswer ? 'mdi-check-circle' : 'mdi-close-circle'
}

const getResultText = (cardIndex, questionIndex, correctAnswer) => {
  const questionId = `${cardIndex}-${questionIndex}`
  const userAnswer = userAnswers.get(questionId)
  return userAnswer === correctAnswer ? 'Parabéns! Resposta correta!' : 'Resposta incorreta'
}

const processedContent = computed(() => {
  try {
    const html = marked.parse(post.value.texto)
    return DOMPurify.sanitize(html)
  } catch (error) {
    console.error('Erro ao processar markdown:', error)
    return post.value.texto
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

.questions-section {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  padding: 12px;
}

.question-card {
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.8);
}

.alternative-item {
  display: flex;
  align-items: flex-start;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.alternative-selectable {
  cursor: pointer;
}

.alternative-selectable:hover {
  background: rgba(25, 118, 210, 0.04);
}

.alternative-selected {
  background: rgba(25, 118, 210, 0.08);
  border: 1px solid rgba(25, 118, 210, 0.3);
}

.alternative-correct {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.5);
}

.alternative-incorrect {
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.5);
}

.alternative-disabled {
  pointer-events: none;
}

.alternative-content {
  display: flex;
  align-items: flex-start;
  flex: 1;
}

.alternative-letter {
  min-width: 20px;
  font-weight: 600;
  color: rgb(83, 100, 113);
}

.alternative-text {
  flex: 1;
  font-size: 0.875rem;
  line-height: 1.4;
  color: rgb(15, 20, 25);
}

.answer-section {
  background: rgba(76, 175, 80, 0.05);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.result-feedback {
  text-align: center;
}

.question-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.v-card-actions {
  padding: 8px 16px 16px 16px;
}

@media (max-width: 768px) {
  .alternative-text {
    font-size: 0.8rem !important;
  }
}

</style>