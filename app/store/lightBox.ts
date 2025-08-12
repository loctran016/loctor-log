import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

const lightBox = createGlobalState(() => {
    const state = ref(false)
    const toggle = function () { state.value = !state.value }
    return { state,toggle }
})

export default lightBox
