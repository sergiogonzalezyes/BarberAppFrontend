<template>
<v-dialog v-model="localDialog" class="mx-auto">
    <v-card class="mx-auto">
    <v-card-title>Edit Service: {{ editedService.Service_Name }}</v-card-title>
    <v-card-text>
        <v-form ref="form" v-model="valid">
        <v-text-field label="Service Name" v-model="editedService.Service_Name" :rules="[v => !!v || 'Service Name is required']"></v-text-field>
        <v-text-field label="Service Description" v-model="editedService.Service_Description" :rules="[v => !!v || 'Service Description is required']"></v-text-field>
        <v-text-field label="Service Price" v-model="editedService.Service_Price" :rules="[v => !!v || 'Service Price is required']"></v-text-field>
        <v-text-field label="Service Duration" v-model="editedService.Service_Duration" :rules="[v => !!v || 'Service Duration is required']"></v-text-field>
        </v-form>
    </v-card-text>
    <v-card-actions>
        <v-btn color="orange" text @click="submitForm">Save Changes</v-btn>
        <v-btn color="red" text @click="closeDialog">Cancel</v-btn>
    </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import axios from 'axios'; // Import axios here

export default {
name: 'EditServiceModal',
props: ['service', 'dialog'],
data() {
    return {
    localDialog: this.dialog,
    valid: false,
    editedService: { ...this.service }, // Create a copy of the prop
    };
},
watch: {
    dialog(newVal) {
    console.log('Dialog value changed:', newVal);
    if (!newVal) {
        this.resetState();
    }
    },
    localDialog(newVal) {
    if (newVal !== this.dialog) {
        this.$emit('update:dialog', newVal);
    }
    console.log('Local dialog value changed:', newVal);
    if (!newVal) {
        this.resetState();
    }
    },
},
methods: {
    async submitForm() {
    try {
        const response = await axios.put(`http://localhost:5001/updateservice/${this.editedService.Service_ID}`, this.editedService);
        console.log(response);
        this.$emit('service-updated', this.editedService);
        this.closeDialog();
    } catch (error) {
        console.log(error);
    }
    },
    closeDialog() {
    this.localDialog = false;
    this.$emit('dialog-closed');
    // refresh page after closing dialog
    window.location.reload();
    },
    resetState() {
    this.valid = false;
    },
},
};
</script>

<style>
.modal-size {
width: 600px;
}
</style>
