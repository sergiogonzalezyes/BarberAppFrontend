<template>
    <div class="schedule">
        <ScheduleLayout />
        <FooterPartial />
    </div>
</template>

<script>
import ScheduleLayout from '../components/ScheduleLayout.vue';
import FooterPartial from '@/components/FooterPartial.vue';


export default {
    name: 'ScheduleView',
    components: {
        ScheduleLayout,
        FooterPartial,
    },
};
</script>

<style>
</style>
  