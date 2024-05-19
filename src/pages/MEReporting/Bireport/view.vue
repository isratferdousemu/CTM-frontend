<template>
  <div id="powerBiReport">
    <v-row class="mx-2 mt-2">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading"/>
          <v-col cols="12" id="print-section">
            <v-card-title class="justify-center" tag="div" style="text-align:center; background-color: #1C3B68; color: white;font-size: 17px;">
              <h4 class="text-uppercase">

                {{ reportInfo.name_en }}
              </h4>
            </v-card-title>

            <div>

              <iframe
                  :title="title"
                  width="100%" height="541.25"
                  :src="src"
                  frameborder="0" allowFullScreen="true">
              </iframe>

            </div>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {extend, ValidationProvider, ValidationObserver} from "vee-validate";
import {required} from "vee-validate/dist/rules";
import Spinner from "@/components/Common/Spinner.vue";
import {http} from "@/hooks/httpService";

extend("required", required);
export default {
  name: "Index",
  title: "CTM - Power BI Reports",
  data() {
    return {
      data: {
        id: null,
      },
      isLoading: false,
      reportInfo:[],
      title: null,
      src: null,
    };
  },
  components: {
    Spinner,
    ValidationProvider,
    ValidationObserver,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.Drawer;
      },
      set(v) {
        return this.$store.commit("setDrawer", v);
      },
    },
  },
  methods: {

    viewPowerBiReport(id) {
      this.isLoading = true;
      this.$axios.get(`admin/report/power-bi-report/${id}`, {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
          "Content-Type": "multipart/form-data",
        },
      })
          .then((response) => {
            this.reportInfo = response.data.power_report;

            const titleMatch = this.reportInfo?.embaded_code?.match(/title="([^"]+)"/);
            const srcMatch = this.reportInfo?.embaded_code?.match(/src="([^"]+)"/);

            if (titleMatch && srcMatch) {
              this.title = titleMatch[1];
              this.src = srcMatch[1];
            } else {
              console.error('Title or Src not found in the iframe code.');
            }

            this.isLoading = false;

          })
          .catch((err) => {
            this.isLoading = false;
            console.log(err)
          })

    },
  },
  created() {

  },
  mounted() {
    this.drawer = true;
    this.viewPowerBiReport(this.$route.params.id)
  },
  beforeMount() {

  },
};
</script>
<style>


</style>