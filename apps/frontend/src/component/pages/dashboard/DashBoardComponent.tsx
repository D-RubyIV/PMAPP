import BenefitsComponent from "../../body/BenefitsComponen";
import PolicyComponent from "../footer/PolicyComponent";
import RegisterNotification from "../footer/RegisterNotification";
import ProductComponent from "./ProductComponent";
const DashBoardComponent = () => {

    return (
        <div>
            <BenefitsComponent />
            <ProductComponent />
            {/* <BlogComponent/> */}
            <RegisterNotification />
            {/* <FooterComponent/> */}
            <PolicyComponent />
        </div>
    );
}

export default DashBoardComponent;