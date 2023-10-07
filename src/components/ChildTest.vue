<template>
<div>
    <h2>Child Component</h2>
    <button @click="openModal">Open Modal</button>
    <TestModal v-if="isModalOpen" @dirk="closeModal"/>
</div>
</template>

<script>
import TestModal from './TestModal.vue';

export default {
data() {
    return {
    isModalOpen: false,
    };
},
methods: {
    openModal() {
    this.isModalOpen = true;
    },
    closeModal() {
    this.isModalOpen = false;
    },
},
components: {
    TestModal,
},
};
</script>
