<template>
    <div id="success">
         <v-app-bar color="#405c61" fixed height="80" class="px-4" dense dark>
          <v-row align="center" no-gutters>
                  <v-img class="p-3 mr-4" max-height="100%" max-width="60px" position="center center" src="/assets/images/logo.png"></v-img>
                  <v-toolbar-title>{{ $t('container.application_selection.application.title_online_1') }}<br>{{ $t('container.application_selection.application.title_online_2') }}
                  </v-toolbar-title>
           
  
        
              <v-col>
                <!-- Empty column to create space between title and LocaleSwitcher -->
              </v-col>
              <v-col>
                  <!-- Empty column to create space between title and LocaleSwitcher -->
                </v-col>
                <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                  </v-col>
                   <v-col>
                    <!-- Empty column to create space between title and LocaleSwitcher -->
                  </v-col>
                   <v-col>
                      <!-- Empty column to create space between title and LocaleSwitcher -->
                    </v-col>
                    <v-col>
                        <!-- Empty column to create space between title and LocaleSwitcher -->
                      </v-col>

              <v-col>
                <v-row align="center" justify="end" no-gutters>
                  <v-col>
                    <!-- Adjust the styling of LocaleSwitcher as needed -->
                    <LocaleSwitcher />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
        </v-app-bar>
        <v-row class="mt-10">
            <v-col cols="6" class="mx-auto mt-10">
                <v-card>
                    <v-card-text class="mt-10 text-center">
                        <p style="font-size: 40px" class="green--text mt-5">
                             {{ $t('container.application_selection.application.successfull') }}
                            
                          </p>
                        <p style="font-size: 20px" class="mt-5"> {{ $t('container.application_selection.application.tracking') }} {{ successId }}</p>

                       
                        <v-btn elevation="2" class="btn mr-2 white--text" color="red darken-4" @click="generatePDF">
                            {{ $t("container.list.PDF") }}
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import LocaleSwitcher from "@/components/Common/LocaleSwitcher"
export default {
     components: {
      
        LocaleSwitcher
    },

    computed: {
        successId() {
            return this.$store.state.ApplicationSelection.successId;
        },
    },
    methods: {
        generatePDF() {
            const queryParams = {
                // application_id: this.successId,
                //   application_id: this.successId,
                language: this.$i18n.locale,
                  application_id: "Ez0Y44jmdD",
                  program: this.$t('container.application_selection.application.program'),
                  title: this.$t('container.application_selection.application.title')
            };
            this.$axios
                .get("/global/applicants_copy", {
                    headers: {
                        Authorization: "Bearer " + this.$store.state.token,
                        "Content-Type": "multipart/form-data",
                    },
                    params: queryParams,
                })
                .then((result) => {
                    window.open(result.data.data.url, '_blank');
                })
                .catch(error => {
                    console.error('Error generating PDF:', error);
                });
        },
    }
};
</script>
