import "@mdi/font/css/materialdesignicons.css";
import "vuetify/dist/vuetify.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import * as labsComponents from "vuetify/labs/components";
export default createVuetify({
  components: {
    ...components,
    ...directives,
    ...labsComponents,
  },
});
