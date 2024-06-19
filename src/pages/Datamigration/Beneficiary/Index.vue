<template>
  <div id="Beneficery-management">
    <v-row class="mx-5 mt-4">
      <v-col cols="12">
        <v-row>
          <Spinner :loading="isLoading" />
          <v-col cols="12">
            <v-card
                elevation="10"
                color="white"
                rounded="md"
                theme="light"
                class="mb-8"
            >
              <v-card-title
                  class="justify-center text-center"
                  tag="div"
                  style="background-color: #1C3B68; color: white; font-size: 17px; padding: 1px !important;"
              >
                <h4 class="text-uppercase mt-3">
                  {{ 'Beneficiary Migration' }}
                </h4>
              </v-card-title>
              <v-card-text>
                <v-container>

                  <v-file-input
                      label="Upload File"
                      @change="directFileUpload"
                      dense
                      outlined
                      prepend-icon="mdi-file-upload"
                      accept=".csv"
                  ></v-file-input>

                  <!-- Display Different Column Names if there are any -->
                  <v-card v-if="Object.values(different_column).length" class="mb-4">
                    <v-card-title>
                      <h3>Different Column Names: {{ Object.values(different_column).length }}</h3>
                    </v-card-title>
                    <v-card-text>
                      <v-list>
                        <v-list-item
                            v-for="(columnName, index) in different_column"
                            :key="index"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{ index }}: {{ columnName }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                  </v-card>

                  <!-- Display CSV Data if available -->
                  <v-card v-if="csvData.length" class="mb-4">
                    <v-card-title>
                      <h2>Preview</h2>
                    </v-card-title>
                    <v-card-text>
                      <v-data-table
                          :headers="tableHeaders"
                          :items="csvData.slice(1)"
                          :items-per-page="5"
                          class="elevation-1"
                      >
                        <template v-slot:item="props">
                          <tr>
                            <td v-for="(cell, cellIndex) in props.item" :key="cellIndex">
                              {{ cell }}
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="uploadFile" color="primary">Upload</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Spinner from "@/components/Common/Spinner.vue";
import Swal from "sweetalert2";

export default {
  name: "Beneficery-management",
  data() {
    return {
      file: null,
      csvData: [],
      different_column: [],
      errors:{},
      isLoading: false,
    };
  },
  components: {
    Spinner,
  },
  methods: {
    async directFileUpload() {
      this.isLoading = true;
      this.file = null;
      this.file =event.target.files[0];
      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const response = await this.$axios.post('/admin/beneficiary/upload-csv', formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        });
        if(response.status == 200) {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'File uploaded successfully'
          });
          this.different_column = response.data.column_diff;
          this.csvData = response.data.data;

        }
        // alert('File uploaded successfully');
      } catch (error) {
        this.isLoading = false;
        this.csvData = [];
        this.file = null;
        this.errors = {}
        this.errors = error.response.data.errors;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:JSON.stringify(this.errors)
        });
        // alert('Error uploading file');
      }
    },

    async uploadFile() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('final_data', JSON.stringify(this.csvData));
      // formData.append('final_data', JSON.stringify(this.csvData.slice(1)));
      try {
        const response = await this.$axios.post('/admin/beneficiary/upload-csv/store', formData, {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
            "Content-Type": "multipart/form-data",
          },
        });
        if(response.status == 200) {
          this.isLoading = false;
          this.csvData = [];
          // alert('File uploaded successfully');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'File uploaded successfully'
          });
        }
      } catch (error) {
        this.isLoading = false;
        this.csvData = [];
        this.errors = {}
        this.errors = error.response.data.errors;
        this.file = null
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:JSON.stringify(this.errors)
        });
        // alert('Error uploading file');
      }
    }
  },
  created() {

  },
  mounted() {

  }
};
</script>

<style scoped>

</style>
