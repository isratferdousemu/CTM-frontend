<template>
  <div v-if="loading" class="spinner-overlay">
    <div class="spinner">
      <div class="spinner-inner"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
/* Style for the spinner overlay */
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style for the spinner */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.spinner-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
