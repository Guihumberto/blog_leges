<template>
  <header class="tw-bg-white tw-shadow-lg tw-sticky tw-top-0 tw-z-50">
    <div class="tw-container tw-mx-auto tw-px-4">
      <div class="tw-flex tw-items-center tw-justify-center tw-h-16">
        <div class="tw-flex tw-items-center tw-space-x-4">
          <div class="tw-flex tw-items-center tw-space-x-2">
            <div class="tw-w-10 tw-h-10 tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-font-semibold tw-text-white">
              EL
            </div>
            <div>
              <h1 class="tw-text-xl tw-font-bold tw-text-gray-800">ESTUDO DA LEI</h1>
              <p class="tw-text-xs tw-text-gray-500">Legislação</p>
            </div>
          </div>
        </div>

        <nav class="tw-hidden tw-md:flex tw-items-center tw-space-x-8">
          <NuxtLink to="/" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors">INÍCIO</NuxtLink>
          <NuxtLink to="/" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors">PREÇOS</NuxtLink>

          <!-- Dropdown LEI -->
          <div class="tw-relative">
            <button @click="showLeiDropdown = !showLeiDropdown" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors tw-flex tw-items-center">
              LEIS
              <svg class="tw-w-4 tw-h-4 tw-ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div v-if="showLeiDropdown" @mouseleave="showLeiDropdown = false" class="tw-absolute tw-top-full tw-left-0 tw-mt-1 tw-w-56 tw-bg-white tw-rounded-lg tw-shadow-xl tw-border tw-border-gray-200 tw-py-2 tw-z-10">
              <NuxtLink to="/" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-blue-50 tw-hover:text-blue-600 tw-transition-colors">Constituição Federal</NuxtLink>
              <NuxtLink to="/" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-blue-50 tw-hover:text-blue-600 tw-transition-colors">Código Civil</NuxtLink>
              <NuxtLink to="/" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-blue-50 tw-hover:text-blue-600 tw-transition-colors">Código Penal</NuxtLink>
              <NuxtLink to="/" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-blue-50 tw-hover:text-blue-600 tw-transition-colors">CLT</NuxtLink>
              <NuxtLink to="/" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-blue-50 tw-hover:text-blue-600 tw-transition-colors">Lei de Licitações</NuxtLink>
              <NuxtLink to="/" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-blue-50 tw-hover:text-blue-600 tw-transition-colors">Lei Maria da Penha</NuxtLink>
              <hr class="tw-my-2 tw-border-gray-200">
              <NuxtLink to="/" class="tw-block tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 tw-hover:bg-blue-50 tw-hover:text-blue-600 tw-transition-colors tw-font-medium">Ver todas as leis</NuxtLink>
            </div>
          </div>

          <!-- Dropdown CONCURSOS -->
          <!-- <div class="tw-relative">
            <button @click="showConcursosDropdown = !showConcursosDropdown" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors tw-flex tw-items-center">
              CONCURSOS
              <svg class="tw-w-4 tw-h-4 tw-ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button> -->
            <!-- <div v-if="showConcursosDropdown" @mouseleave="showConcursosDropdown = false" class="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
              <NuxtLink to="/concurso/policia-federal" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Polícia Federal</NuxtLink>
              <NuxtLink to="/concurso/sefaz-ma" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Sefaz-MA</NuxtLink>
              <NuxtLink to="/concurso/sefaz-pi" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">Sefaz-PI</NuxtLink>
              <hr class="my-2 border-gray-200">
              <NuxtLink to="/concursos" class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">Ver todos os concursos</NuxtLink>
            </div> -->
          <!-- </div> -->

          <NuxtLink to="/" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors">BLOG</NuxtLink>
        </nav>

        <!-- <div class="tw-flex tw-items-center tw-space-x-4">
          <button class="tw-p-2 tw-text-gray-600 tw-hover:text-blue-600 tw-transition-colors">
            <svg class="tw-w-5 tw-h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
            </svg>
          </button> -->

          <!-- Botão ENTRAR destacado -->
          <!-- <NuxtLink to="/" 
          class="tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-font-semibold tw-hover:from-blue-700 tw-hover:to-purple-700 tw-transition-all tw-duration-200 tw-shadow-md tw-hover:shadow-lg tw-transform tw-hover:-translate-y-0.5">
            ENTRAR
          </NuxtLink> -->

          <!-- <button @click="mobileMenuOpen = !mobileMenuOpen" class="tw-md:hidden tw-p-2 tw-text-gray-600">
            <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button> -->
        <!-- </div> -->
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="tw-md:hidden tw-bg-white tw-border-t tw-border-gray-200 tw-py-4">
        <div class="tw-flex tw-flex-col tw-space-y-4">
          <NuxtLink to="/" @click="mobileMenuOpen = false" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors">INÍCIO</NuxtLink>
          <NuxtLink to="/" @click="mobileMenuOpen = false" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors">PREÇOS</NuxtLink>

          <!-- Mobile Dropdown LEI -->
          <div>
            <button @click="showMobileLeiDropdown = !showMobileLeiDropdown" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors tw-flex tw-items-center tw-justify-between tw-w-full">
              LEIS
              <svg class="tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- <div v-if="showMobileLeiDropdown" class="mt-2 ml-4 space-y-2">
              <NuxtLink to="/lei/constituição-federal" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Constituição Federal</NuxtLink>
              <NuxtLink to="/lei/codigo-civil" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Código Civil</NuxtLink>
              <NuxtLink to="/lei/codigo-penal" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Código Penal</NuxtLink>
              <NuxtLink to="/lei/clt" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">CLT</NuxtLink>
              <NuxtLink to="/lei/licitacoes" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Lei de Licitações</NuxtLink>
              <NuxtLink to="/lei/maria-da-penha" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Lei Maria da Penha</NuxtLink>
              <NuxtLink to="/leis" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">Ver todas as leis</NuxtLink>
            </div> -->
          </div>

          <!-- Mobile Dropdown CONCURSOS -->
          <div>
            <button @click="showMobileConcursosDropdown = !showMobileConcursosDropdown" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors tw-flex tw-items-center tw-justify-between tw-w-full">
              CONCURSOS
              <svg class="tw-w-4 tw-h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <!-- <div v-if="showMobileConcursosDropdown" class="mt-2 ml-4 space-y-2">
              <NuxtLink to="/concurso/policia-federal" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Polícia Federal</NuxtLink>
              <NuxtLink to="/concurso/sefaz-ma" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Sefaz-MA</NuxtLink>
              <NuxtLink to="/concurso/sefaz-pi" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors">Sefaz-PI</NuxtLink>
              <NuxtLink to="/concursos" @click="mobileMenuOpen = false" class="block text-sm text-gray-700 hover:text-blue-600 transition-colors font-medium">Ver todos os concursos</NuxtLink>
            </div> -->
          </div>

          <NuxtLink to="/" @click="mobileMenuOpen = false" class="tw-text-gray-700 tw-hover:text-blue-600 tw-font-medium tw-transition-colors">BLOG</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Dropdown states
const showLeiDropdown = ref(false)
const showConcursosDropdown = ref(false)
const mobileMenuOpen = ref(false)
const showMobileLeiDropdown = ref(false)
const showMobileConcursosDropdown = ref(false)

// Close dropdowns when clicking outside (optional, but good UX)
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.tw-relative')) {
    showLeiDropdown.value = false
    showConcursosDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Additional styles if needed */
</style>
