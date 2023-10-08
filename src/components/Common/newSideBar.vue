<template>
    <v-navigation-drawer   width="280"
    elevation="0"
    v-model="Drawer"
    :clipped="clipped"
    fixed
    app
    class="mr-9 ml-3 my-3 nav-height rounded-lg nav-left-custom">
    <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
  
        <v-list-group
          :value="true"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>
  
          <v-list-group
            :value="true"
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="([title, icon], i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="title"></v-list-item-title>
   
            </v-list-item>
            <!-- sub sub  -->
            <v-list-group
            no-action
            sub-group
            prepend-icon="mdi-account-circle"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Sub Sub Admin</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item 
              link
            >
            <v-list-item-icon>
                <v-icon >mdi mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title >hello 1</v-list-item-title>
            </v-list-item>
          </v-list-group>
            <!-- sub sub end -->
          </v-list-group>
  
          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon], i) in cruds"
              :key="i"
              link
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </template>
  <script>
  export default {
    data() {
      return {
        Drawer: true,
            clipped: false,
            admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
        sidebarMenu: [
    {
        title:'sidebar.Dashboard' ,
        icon: 'LayoutDashboardIcon',
        to: '/dashboard',
        permission: 'common',
    }, 
    {
      title:'sidebar.sysconfigure.systemconfigure',
      icon: 'AdjustmentsFilledIcon',
      permission: 'SystemConfiguration',
      subMenu: [
            {
              title: 'sidebar.sysconfigure.demographic.demographic_info',
          permission: 'demographic-information-Management',
          subSubMenu: [
            {
              title: 'sidebar.sysconfigure.demographic.division',
              to: '/demographic/division',
              permission: 'division-list',
            },
            {
              title: 'sidebar.sysconfigure.demographic.district',
              to: '/demographic/district',
              permission: 'district-list',
            },
            {
              title: 'sidebar.sysconfigure.demographic.city',
              to: '/demographic/city',
              permission: 'city-list',
            },
            {
              title: 'sidebar.sysconfigure.demographic.thana',
              to: '/demographic/thana-upzila',
              permission: 'thana-list',
            },
            {
              title: 'sidebar.sysconfigure.demographic.union',
              to: '/demographic/union',
              permission: 'union-list',
            },
            {
              title: 'sidebar.sysconfigure.demographic.ward',
              to: '/demographic/ward',
              permission: 'ward-list',
            },
              ]
            },
            {
              title: 'sidebar.sysconfigure.allowance.allowance_program',
              permission: 'allowance-list',
              to: '/allowance/management',
            },
            {
              title: 'sidebar.sysconfigure.office.office_management',
              permission: 'office-list',
              to: '/office/management',
            },
            {
              title: 'sidebar.sysconfigure.financial.financial_year',
              permission: 'financial-list',
              to: '/financial/information',
        },
        {
              title: 'sidebar.sysconfigure.user_management.user_management',
          permission: 'user-management',
          subSubMenu: [
            {
              title: 'sidebar.sysconfigure.user_management.roles',
          to: '/roles',
        permission: 'role-list',
            },
            {
              title: 'sidebar.sysconfigure.user_management.roles_permission',
              to: '/role/permission',
              permission: 'role-permission-create',
            },
            {
              title: 'sidebar.sysconfigure.user_management.user_create',
              to: '/user/create',
              permission: 'user-create',
            },
            {
              title: 'sidebar.sysconfigure.user_management.user_blocked',
              to: '/user/blocked',
              permission: 'user-block',
            },
        
          
              ]
        },
        {
          title: 'sidebar.sysconfigure.device_registration.device_registration',
          permission: 'device-list',
          to: '/device/registration',
            },
        {
          title: 'sidebar.sysconfigure.lookup.lookup',
          permission: 'lookup-list',
          to: '/lookup/management',
            },
        {
          title: 'sidebar.sysconfigure.log',
          permission: 'activity-log-list',
          to: '/activity-log',
            },

           
          ],
    },
    {
      title: 'sidebar.application_selection.application_selection',
      permission: 'online-application-management',
        icon: 'AdjustmentsFilledIcon',
      subMenu: [
            {
              title: 'sidebar.application_selection.online_application',
              permission: 'application-entry-list',
              to: '/online/application',
            },
            {
              title: 'sidebar.application_selection.Primary_selection_union',
              permission: 'primary-selection-union-list',
              to: '/primary/selection/union',
            },
            {
              title: 'sidebar.application_selection.primary_selection_upazilla',
              permission: 'primary-selection-upazila-list',
              to: '/primary/selection/unazila',
            },
            {
              title: 'sidebar.application_selection.final_list',
              permission: 'final-list-list',
              to: '/final/list',
            },
            {
              title: 'sidebar.application_selection.approval_list',
              permission: 'approval-list-list',
              to: '/approval/list',
            }, 
          ],
    },
    {
        title: 'sidebar.beneficiary_management.beneficiary_management',
      icon: 'AdjustmentsFilledIcon',
      permission: 'BeneficiaryManagement',
      subMenu: [
            {
              title: 'sidebar.beneficiary_management.beneficiary_information',
              permission: 'beneficiary-info-list',
              to: '/beneficiary/information',
            },
            {
              title: 'sidebar.beneficiary_management.active_beneficiary_information',
              permission: 'beneficiary-info-active-list',
              to: '/beneficiary/information/active',
            },
            {
              title: 'sidebar.beneficiary_management.not_active_beneficiary_information',
              permission: 'beneficiary-info-not-active-list',
              to: '/beneficiary/information/not-active',
            },
            {
              title: 'sidebar.beneficiary_management.waiting_beneficiary_information',
              permission: 'beneficiary-info-waiting-active-list',
              to: '/beneficiary/information/waiting',
            },
            {
              title: 'sidebar.beneficiary_management.committee.committee_entry',
              permission: 'committee-list',
              to: '/committee/list',
            },
            {
              title: 'sidebar.beneficiary_management.allocation_information',
              permission: 'allocation-list',
              to: '/allocation/information',
            },
            {
              title: 'sidebar.beneficiary_management.beneficiary_replacement',
              permission: 'beneficiary-replacement-list',
              to: '/beneficiary/replacement',
            },
           
          ],
        
    },
   
    {
        title: 'sidebar.payroll_management.payroll_management',
        permission: 'PayrollManagement',
        icon: 'AdjustmentsFilledIcon',
      subMenu: [
            {
              title: 'sidebar.payroll_management.payroll_create',
              permission: 'payroll-generation-crreate',
              to: '/payroll/create',
            },
            {
              title: 'sidebar.payroll_management.payroll_list',
              permission: 'payroll-generation-list',
              to: '/payroll/list',
            },
            {
              title: 'sidebar.payroll_management.payroll_approval',
              permission: 'payroll-generation-view',
              to: '/payroll/approval',
            },
            {
              title: 'sidebar.payroll_management.payroll_processor',
              permission: 'payment-process-list',
              to: '/payroll/processor',
            },
            {
              title: 'sidebar.payroll_management.committee_entry',
              permission: 'committee-list',
              to: '/committee/entry',
            },
            {
              title: 'sidebar.payroll_management.allocation_information',
              permission: 'allocation-list',
              to: '/allocation/information',
            },
          ],
    },
 
]
      };
    },
    methods: {
     
    },
  };
  </script>
    