<template>
  <div class="about-container">
    <section class="about-header">
      <img src="profile.png" class="danny-portrait"/>
      <h1>About Danny - The Barber Extraordinaire</h1>
    </section>

    <section class="about-content">
      <p>Welcome to Danny's world of precision and style. Having served countless satisfied customers since 2010, Danny is known for his dedication to perfection and the individualized attention he gives to every client.</p>
      
      <h2>Services Offered</h2>
      <ul>
        <li>Classic Haircuts</li>
        <li>Modern & Trendy Styles</li>
        <li>Beard Trimming & Shaping</li>
        <li>Hot Towel Shaves</li>
        <li>Facial Massages</li>
        <li>Special Events & Wedding Services</li>
      </ul>

      <h2>Danny's Philosophy</h2>
      <p>Danny believes that a haircut is not just about changing your look, but about enhancing your personality and boosting your confidence. Whether you're here for a quick trim or a complete makeover, Danny ensures that you leave the chair feeling better than ever.</p>

      <h2>Book an Appointment</h2>
      <p>Experience the magic of Danny's scissors and feel the difference. <a href="/contact">Contact us</a> now to book an appointment.</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutLayout",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.about-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.about-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.danny-portrait {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.about-content {
  margin-top: 30px;
}

.about-content h2 {
  margin-top: 20px;
}

.about-content ul {
  list-style-type: disc;
  padding-left: 40px;
}
</style>
