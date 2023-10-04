<template>
    <div class="parentdiv">
        <v-row>
            <v-col v-for="(review, index) in reviews" :key="index" cols="12" sm="6" md="4">
                <v-card class="cards">
                    <v-avatar size="80">
                        <v-img :src="review.avatar" alt="Reviewer Avatar"></v-img>
                    </v-avatar>
                    <v-card-title class="hm1">
                        <h2 class="hmm">{{ review.name }}</h2>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <p>{{ review.text }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            reviews: [
                {
                    name: 'John Doe',
                    text: 'Danny is the best barber I have ever had. His attention to detail is unmatched and every haircut feels personalized.',
                    avatar: '/profile.png',
                },
                {
                    name: 'Jane Smith',
                    text: 'I was nervous about getting a short cut, but Danny made it look fantastic! So pleased with the results.',
                    avatar: '/profile.png',
                },
                {
                    name: 'Miguel Gomez',
                    text: 'Danny has an amazing touch when it comes to styling. My hair has never looked better. Definitely coming back!',
                    avatar: '/profile.png',
                }
            ]
        };
    },
};
</script>

<style scoped>
.parentdiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cards {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


.hm1 {
    display: flex;
    justify-content: center;
    align-items: center;    
    text-align: center;
}

.hmm {
    display: flex;
    justify-content: center;
    align-items: center;
}

.v-avatar {
    margin: 15px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
