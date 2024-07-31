import BenefitsComponent from "../../body/BenefitsComponen";
import PolicyComponent from "../footer/PolicyComponent";
import ServiceComponent from "../service/ServiceComponent";
const DashBoardComponent = () => {

    return (
        <div>
            <BenefitsComponent />
            <ServiceComponent />
            {/* <RegisterNotification /> */}
            {/* <FooterComponent/> */}
            <PolicyComponent />
        </div>
    );
}

export default DashBoardComponent;