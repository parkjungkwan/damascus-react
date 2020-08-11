import React from "react";
import {Redirect} from "react-router-dom";

/* views */

import Home from './common/Home'
import Login from './common/Login'
import CorporationAdmin from './corporation/Corporation'
import InterviewerAdmin from "./interviewer/Interviewer"
import NoticeDetail from './notice/Detail'
import NoticeList from './notice/List'
import NoticeUpload from './notice/Upload'
import NoticeModify from './notice/Modify'
import NoticeDetailAdmin from './notice/Detail'
import PrAdmin from "./pr/Pr"
import PrAdminDetail from "./pr/Detail"
import AliveAdmin from "./alive/Alive"
import AliveCreate from "./alive/Create"

export const routerConfig = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/HomeAdmin" />
    },
    {
        path: '/HomeAdmin',
        component: Home
    },
    {
        path: '/noticeDetail',
        component: NoticeDetail
    }, 
    {
        path: '/noticeUpload',
        component: NoticeUpload
    },
    {
        path: '/noticeModify',
        component: NoticeModify
    },
    {
        path: '/NoticeDetailAdmin',
        component: NoticeDetailAdmin
    },    
    {
        path: '/NoticeAdmin',
        component: NoticeList
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/corporationAdmin',
        component: CorporationAdmin
    },
    {
        path: '/interviewerAdmin',
        component: InterviewerAdmin
    },
    {
        path: '/prAdmin',
        component: PrAdmin
    },
    {
        path: '/aliveAdmin',
        component: AliveAdmin
    }, 
    {
        path: '/aliveCreate',
        component: AliveCreate
    },
    {
        path: '/prAdminDetail',
        component: PrAdminDetail
    },
]