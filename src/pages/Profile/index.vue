<template>
  <div id="application_view">
    <v-row class="mx-5 my-5 mt-5">
      <v-col class="mt-5" cols="12">
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <form @submit.prevent="submitApplication()">
            <v-card class="pa-5 px-10 mb-4">
              <div>
                <!-- personal information -->
                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{ $t("container.profile.personal_info") }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <div class="pa-2 mb-4">
                      <v-row>
                        <v-col cols="6" lg="6">
                          <v-img
                            :src="userData.imageUrl"
                            style="
                              width: 200px;
                              height: 200px;
                              border: 1px solid #ccc;
                            "
                            class="mb-5"
                          ></v-img>
                        </v-col>
                        <v-col cols="6" align-self="end" lg="6">
                          <v-img
                            :src="userData.signUrl"
                            style="
                              width: 200px;
                              height: 80px;
                              border: 1px solid #ccc;
                            "
                            class="mb-5"
                            v-if="userData.signUrl"
                          ></v-img>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{ $t("container.profile.name_en") }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ data.full_name }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{ $t("container.profile.username") }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ data.username ?? "---" }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{ $t("container.profile.brithday") }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ data.brithday ?? "---" }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="6" lg="6">
                          <v-row>
                            <v-col cols="4" lg="4">
                              <label>
                                {{ $t("container.profile.gender") }}
                              </label></v-col
                            >
                            <v-col cols="8" lg="8">
                              :<template>
                                <span style="20px">
                                  {{ userData.gender ?? "---" }}
                                </span>
                              </template>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>
                </v-card>
                <!-- Personal Information end-->

                <!-- 3rd Expansion panel -->
                <!-- Contact Information -->

                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{ $t("container.profile.contact_info") }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <v-row>
                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{ $t("container.profile.email") }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ data?.email }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" cols="12">
                        <v-row>
                          <v-col cols="4" lg="4">
                            <label>
                              {{ $t("container.profile.phone" ?? "---") }}
                            </label></v-col
                          >
                          <v-col cols="8" lg="8">
                            :<template>
                              <span style="20px">
                                {{ data.mobile ?? "---" }}
                              </span>
                            </template>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>

                <v-card class="mt-5">
                  <v-card-title style="background-color: #1976d2; color: white">
                    {{ $t("container.profile.change_pass") }}
                  </v-card-title>

                  <v-card-text class="mt-5">
                    <v-form ref="passwordForm" @submit.prevent="updatePassword">
                      <v-row>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="password"
                            label="New Password"
                            type="password"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <v-text-field
                            v-model="retypePassword"
                            label="Retype Password"
                            type="password"
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12">
                          <v-btn type="submit" color="primary"
                            ><label>
                              {{ $t("container.profile.update_pass") }}
                            </label></v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
                <!-- Contact Information End -->

                <!-- Other Information of Eligibility end-->
              </div>
              <div
                style="display: flex; justify-content: flex-end"
                class="mt-5"
              >
                <!-- Other content on the left -->

                <!-- <v-btn
                  flat
                  color="gray"
                  type="submit"
                  @click="navigateTolist"
                  class="custom-btn"
                >
                  {{ $t("container.list.back") }}
                </v-btn> -->
              </div>
            </v-card>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>
    <FooterBar />
  </div>
</template>

<script>
import { mapState } from "vuex";
import FooterBar from "@/components/Common/FooterBar.vue";
import { extend, ValidationProvider, ValidationObserver } from "vee-validate";
import axios from "axios";
import { required } from "vee-validate/dist/rules";
import Form from "vform";

export default {
  title: "CTM -  Profile",
  data() {
    return {
      data: {},
      password: "",
      retypePassword: "",
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
    }),
    userId() {
      return this.userData ? this.userData.id : null;
    },
  },

  methods: {
    navigateTolist() {
      this.$router.push("/dashboard");
    },

    async getUserById() {
      try {
        this.$axios
          .get(`/admin/user/get-user/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + this.$store.state.token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data) {
              this.data = res.data.data;
            } else {
              this.$toast.error("Something went wrong");
            }
          })
          .catch((err) => {
            console.log("🚀 ~ getUserById ~ err:", err);
            // if (err.response?.data?.errors) {
            //   this.$refs.form.setErrors(err.response.data.errors);
            // }
            // console.log(err.response);
            // this.$toast.error(err?.response?.data?.message);
          });
      } catch (e) {
        console.log(e);
      }
    },

    async updatePassword() {
      console.log("update password");
      if (this.password == "") {
        this.$toast.warning("Please enter password");
        return;
      }
      if (this.password !== this.retypePassword) {
        this.$toast.error("Passwords do not match");
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        };
        const response = await axios.post(
          "/admin/user/password-update",
          {
            password: this.password,
            userId: this.data.id,
          },
          config
        );

        console.log(response.data);
        if (response.data.success) {
          this.$toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error updating password:", error);
        this.$toast.error("Error updating password. Please try again later.");
      }
    },
  },

  mounted() {
    this.getUserById();
  },

  // created() {
  //   getUserById()
  // },
  components: {
    ValidationProvider,
    ValidationObserver,
    FooterBar,
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.personal-info-card {
  width: 100%;
}

.basic-info-card {
  width: 80%;
}
</style>
