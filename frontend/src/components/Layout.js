import Footer from "./Footer";
import Header from "./Header";
const Layout = ({children}) => {
    return ( 
        <div>
            <Header/>
            <main style={{minHeight:'75vh'}}>
                {children}
                </main>
            <Footer/>
        </div>
    );
}
Layout.defaultProps = {
    title:"Real-Estate",
    description:'MERN STACK',
    keywords:"MongoDB,Express,React,Node",
    author:'Anuj Vaid',
};
 
export default Layout;