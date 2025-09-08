<template>
    <v-card class="mindmap-card">
      <v-card-title class="d-flex justify-space-between align-center pa-4 mindmap-header">
        <div class="d-flex ga-2 align-center">
          <v-icon size="28" color="primary" v-if="!mobile">mdi-sitemap</v-icon>
          <div>
            <p :style="mobile ? 'font-size: .8rem;' : 'font-size: 1.2rem'" class="text-wrap">{{ title }}</p>
          </div>
        </div>
      </v-card-title>
      
      <v-card-subtitle class="pa-4 pt-0" v-if="false">
        <div class="d-flex align-center ga-2">
          <v-icon size="small" color="grey">mdi-information-outline</v-icon>
          {{ subtitle }}
        </div>
      </v-card-subtitle>
      
      <!-- Barra de ferramentas -->
      <v-card-text class="pa-2" v-if="false">
        <div class="mindmap-toolbar d-flex align-center ga-2 mb-3 pa-2">
          <v-btn
            @click="resetView"
            variant="outlined"
            size="small"
            prepend-icon="mdi-home"
            title="Centralizar visualização"
          >
            Centralizar
          </v-btn>
          
          <v-btn
            @click="fitToScreen"
            variant="outlined"
            size="small"
            prepend-icon="mdi-fit-to-screen"
            title="Ajustar à tela"
          >
            Ajustar
          </v-btn>
          
          <v-btn
            @click="downloadMindmap"
            variant="outlined"
            size="small"
            prepend-icon="mdi-download"
            title="Baixar como imagem"
          >
            Download
          </v-btn>
          
          <v-divider vertical class="mx-2"></v-divider>
          
          <v-btn
            @click="addRootNode"
            variant="outlined"
            size="small"
            prepend-icon="mdi-plus-circle"
            color="success"
            title="Adicionar nó raiz"
          >
            Novo Nó
          </v-btn>
          
          <v-btn
            @click="expandAll"
            variant="outlined"
            size="small"
            prepend-icon="mdi-arrow-expand-all"
            title="Expandir todos os nós"
          >
            Expandir
          </v-btn>
          
          <v-btn
            @click="collapseAll"
            variant="outlined"
            size="small"
            prepend-icon="mdi-arrow-collapse-all"
            title="Recolher todos os nós"
          >
            Recolher
          </v-btn>
          
          <v-spacer></v-spacer>
          
          <v-chip
            variant="outlined"
            size="small"
            prepend-icon="mdi-eye"
          >
            Zoom: {{ currentZoom }}%
          </v-chip>
        </div>
      </v-card-text>
      
      <v-card-text class="pa-0">
        <div class="mindmap-container" :style="{ height: containerHeight }">
          <component
            v-if="mindmap && isClientReady"
            :is="mindmap"
            ref="mindmapRef"
            v-model="internalMapleges"
            locale="ptBR"
            :branch="6"
            :x-gap="120"
            :y-gap="25"
            :zoom="true"
            :fit-btn="false"
            :center-btn="false"
            :download-btn="false"
            :drag="true"
            :edit="true"
            :add-node-btn="true"
            :sharp-corner="false"
            :ctm="true"
            :timetravel="true"
            :vertical="false"
            :keyboard="true"
            @update:modelValue="handleMindmapUpdate"
            @zoom-change="handleZoomChange"
            @node-click="handleNodeClick"
          />
          
          <div v-else class="tw-flex tw-justify-center tw-items-center tw-h-full">
            <div class="tw-text-center">
              <div class="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-b-2 tw-border-blue-600 tw-mx-auto tw-mb-4"></div>
              <p class="tw-text-gray-600">Carregando mapa mental...</p>
            </div>
          </div>
          
          <!-- Controles customizados sobrepostos -->
          <div class="mindmap-controls" v-if="!mobile">
            <v-card class="controls-card" elevation="4">
              <v-card-text class="pa-2">
                <div class="d-flex flex-column ga-1">
                  <v-btn
                    @click="zoomIn"
                    icon
                    size="small"
                    variant="text"
                    title="Zoom In (+)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  
                  <v-divider></v-divider>
                  
                  <v-btn
                    @click="zoomOut"
                    icon
                    size="small"
                    variant="text"
                    title="Zoom Out (-)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  
                  <v-divider></v-divider>
                  
                  <v-btn
                    @click="fitToScreen"
                    icon
                    size="small"
                    variant="text"
                    title="Ajustar à tela (F)"
                  >
                    <v-icon>mdi-fit-to-screen</v-icon>
                  </v-btn>
                  
                  <v-divider></v-divider>
                  
                  <v-btn
                    @click="resetView"
                    icon
                    size="small"
                    variant="text"
                    title="Centralizar (C)"
                  >
                    <v-icon>mdi-crosshairs-gps</v-icon>
                  </v-btn>
                  
                  <v-divider></v-divider>
                  
                  <v-btn
                    @click="downloadMindmap"
                    icon
                    size="small"
                    variant="text"
                    title="Download (D)"
                    color="primary"
                  >
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
          
          <!-- Informações de ajuda -->
          <div class="mindmap-help" v-if="showHelp">
            <v-card class="help-card" max-width="300">
              <v-card-title class="d-flex align-center ga-2 pa-3">
                <v-icon size="small" color="info">mdi-help-circle</v-icon>
                <span class="text-subtitle-2">Atalhos de Teclado</span>
                <v-spacer></v-spacer>
                <v-btn @click="showHelp = false" icon size="x-small" variant="text">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="pa-3 pt-0">
                <div class="help-shortcuts">
                  <div class="shortcut-item">
                    <kbd>Ctrl + Z</kbd> <span>Desfazer</span>
                  </div>
                  <div class="shortcut-item">
                    <kbd>Ctrl + Y</kbd> <span>Refazer</span>
                  </div>
                  <div class="shortcut-item">
                    <kbd>+/-</kbd> <span>Zoom</span>
                  </div>
                  <div class="shortcut-item">
                    <kbd>Alt + C</kbd> <span>Centralizar</span>
                  </div>
                  <div class="shortcut-item">
                    <kbd>Alt + F</kbd> <span>Ajustar tela</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-card-text>
      
      <!-- Rodapé com informações -->
      <v-card-actions class="d-flex justify-space-between align-center pa-4">
        <div class="d-flex align-center ga-4">
          <v-chip 
            size="small" 
            variant="outlined"
            prepend-icon="mdi-file-tree"
          >
            {{ totalNodes }} nós
          </v-chip>
          
          <v-chip 
            size="small" 
            variant="outlined"
            prepend-icon="mdi-layers"
          >
            {{ maxDepth }} níveis
          </v-chip>
        </div>
        
        <div class="d-flex ga-2">
          <v-btn
            @click="showHelp = !showHelp"
            variant="text"
            prepend-icon="mdi-help-circle"
            title="Mostrar/ocultar ajuda"
          >
            Ajuda
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify/lib/composables/display.mjs'

const { mobile } = useDisplay()

// Componente dinâmico para evitar problemas de SSR
const mindmap = ref(null)
const isClientReady = ref(false)

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Mapa Mental'
  },
  subtitle: {
    type: String,
    default: 'Visualização e edição de conhecimento estruturado'
  },
  mapleges: {
    type: Array,
    default: () => [
      {
        "name": "Como aprender Vue 3",
        "children": [
          {
            "name": "Conhecimento Preliminar",
            "children": [
              { "name": "HTML & CSS" },
              { "name": "JavaScript ES6+" },
              { "name": "Conceitos de Reatividade" },
              { "name": "Composition API" }
            ]
          },
          {
            "name": "Instalação e Setup",
            "collapse": false,
            "children": [
              { "name": "Vue CLI" },
              { "name": "Vite" },
              { "name": "CDN" }
            ]
          },
          {
            "name": "Conceitos Fundamentais",
            "children": [
              { "name": "Componentes" },
              { "name": "Diretivas" },
              { "name": "Props e Events" },
              {
                "name": "Estado e Reatividade",
                "children": [
                  { "name": "ref() e reactive()" },
                  { "name": "computed()" },
                  { "name": "watch() e watchEffect()" }
                ]
              }
            ],
            "left": true
          },
          {
            "name": "Tópicos Avançados",
            "children": [
              { "name": "Composables" },
              { "name": "Teleport" },
              { "name": "Suspense" }
            ],
            "left": true
          }
        ]
      }
    ]
  },
  originalMapData: {
    type: Object,
    default: null
  },
  mindMapId: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'saved'])

// Refs
const dialog = ref(props.modelValue)
const mindmapRef = ref(null)
const isFullscreen = ref(false)
const showHelp = ref(false)
const currentZoom = ref(100)
const isSaving = ref(false)

// Estado interno
const internalMapleges = ref([...props.mapleges])
const originalMapData = ref(JSON.parse(JSON.stringify(props.originalMapData || {})))

// Computed
const containerHeight = computed(() => {
  return isFullscreen.value ? '80vh' : '60vh'
})

const totalNodes = computed(() => {
  const countNodes = (nodes) => {
    let count = 0
    nodes.forEach(node => {
      count++
      if (node.children) {
        count += countNodes(node.children)
      }
    })
    return count
  }
  return countNodes(internalMapleges.value)
})

const maxDepth = computed(() => {
  const getDepth = (nodes, depth = 0) => {
    if (!nodes || nodes.length === 0) return depth
    let maxDepth = depth
    nodes.forEach(node => {
      if (node.children) {
        const childDepth = getDepth(node.children, depth + 1)
        maxDepth = Math.max(maxDepth, childDepth)
      }
    })
    return maxDepth
  }
  return getDepth(internalMapleges.value)
})

const hasChanges = computed(() => {
  if (!props.originalMapData || !props.originalMapData.children) return false
  return JSON.stringify(internalMapleges.value) !== JSON.stringify(props.originalMapData.children)
})

// Watchers
watch(() => props.modelValue, (newVal) => {
  dialog.value = newVal
})

watch(() => props.mapleges, (newVal) => {
  internalMapleges.value = [...newVal]
}, { deep: true })

watch(dialog, (newVal) => {
  if (!newVal) {
    emit('update:modelValue', false)
  }
})

// Methods com implementação mais robusta
const handleMindmapUpdate = (newValue) => {
  internalMapleges.value = newValue
}

const handleZoomChange = (zoom) => {
  currentZoom.value = Math.round(zoom * 100)
}

const handleNodeClick = (node) => {
  console.log('Nó clicado:', node)
}

// Aguardar o mindmap ser montado antes de tentar acessar os botões
const waitForMindmapButtons = () => {
  return new Promise((resolve) => {
    const checkButtons = () => {
      const fitButton = document.querySelector('.Mindmap_fit_fgvb6')
      const centerButton = document.querySelector('.Mindmap_gps_fgvb6')
      const downloadButton = document.querySelector('.Mindmap_download_fgvb6')
      
      if (fitButton && centerButton && downloadButton) {
        resolve({ fitButton, centerButton, downloadButton })
      } else {
        setTimeout(checkButtons, 100)
      }
    }
    checkButtons()
  })
}

const zoomIn = async () => {
  try {
    // Método 1: Tentar via eventos de teclado
    const mindmapElement = document.querySelector('.mindmap')
    if (mindmapElement) {
      const event = new WheelEvent('wheel', { deltaY: -100, ctrlKey: true })
      mindmapElement.dispatchEvent(event)
      return
    }
    
    // Método 2: Tentar via ref
    if (mindmapRef.value && mindmapRef.value.$el) {
      const svg = mindmapRef.value.$el.querySelector('svg')
      if (svg) {
        const event = new WheelEvent('wheel', { deltaY: -100 })
        svg.dispatchEvent(event)
      }
    }
  } catch (error) {
    console.warn('Zoom in não funcionou:', error)
  }
}

const zoomOut = async () => {
  try {
    // Método 1: Tentar via eventos de teclado
    const mindmapElement = document.querySelector('.mindmap')
    if (mindmapElement) {
      const event = new WheelEvent('wheel', { deltaY: 100, ctrlKey: true })
      mindmapElement.dispatchEvent(event)
      return
    }
    
    // Método 2: Tentar via ref
    if (mindmapRef.value && mindmapRef.value.$el) {
      const svg = mindmapRef.value.$el.querySelector('svg')
      if (svg) {
        const event = new WheelEvent('wheel', { deltaY: 100 })
        svg.dispatchEvent(event)
      }
    }
  } catch (error) {
    console.warn('Zoom out não funcionou:', error)
  }
}

const fitToScreen = async () => {
    if (mindmapRef.value) {
      mindmapRef.value.fitView?.()
    }
}

const resetView = () => {
  if (mindmapRef.value) {
  console.log('mindmapRef', mindmapRef.value);
    mindmapRef.value.centerView?.()
  }
}

const downloadMindmap = () => {
  if (mindmapRef.value) {
    mindmapRef.value.download?.()
  }
}

const addRootNode = () => {
  const newNode = {
    name: "Novo Tópico",
    children: []
  }
  internalMapleges.value.push(newNode)
}

const expandAll = () => {
  const expandNodes = (nodes) => {
    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        node.collapse = false
        expandNodes(node.children)
      }
    })
  }
  expandNodes(internalMapleges.value)
}

const collapseAll = () => {
  const collapseNodes = (nodes) => {
    nodes.forEach(node => {
      if (node.children && node.children.length > 0) {
        node.collapse = true
        collapseNodes(node.children)
      }
    })
  }
  collapseNodes(internalMapleges.value)
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

const handleConfirm = () => {
  emit('confirm', internalMapleges.value)
}

const handleCancel = () => {
  dialog.value = false
  emit('cancel')
  emit('update:modelValue', false)
}

const handleSave = async () => {
  if (!hasChanges.value || !props.mindMapId) return

  isSaving.value = true
  try {

    // Preparar dados para atualização
    const updatedData = {
      ...props.originalMapData,
      children: internalMapleges.value,
      idLaw: props.mindMapId
    }

    // Chamar função de atualização do store

    // Atualizar dados originais para refletir mudanças salvas
    originalMapData.value = JSON.parse(JSON.stringify(updatedData))

    // Emitir evento de sucesso
    emit('saved', updatedData)

  } catch (error) {
    console.error('Erro ao salvar mapa mental:', error)
    // O tratamento de erro já é feito no store com snackbar
  } finally {
    isSaving.value = false
  }
}

// Keyboard shortcuts
const handleKeydown = (event) => {
  if (!dialog.value) return
  
  const { key, ctrlKey, metaKey } = event
  const isCtrl = ctrlKey || metaKey
  
  switch (key) {
    case '+':
    case '=':
      if (isCtrl) {
        event.preventDefault()
        zoomIn()
      }
      break
    case '-':
      if (isCtrl) {
        event.preventDefault()
        zoomOut()
      }
      break
    case 'f':
    case 'F':
      if (!isCtrl) {
        event.preventDefault()
        fitToScreen()
      }
      break
    case 'c':
    case 'C':
      if (!isCtrl) {
        event.preventDefault()
        resetView()
      }
      break
    case 'd':
    case 'D':
      if (!isCtrl) {
        event.preventDefault()
        downloadMindmap()
      }
      break
    case 'F11':
      event.preventDefault()
      toggleFullscreen()
      break
    case 'Escape':
      if (isFullscreen.value) {
        toggleFullscreen()
      } else if (showHelp.value) {
        showHelp.value = false
      }
      break
  }
}

onMounted(async () => {
  document.addEventListener('keydown', handleKeydown)
  
  // Carregar o componente mindmap apenas no cliente
  if (import.meta.client) {
    try {
      const mindmapModule = await import('vue3-mindmap')
      mindmap.value = mindmapModule.default || mindmapModule
      
      // Importar o CSS
      await import('vue3-mindmap/dist/style.css')
      
      // Marcar como pronto para renderizar
      isClientReady.value = true
      
      // Aguardar o mindmap ser montado
      await nextTick()
      
      // Aguardar botões aparecerem
      setTimeout(async () => {
        try {
          await waitForMindmapButtons()
          console.log('Botões do mindmap encontrados e prontos para uso')
        } catch (error) {
          console.warn('Alguns botões do mindmap podem não estar disponíveis:', error)
        }
      }, 500)
    } catch (error) {
      console.error('Erro ao carregar vue3-mindmap:', error)
      isClientReady.value = false
    }
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.mindmap-card {
  min-height: 45vh;
  display: flex;
  flex-direction: column;
}

.mindmap-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.mindmap-header .v-icon {
  color: white !important;
}

.mindmap-toolbar {
  background-color: rgb(var(--v-theme-surface-variant));
  border-radius: 8px;
  border: 1px solid rgb(var(--v-theme-outline-variant));
}

.mindmap-container {
  position: relative;
  width: 100%;
  background: linear-gradient(45deg, #f8f9ff 25%, transparent 25%), 
              linear-gradient(-45deg, #f8f9ff 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #f8f9ff 75%), 
              linear-gradient(-45deg, transparent 75%, #f8f9ff 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

.mindmap-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
}

.controls-card {
  border-radius: 12px !important;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.mindmap-help {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
}

.help-card {
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.95) !important;
  border-radius: 12px !important;
}

.help-shortcuts {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.shortcut-item kbd {
  background-color: rgb(var(--v-theme-surface-bright));
  border: 1px solid rgb(var(--v-theme-outline));
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-family: monospace;
  min-width: 50px;
  text-align: center;
}

/* Sobrescrever estilos do vue3-mindmap para melhor aparência */
:deep(.mindmap) {
  font-family: 'Roboto', sans-serif;
}

:deep(.mindmap-node) {
  cursor: pointer;
  transition: all 0.3s ease;
}

:deep(.mindmap-node:hover) {
  transform: scale(1.05);
}

:deep(.mindmap-node-text) {
  font-weight: 500;
}

:deep(.mindmap-link) {
  stroke-width: 2;
  transition: all 0.3s ease;
}

/* Mostrar botões originais mas escondê-los visualmente */
:deep(.Mindmap_fit_fgvb6),
:deep(.Mindmap_gps_fgvb6),
:deep(.Mindmap_download_fgvb6) {
  opacity: 0 !important;
  pointer-events: none !important;
  position: absolute !important;
  top: -9999px !important;
}

/* Customizar cores dos nós por nível */
:deep(.mindmap-node[data-depth="0"]) {
  fill: #1976d2;
  color: white;
}

:deep(.mindmap-node[data-depth="1"]) {
  fill: #388e3c;
  color: white;
}

:deep(.mindmap-node[data-depth="2"]) {
  fill: #f57c00;
  color: white;
}

:deep(.mindmap-node[data-depth="3"]) {
  fill: #7b1fa2;
  color: white;
}

/* Animações */
.v-card-title,
.v-card-subtitle,
.v-card-text,
.v-card-actions {
  transition: all 0.3s ease;
}

.controls-card,
.help-card {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
