import Banner from "../components/Home/Banner";
import MetaTags from 'react-meta-tags';
const HomePage = ()=>{

    return (
        <>
        <MetaTags>
        <title>Home | Classroom</title>
        <meta id="meta-description" name="description" content="Join Us !Keep track of all your attendance" />
        </MetaTags>
        <Banner/>
        </>
    )
}
export default HomePage;