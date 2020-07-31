import React from "react";
import {Contact, Footer, Guide, Modal, Navigator, Tour, TourMap} from "../commons";
import MyChatbot from "../chatbot/MyChatbot";
const Home = () => {
    return <>
        <MyChatbot/>
        <Navigator/>
        <TourMap/>
        <Guide/>
        <Tour/>
        <Modal/>
        <Contact/>
        <Footer/>
    </>
}
export default Home