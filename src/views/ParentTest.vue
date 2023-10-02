<template>
<div>
    <h1>Parent Component</h1>
    <child-test></child-test>
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
