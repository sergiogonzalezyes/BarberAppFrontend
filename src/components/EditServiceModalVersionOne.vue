<template>
<v-dialog v-model="loaclDialogOpen" max-width="500px">
    <v-card>
    <v-card-title>Edit Service: {{ editedService.Service_Name }}</v-card-title>
    <v-card-text>
        <!-- Form for editing service details -->
        <v-form @submit.prevent="updateService">
        <v-text-field v-model="editedService.Service_Name" label="Service Name"></v-text-field>
        <v-text-field v-model="editedService.Service_Description" label="Service Description"></v-text-field>
        <v-text-field v-model="editedService.Service_Price" label="Service Price"></v-text-field>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn color="primary" @click="updateService">Save</v-btn>
        <v-btn color="error" @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
props: {
    dialogOpen: Boolean, // Prop to control the dialog visibility
    serviceData: Object, // The service data to edit
},
data() {
    return {
    loaclDialogOpen: this.dialogOpen, // Local copy of the dialog open prop
    editedService: { ...this.serviceData }, // Copy of the service data to edit
    };
},
methods: {
    updateService() {
    // Send the updated service data to the parent component
    this.$emit('update-service', this.editedService);

    // Close the dialog
    this.closeDialog();
    },
    closeDialog() {
    // Close the dialog
    this.localDialogOpen = false;
    },
},
};

</script>

<style scoped>
</style>
