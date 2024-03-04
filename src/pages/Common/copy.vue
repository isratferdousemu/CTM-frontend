<template>
  <div class="copy-field-container">
    <div class="content">
      <div style="width: 400px">
        <v-text-field
          label="Browser Fingerprint"
          append-inner-icon="mdi-clipboard-outline"
          @click:append-inner="browserCopyToClipboard"
          v-model="fingerPrint"
          outlined
        ></v-text-field>

        Please copy the browser fingerprint information and provide it to your supervisor.

<!--        <v-text-field
          label="IP Address"
          append-inner-icon="mdi-clipboard-outline"
          @click:append-inner="copyToClipboard"
          v-model="ipAddress"
          outlined
        ></v-text-field>-->
      </div>
    </div>
  </div>
</template>

<script>
// import { getFingerprint } from '../plugins/fingerprint.js';
import { getFingerprint } from "../../plugins/fingerprint.js";

export default {
  data() {
    return {
      ipAddress: window.location.hostname,
      fingerPrint: "",
      copied: false,
    };
  },
  methods: {
    checkIp() {
      let ip = window.location.hostname;
      let value = "127.0.0.1";
      if (ip == "localhost") {
        this.ipAddress = value;
      }
    },
    copyToClipboard() {
      let ip = window.location.hostname;
      let value = "127.0.0.1";
      if (ip == "localhost") {
        this.ipAddress = value;
      }

      console.log("click icon");
      const textArea = document.createElement("textarea");
      textArea.value = this.ipAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.copied = true;
      setTimeout(() => (this.copied = false), 1500); // Show "Copied!" for 1.5 seconds
      window.alert("Copied");
    },
    browserCopyToClipboard() {
      console.log("click icon");
      const textArea = document.createElement("textarea");
      textArea.value = this.fingerPrint;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      this.copied = true;
      setTimeout(() => (this.copied = false), 1500); // Show "Copied!" for 1.5 seconds
      window.alert("Copied");
    },
  },
  async created() {
    this.checkIp();
    const fingerprint = await getFingerprint();
    this.fingerPrint = fingerprint;
  },
};
</script>

<style>
.copy-field-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* Make the container take the full height of the viewport */
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
