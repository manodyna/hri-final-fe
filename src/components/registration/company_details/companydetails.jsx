import FirstPage from "./mainContent/first_page";
import ContentFirst from "./mainContent";
import Sidebar from "./sidebar/sidebar";

const CompanyDetails = () => {
    return (
        <div className="flex containerClass">
            <Sidebar />
            <div className="flex-grow">
                <FirstPage />
                <ContentFirst />
            </div>
        </div>

    )
}

export default CompanyDetails;