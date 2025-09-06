<template>
  <article class="tw-blog-card tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border tw-border-gray-200 tw-overflow-hidden tw-animate-slide-up mb-5" @click.stop="$router.push(`/post/${generateSlug(post._source.titulo)}-${post._id}`)">
    <div class="tw-p-8">
      <div class="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center lg:tw-justify-between tw-mb-6">
        <div class="tw-mb-4 lg:tw-mb-0">
          <h2 class="tw-text-2xl lg:tw-text-3xl tw-font-bold tw-text-gray-800 tw-mb-3 tw-leading-tight hover:tw-text-blue-600 tw-transition-colors tw-cursor-pointer">
            {{ post._source.titulo }}
          </h2>

          <div class="tw-flex tw-flex-wrap tw-items-center tw-gap-3 tw-mb-4">
            <span class="tw-bg-blue-100 tw-text-blue-800 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-semibold">
              {{ post._source.disciplina }}
            </span>
            <span class="tw-bg-purple-100 tw-text-purple-800 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-semibold">
              {{ post._source.questoes.length }} Questões
            </span>
            <span class="tw-text-sm tw-text-gray-500 tw-flex tw-items-center">
              <svg class="tw-w-4 tw-h-4 tw-mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Publicado em {{ formatDate(post._source?.timestamp) }}
            </span>
          </div>

          <div class="tw-flex tw-flex-wrap tw-gap-2 tw-mb-4">
            <span class="tw-bg-gray-100 tw-text-gray-700 tw-px-2 tw-py-1 tw-rounded tw-text-xs" v-for="art in post._source?.arts || [post._source?.art]" :key="art">Art. {{ art }}</span>
          </div>
        </div>

        <div class="lg:tw-ml-8 tw-flex-shrink-0">
          <div class="tw-w-24 tw-h-24 lg:tw-w-32 lg:tw-h-32 tw-bg-gradient-to-br tw-from-blue-400 tw-to-purple-500 tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-shadow-lg">
            <svg class="tw-w-10 tw-h-10 lg:tw-w-12 lg:tw-h-12 tw-text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>

      <div class="tw-prose tw-max-w-none tw-text-gray-700 tw-leading-relaxed tw-mb-6">
        <p class="tw-text-lg tw-mb-4" v-html="getTextPreview(highlightedContent, expanded.has(post))">
        </p>
      </div>

      <div class="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-pt-6 tw-border-t tw-border-gray-100">
        <div class="tw-flex tw-flex-wrap tw-gap-2 tw-mb-4 sm:tw-mb-0">
          <span class="tw-tag-hover tw-bg-blue-50 tw-text-blue-700 tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium tw-transition-transform tw-cursor-pointer" v-for="palavra in post._source.palavras_chaves?.slice(0, 4)" :key="palavra">{{ palavra }}</span>
          <span class="tw-text-gray-500 tw-text-sm" v-if="post._source.palavras_chaves?.length > 4">+{{ post._source.palavras_chaves?.length - 4 }} mais</span>
        </div>

        <button class="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-font-semibold tw-transition-all tw-flex tw-items-center" @click.stop="$router.push(`/post/${generateSlug(post._source.titulo)}-${post._id}`)">
          VER MAIS
          <svg class="tw-w-4 tw-h-4 tw-ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  interface Props {
    post: any
  }

  const props = defineProps<Props>()

  const expanded = reactive(new Set())

  const getTextPreview = (text: string, isExpanded: boolean) => {
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
  </script>
