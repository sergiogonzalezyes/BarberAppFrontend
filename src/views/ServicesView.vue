<template>
    <div class="parentdiv">
        <ServicesLayout :services="services" :userRole="userRole" class="cards"/>
        <v-divider class="my-5"></v-divider>
        <FooterPartial />
    </div>
</template>

<script>
import ServicesLayout from '@/components/ServicesLayout.vue';
import { mapState } from 'vuex';
import FooterPartial from '@/components/FooterPartial.vue';

export default {
    data() {
        return {
        services: [
            // Initially empty, to be filled with fetched services
            ],
        };
    },
    computed: {
        ...mapState({
        userRole: state => state.app.role,
        }),
    },
    methods: {
        fetchServices() {
        // Simulated fetch, replace with actual API call later
        this.services = [
            { id: 1, name: 'Haircut', description: 'A standard haircut.', price: 20, image: 'sample1.png' },
            { id: 2, name: 'Beard trim', description: 'A standard beard trim.', price: 10, image: 'sample3.png' },
            { id: 3, name: 'Cut & beard trim', description: 'A standard haircut and beard trim.', price: 25, image: 'sample2.png' },
            { id: 4, name: 'Head shave', description: 'A standard head shave.', price: 15, image: 'sample2.png' },
            { id: 5, name: 'Cut, Beard trim, Eyebrows', description: 'A standard haircut, beard trim, and eyebrow shaping.', price: 25, image: 'sample3.png' },
            { id: 6, name: 'Cut, Beard trim, Eyebrows, Shave', description: 'A standard haircut, beard trim, eyebrow shaping, and shave.', price: 30, image: 'sample1.png'}
        ];
        },
    },
    created() {
        console.log('BookingModal created');
        this.fetchServices();
        console.log('userrole in parent component:', this.userRole)
    },
    components: {
        ServicesLayout,
        FooterPartial,
    },

    mounted() {
        console.log('BookingModal mounted');
    },
    beforeDestroy() {
        console.log('BookingModal will be destroyed');
    }
    };
</script>
  
<style scoped>
.parentdiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 1rem;
}
.cards {
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    
}

@media (min-width: 1024px) {
    .parentdiv {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}


</style>