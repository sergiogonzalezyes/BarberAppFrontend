<template>
    <div class="reviews">
        <ReviewLayout />
        <FooterPartial />
    </div>
</template>

<script>
import ReviewLayout from '../components/ReviewLayout.vue';
import FooterPartial from '@/components/FooterPartial.vue';


export default {
    name: 'ReviewView',
    components: {
            ReviewLayout,
            FooterPartial,
        },
    };
</script>

<style>


@media (min-width: 1024px) {
.reviews {
    min-height: 100vh;
    display: flex;
    align-items: center;
}
}
</style>
  