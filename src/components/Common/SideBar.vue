<template lang="">
  <div>
    <v-navigation-drawer width="320"
    elevation="0"
    v-model="Drawer"
    :clipped="clipped"
    color="rgba(28, 59, 104, 1)"
    fixed
    app
    class="mr-9 ml-3 my-3 nav-height rounded-lg nav-left-custom">
    <v-divider></v-divider>
    <v-list two-line  class="white--text left-sidebar p-0">
        <template v-for="(menu,index) in menus">
            <v-list-item  class="white--text" v-if="menu.children.length==0"
            router
            link
            :class="checkIsActive(menu?.page_link!=null ? menu.page_link.page_url : menu.link) ? 'v-list-item--active' : ''"
            @click="extarnalUrl(menu?.page_link!=null ? menu.page_link.page_url : menu.link,menu.link_type)"
            v-can="menu.link_type==2?'common':menu?.page_link?.name"
            > 
            <!-- :to="menu?.page_link!=null ? menu.page_link.page_url : menu.link" -->
        
                <v-list-item-title  > {{language=='bn'?menu.label_name_bn:menu.label_name_en}}</v-list-item-title>
              </v-list-item>
            <!-- single menu end  -->
             <!-- sub menu start  -->
            <v-list-group v-else v-can="getPermissionName(menu)"
            :value="false" class="sub_menus"  >
            <template v-slot:activator>
              <v-list-item-title class="white--text">{{language=='bn'?menu.label_name_bn:menu.label_name_en}}</v-list-item-title>
            </template>
            <template v-for="(subMenu) in menu.children">
            <v-list-group  v-if="subMenu.children.length!=0"
            :value="false" v-can="getPermissionName(subMenu)"
            sub-group prepend-icon="mdi-chevron-down"
          >
            <template v-slot:activator >

              <v-list-item-content>
                <v-list-item-title class="pl-1 white--text"> {{language=='bn'?subMenu.label_name_bn:subMenu.label_name_en}}</v-list-item-title>
              </v-list-item-content>
            
            </template>
            <v-list-item class="white--text"
              v-for="(subSubMenu,subSubIndex) in subMenu.children"
              :key="subSubIndex"
              router
            link
            :class="checkIsActive(subSubMenu?.page_link!=null ? subSubMenu.page_link.page_url : subSubMenu.link) ? 'v-list-item--active' : ''"
            @click="extarnalUrl(subSubMenu?.page_link!=null ? subSubMenu.page_link.page_url : subSubMenu.link,subSubMenu.link_type)"
            v-can="subSubMenu?.page_link?.name"
            >
            <!-- :to="subSubMenu?.page_link!=null ? subSubMenu.page_link.page_url : subSubMenu.link" -->
            <v-list-item-icon>
              <v-icon >mdi-minus </v-icon>
            </v-list-item-icon>
              <v-list-item-title class="white--text" v-text="language=='bn'?subSubMenu.label_name_bn:subSubMenu.label_name_en"></v-list-item-title>
            </v-list-item>
            <!-- sub sub  -->
           
            <!-- sub sub end -->
          </v-list-group>

          <v-list-item v-else
            router
            link
            class="white--text"
            :class="checkIsActive(subMenu?.page_link!=null ? subMenu.page_link.page_url : subMenu.link) ? 'v-list-item--active' : ''"
            @click="extarnalUrl(subMenu?.page_link!=null ? subMenu.page_link.page_url : subMenu.link,subMenu.link_type)"
            v-can="subMenu?.page_link?.name"
            >
            <!-- :to="subMenu?.page_link!=null ? subMenu.page_link.page_url : subMenu.link" -->
                <!-- <v-list-item-icon>
                  <v-icon>mdi-minus</v-icon>
                </v-list-item-icon> -->
                <v-list-item-icon>
                  <v-icon >mdi-minus </v-icon>
                </v-list-item-icon>
                <v-list-item-title class="white--text">{{language=='bn'?subMenu.label_name_bn:subMenu.label_name_en}}</v-list-item-title>
              </v-list-item>

            </template>
          </v-list-group>
            

        </template>
    
  
    
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import {http} from "@/hooks/httpService";

export default {
  data() {
    return {
      menu: false,
      clipped: false,
      fixed: false,
    };
  },
  computed: {
    menus: {
      get() {
        return this.$store.state.menus;
      },
      set(v) {
        return this.$store.commit("setMenus", v);
      },
    },
    language: {
      get() {
        return this.$store.getters.getAppLanguage;
      },
    },
    Drawer: {
      get() {
        return this.$store.state.Drawer;
      },
      set(v) {
        return this.$store.commit("setDrawer", v);
      },
    },
  },
  methods: {
    checkIsActive(url) {
      return this.$route.path == url;
    },
    extarnalUrl(url,type) {
      if (type == 1) {
        console.log(url, 'url');
        if (this.$route.path != url && url!=null) {
          this.$router.push(url);
        }
        // add active class v-list-item--active in current dom menu
      }
      if (type == 2) {
        window.open(url, '_blank');
        
      }
      
    },
    setUrl(url, type) {

      // 
      
    },

    getPermissionName(menu) {
      // menu.link_type==2?'common':menu?.page_link?.name
      console.log(menu.permission,'permission');
      if(menu.permission!=null){
        return menu.permission
      }
      if(menu.link_type==2){
        return 'common'
      }
    if(menu?.page_link?.name){
      return menu?.page_link?.name
    }
},
},
  mounted() {
    this.$store.dispatch('getAllMenus');
},
};
</script>

<style>
.list_size {
  color: #000000;
}
.v-list.left-sidebar.v-sheet.theme--light .v-list-item__title {
  font-size: 14px;
}
.left-sidebar .theme--light.v-icon{
color: #f6f5f5dd;
}
.left-sidebar .v-list-item{
min-height: 50px !important;
}
.left-sidebar .v-list-group__items{
padding-left: 15px !important;
}
.left-sidebar .v-list-group__items .v-list-item {
padding-left: 0px !important;
}
.left-sidebar .v-list-item .v-list-item__icon{
margin-bottom: 16px !important;
}
</style>
