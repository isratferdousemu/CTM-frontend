
<template>
      <div class="locale-switcher">
        <!-- <select v-model="$i18n.locale">
          <option value="en">English</option>
          <option value="bn">Bangla</option>
        </select> -->
          <v-switch
                  v-model="$i18n.locale"
                  label="Bangla"
                  color="blue"
               
               value="bn"
                  hide-details
                   @change="handleSwitchChange"
                ></v-switch>
      </div>
</template>

<script>
export default {
   

    data() {
        return {
           
           
          
            
        };
    },

    mounted() {
        
    },

    methods: {
    
        //   handleSwitchChange(newLocale) {
        
        //     // If the switch is turned off, set the locale to "bn"
        //     if (!newLocale) {
        //         this.$i18n.locale = "en";
                
        //     }
        //     console.log(newLocale)
        // },
           handleSwitchChange(newLocale) {
            
             if (!newLocale) {
                    this.$i18n.locale = "en";

                    }
                   
        },
    },
};
</script>

<style>

</style>
