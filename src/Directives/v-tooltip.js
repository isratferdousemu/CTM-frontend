// v-tooltip.js

import Vue from "vue";

// Register a global custom directive called `v-custom-directive`
Vue.directive("tooltip", {
  // Bind hook (optional)
  bind(el, binding) {
    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = binding.value;
    tooltip.style.display = "none";

    el.appendChild(tooltip);

    el.addEventListener("mouseenter", () => {
      tooltip.style.position = "absolute";
    });

    el.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
  },
});
