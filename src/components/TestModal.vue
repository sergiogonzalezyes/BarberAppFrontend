<template>
<div>
    <div class="modal">
    <h3>Modal Component</h3>
    <p>This is a modal. Click the button below to close it.</p>
    <button @click="$emit('dirk')">Close Modal</button>
    </div>
</div>
</template>

<script>
export default {
name: 'TestModal',
};



</script>

<style scoped>
.modal {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
}
</style>
