import React, { Suspense } from "react";
import { BrowserRouter as Router , Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

const Home = React.lazy(() => import('./home/Home'))


const App = () => {
	return <>
	<Suspense fallback={<div className={"loading"}/>}>
		<Router>
			<Switch>
				<Redirect exact from={"/"} to={"/app"} />
				<Route path={"/app"} render={(props)=><Home {...props}/>}/>
			</Switch>
		</Router>
	</Suspense>
	</>
}


export default App;
