import {
    Button,
    Input,
    Radio,
    Form,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Dialog,
    Pagination,
    Table, 
    TableColumn,
    Message,
    Upload,
    FormItem,
    Tag,
    Select,
    Checkbox,
    Option,
    Skeleton,
    SkeletonItem
  } from 'element-ui'
  
  const coms = [
    Button, 
    Input, 
    Radio, 
    Form,
    FormItem,
    Dropdown,
    Dialog,
    Pagination,
    Message,
    Table, 
    TableColumn,
    DropdownItem,
    DropdownMenu,
    Upload,
    Tag,
    Select,
    Checkbox,
    Option,
    Skeleton,
    SkeletonItem
  ]
  
  export default {
    install(Vue){
      coms.map(c => {
        Vue.component(c.name, c)
      })
    }
  }
  