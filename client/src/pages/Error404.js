import Card from '../components/UI/Card/Card';
import { useRef, useEffect } from "react";
import lottie from "lottie-web";
const Error404=()=>{
    const container = useRef();
    useEffect(() => {
        lottie.loadAnimation({
          container: container.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("../assets/error404.json"),
        });
      }, []);
    return (
        <Card>
            <div ref={container} ></div>
        </Card>
    )
}
export default Error404;