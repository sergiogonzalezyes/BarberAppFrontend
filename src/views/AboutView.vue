<template>
    <div class="about">
        <AboutLayout />
        <FooterPartial />
    </div>
</template>

<script>
import AboutLayout from '../components/AboutLayout.vue';
import FooterPartial from '@/components/FooterPartial.vue';


export default {
    name: 'AboutView',
    components: {
            AboutLayout,
            FooterPartial,
        },
    };
</script>

<style>


@media (min-width: 1024px) {
.about {
    min-height: 100vh;
    display: flex;
    align-items: center;
}
}
</style>
  