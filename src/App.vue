<template>
  <v-app>
      <router-view />
  </v-app>
</template>

<script></script>

<style>
.component-title{
  background-color: #1C3B68;
  color: white;
}
.left-sidebar .v-list-item__action,
.left-sidebar .v-list-item__icon {
  margin-right: 15px !important;
}
.left-sidebar .v-list-group__items {
  padding-left: 15px !important;
}
.theme--light.v-application {
  background: #f5f5f5 !important;
}
.nav-left-custom .v-list-item--link:before,
.menu-top .v-list-item--link:before {
  border-right: 6px solid #145aa5;
  color: #ffff;
  background: linear-gradient(270deg, #145aa5 0%, #145aa5 100%);
}
.nav-left-custom .v-list-item--link:before,
.nav-left-custom .v-list-item__action,
.menu-top .v-list-item--link:before,
.menu-top .v-list-item__action {
  color: #145aa5;
}
/*.v-application a {*/
/*    color: #145aa5 !important;*/
/*}*/
.nav-height {
  max-height: calc(100% - 24px) !important;
  margin-right: 10px;
  /*  width: 270px !important; */
  /* height: calc(100% - 32px) !important; */
}
.child-nav-height {
  max-height: 100% !important;
  /*  left: 300px;
  top: 85px !important;
  */
}

.user-img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
}
header.menu-top {
  box-shadow: none !important;
  background: #ffffff !important;
}
#notification {
  max-width: 350px !important;
  width: 100% !important;
}
.link-hover:hover {
  color: #ffffff !important;
  background-position: left;
}
.link-hover {
  background: linear-gradient(to left, #ffffff 50%, #145aa5 50%) right;
  background-size: 205%;
  transition: 0.5s ease-out;
  color: #6200ea !important;
  border-top: 2px solid #e0e0e0 !important;
}
</style>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
.bounce-enter-active {
  transform-origin: top;
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  transform-origin: top;
  animation: bounce-out 0.5s;
}
.badge-notification {
  z-index: 99999999;
  position: absolute;
  transform: translate(5px, -5px);
}

.badge-employee {
  z-index: 99999999;
  position: absolute;
  transform: translate(10px, 0px);
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(0);
  }
}
.world_sidebar_logo {
  height: auto !important;
  width: 100%;
  text-align: left;
}
.v-list-item__title.title img {
  width: 180px !important;
  text-align: left;
}
</style>
