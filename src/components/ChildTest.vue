<template>
<div>
    <h2>Child Component</h2>
    <button @click="openModal">Open Modal</button>
    <test-modal v-if="isModalOpen" @close="closeModal"></test-modal>
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
