<template>
    <div id="dropdown">
        <!-- <ul v-show="list.open" class="sub-items">
            <li class="sub-item"
                v-for="(item, index) in list.subnav"
                :key="'item'+index">
                <i v-if="item.subnav" class="far"
                   :class="{'fa-plus-square':!item.open,
                    'fa-minus-square':item.open}"></i>
                <div class="title" @click="item.open = !item.open">
                    {{ item.title }}
                </div>
                <Dropdown class="subnav" v-if="item.subnav" :list="item" />
            </li>
        </ul> -->
         <v-list-item-group v-if="list.open">
        <v-list-item v-for="(item, index) in list.subnav" :key="'item' + index">
          <v-icon
            v-if="item.subnav"
            class="far"
            :class="{ 'fa-plus-square': !item.open, 'fa-minus-square': item.open }"
            @click="item.open = !item.open"
          ></v-icon>
          <v-list-item-content class="title" @click="item.open = !item.open">
            {{ item.title }}
          </v-list-item-content>
          <Dropdown v-if="item.subnav" :list="item" />
        </v-list-item>
      </v-list-item-group>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: [
            'list'
        ]
    }
</script>

<style >

</style>