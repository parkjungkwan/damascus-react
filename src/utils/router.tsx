import React from "react";
import {Redirect} from 'react-router-dom'
import {Cat, Clock, MyChatBot} from '../_components'
import AdvancedCounter from "../_components/fp/AdvancedCounter";

const routerConfig = [
    { path: '/', exact: true, component: () => <Redirect to="/home"/> },
    { path: '/chat', component: MyChatBot },
    { path: '/cat', component: Cat },
    { path: '/clock', component: Clock },
    { path: '/counter', component: AdvancedCounter },
]
export default routerConfig