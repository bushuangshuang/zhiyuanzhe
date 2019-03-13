<template>
    <Layout style="height:100%" class="main">
        <Header class="header-con">
            <div class="navbar-header" style="color:#ffffff">
                <button type="button" class="navbar-toggle collapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="index.html" class="navbar-brand logo-link">
                    <img src="../../../assets/img/logo-admin.png" class="img-responsive">
                </a>
                <span style="font-size:24px;padding-left:19px;padding-right:19px;">|</span>
                <span style="font-size:24px;line-height:80px;">湘雅三院</span>
            </div>
            <div class="navbar-collapse collapse">
                <div style="float:right;padding-right:20px;color:#ffffff;">
                    <Dropdown @on-click="handleClick">
                        <Badge>
                            <Avatar :src="userAvator"
                                    style="width:48px;height:48px;margin:16px 0px;border-radius: 24px;"/>
                        </Badge>
                        <div style="display:inline;margin-left:14px;font-size:20px">{{userName}}</div>
                        <Icon :size="18" type="md-arrow-dropdown"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem name="toLogout">退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </Header>
        <Layout>
            <Sider :width="200" >
                <Menu :theme="'light'" :width="'200px'" @on-select="change" style="border:none;">
                    <div v-for="(item, index) in menuList" :key="index" >
                        <MenuItem :name="item.name" :to="'/admin.html/'+item.path" v-if="!item.children" >
                            <Icon type="ios-paper" />
                            {{item.name}}
                        </MenuItem>
                        <Submenu :name="item.name"  v-if="item.children && item.children.length != 0" >
                            <template slot="title">
                                <Icon type="ios-paper"/>
                                {{item.name}}
                            </template>
                            <MenuItem :on-select="change" v-if="item.children" :name="v.name" v-for="(v, i) in item.children" :key="v.name" :to="'/admin.html/'+item.path+'/'+v.path">{{v.name}}</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </Sider>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <!--<div class="tag-nav-wrapper">
                        <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
                    </div>-->
                    <Content class="content-wrapper">
                        <!--<keep-alive >
                            <router-view v-if="$route.meta.keepAlive"/>
                        </keep-alive>-->
                        <div style="padding:20px;">
                            <div style="background-color:#ffffff;padding:30px;">
                                <router-view/>
                            </div>
                        </div>
                        <!--<div style="border:1px red solid;">
                            <router-view/>
                            <router-view v-if="!$route.meta.keepAlive">
                                &lt;!&ndash; 这里是不被缓存的视图组件，比如 page3 &ndash;&gt;
                            </router-view>
                        </div>-->

                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
    <!--<div class="home" style="background-color:#F5F6F6;min-height:100%;position:fixed;width:100%;top:0;bottom:0;overflow-y:hidden;overflow-x:hidden;">
        <div class="container-fluid" style="height:80px;background-color:#35BACB;padding-left:30px;">
            <div class="navbar-header" style="color:#ffffff">
                <button type="button" class="navbar-toggle collapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a href="index.html" class="navbar-brand logo-link">
                    <img src="../../../assets/img/logo-admin.png" class="img-responsive">
                </a>
                <span style="font-size:24px;padding-left:19px;padding-right:19px;">|</span>
                <span style="font-size:24px;line-height:80px;">湘雅三院</span>
            </div>
            <div class="navbar-collapse collapse">
                <div style="float:right;padding-right:20px;color:#ffffff;">
                    <Dropdown @on-click="handleClick">
                        <Badge>
                            <Avatar :src="userAvator"
                                    style="width:48px;height:48px;margin:16px 0px;border-radius: 24px;"/>
                        </Badge>
                        <div style="display:inline;margin-left:14px;font-size:20px">{{userName}}</div>
                        <Icon :size="18" type="md-arrow-dropdown"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem name="toLogout">退出登录</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
        <div class="menu-left">
            <div style="padding-top:20px">
                <Menu :theme="'light'" :width="'200px'" @on-select="change">
                    <div v-for="(item, index) in menuList" :key="index" >
                        <MenuItem :name="item.name" :to="'/admin.html/'+item.path" v-if="!item.children" >
                            <Icon type="ios-paper" />
                           {{item.name}}
                        </MenuItem>
                        <Submenu :name="item.name"  v-if="item.children && item.children.length != 0" >
                            <template slot="title">
                                <Icon type="ios-paper"/>
                                {{item.name}}
                            </template>
                            <MenuItem :on-select="change" v-if="item.children" :name="v.name" v-for="(v, i) in item.children" :key="v.name" :to="'/admin.html/'+item.path+'/'+v.path">{{v.name}}</MenuItem>
                        </Submenu>
                    </div>
                </Menu>
            </div>
        </div>
        <div style="margin-left:200px;min-height:100%;overflow-y:scroll;top:0;bottom:0;overflow-x:hidden;">
            <div style="padding:20px;">
                <div style="background-color:#ffffff;padding:30px;">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>-->
</template>

<script>
    import '../../../assets/bootstrap/css/bootstrap.min.css'
    import {logout} from '../../../api/user.js'
    import {storage} from '../../../libs/common'
    import { serverSrc } from '../../../api/global.js'

    export default {
        props: {
            userAvator: {
                type: String,
                default: ''
            },
            messageUnreadCount: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                userName: '',
                menuTxt: this.menuTitle,
                menuList: []
            }
        },
        created() {
            this.userName = storage.getItem('userName');
            this.menuList = storage.getItem('menuList')[0].children;
            //console.log('menuList=='+JSON.stringify(this.menuList))
        },
        mounted() {
        },
        methods: {
            change(name) {
                console.log('name', name);
            },
            handleClick(name) {
                switch (name) {
                    case 'toLogout':
                        this.toLogout()
                        break
                }
            },
            toLogout() {
                logout().then(res => {
                    if (res.data.code === '200') {
                        this.$router.push('/index');
                        storage.setItem('userName','');
                        storage.setItem('route', '');
                        storage.setItem('roles','');
                        //window.location.href = serverSrc+"/index"+'#/'
                    } else {
                        alert(res.data.msg)
                    }
                })
            },
            toPages(PPath,CPath){
//                alert(1)
                console.log(PPath+'/'+CPath);
                this.$router.push(PPath+'/'+CPath);
            }
            /*message () {
                this.$router.push({
                    name: 'message_page'
                })
            },*/
        },
    }
</script>
<style>
    .menu-left {
        position: absolute;
        top: 80px;
        left: 0px;
        width: 200px;
       /* border-right: 1px solid #DEDEDE;*/
        min-height: 100%;
        position: fixed;
        background-color: #ffffff;
        bottom:0;
        overflow-y:scroll;
        overflow-x:hidden;
    }

    .logo-link {
        padding: 27px 6px !important;
    }
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
        color:#35BACB!important;
    }
    .ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover{
        color:#35BACB!important;
    }

    .ivu-layout-sider{
        background:#ffffff!important;
    }
    .ivu-layout-header{
        height:80px!important;
        background:#35BACB!important;
    }
</style>
