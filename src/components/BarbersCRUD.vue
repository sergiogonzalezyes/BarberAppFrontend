<template>
  <div>
    <table class="custom-table">
      <thead>
        <tr>
          <th :class="{ 'dark-mode': isDarkMode }">ID</th>
          <th :class="{ 'dark-mode': isDarkMode }">First Name</th>
          <th :class="{ 'dark-mode': isDarkMode }">Services</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="barber in barbers" :key="barber.User_ID">
          <td :class="{ 'dark-mode': isDarkMode }">{{ barber.User_ID }}</td>
          <td :class="{ 'dark-mode': isDarkMode }">{{ barber.F_Name }}</td>
          <td>
            <ul>
              <li v-for="service in barber.Services" :key="service.Service_ID">
                {{ service.Service_Name }}
                <div class="custom-checkbox">
                  <input
                    type="checkbox"
                    :id="`checkbox-${barber.User_ID}-${service.Service_ID}`"
                    :checked="service.Status === 'Enabled'"
                    @change="toggleServiceStatus(barber.User_ID, service.Service_ID)"
                  />
                  <label :for="`checkbox-${barber.User_ID}-${service.Service_ID}`"></label>
                </div>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      barbers: [],
      isDarkMode: false, // Add a data property for tracking dark mode
      api_key: process.env.VUE_APP_PROD_API,
    };
  },

  methods: {
    async getBarbers() {
      try {
        // const response = await axios.get('http://localhost:5001/barber_crud');
        const response = await axios.get(this.api_key+'/barber_crud');
        console.log(response.data);

        if (typeof response.data === 'object') {
          // Convert the object into an array of objects
          this.barbers = Object.values(response.data);
        } else {
          console.error('Response data is not an object:', response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },

    toggleServiceStatus(barberId, serviceId) {
      const barber = this.barbers.find((b) => b.User_ID === barberId);

      if (barber) {
        const service = barber.Services.find((s) => s.Service_ID === serviceId);

        if (service) {
          // Toggle the status (assuming 'Enabled' becomes 'Disabled' and vice versa)
          service.Status = service.Status === 'Enabled' ? 'Disabled' : 'Enabled';

          // Call the updateServiceStatus method to send the PUT request
          this.updateServiceStatus(barberId, serviceId, service.Status);
        } else {
          console.log('Service not found');
        }
      } else {
        console.log('Barber not found');
      }
    },

    async updateServiceStatus(barberId, serviceId, newStatus) {
      try {
        // const response = await axios.put(`http://localhost:5001/barber_crud/${barberId}/services/${serviceId}`, {
        const response = await axios.put(this.api_key+`/barber_crud/${barberId}/services/${serviceId}`, {
          status: newStatus,
        });

        // Handle the response if needed
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },

  created() {
    this.getBarbers();
  },
};
</script>

<style scoped>
.custom-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.custom-checkbox {
  position: relative;
  display: inline-block;
  margin-right: 10px; /* Adjust spacing between label and checkbox */
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox label {
  position: relative;
  display: inline-block;
  width: 20px; /* Adjust the checkbox size as needed */
  height: 20px; /* Adjust the checkbox size as needed */
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: #fff;
}

.custom-checkbox input[type="checkbox"]:checked + label::before {
  content: '\2713'; /* Unicode checkmark character */
  font-size: 16px; /* Adjust the checkmark size as needed */
  color: red; /* Change the color of the checkmark */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>