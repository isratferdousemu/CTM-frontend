<template>
    <div id="sidebar-header">
        <div class="logo"></div>
        <div class="name">Ruth Rechte</div>
        <div class="group">Admin</div>
    </div>
</template>

<script>
    export default {
        name: "SidebarHeader"
    }
</script>

<style scoped>
    #sidebar-header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 250px;
        background: radial-gradient(#F03C39, #920025);
        color: #fefefe;

    }

  
    .name {
        font-size: 1.4rem;
    }
</style>