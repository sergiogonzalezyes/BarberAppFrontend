<template>
<div>
    <h1>Parent Component</h1>
    <ChildTest />
</div>
</template>

<script>
import ChildTest from '@/components/ChildTest.vue';

export default {
components: {
    ChildTest,
},
};
</script>
