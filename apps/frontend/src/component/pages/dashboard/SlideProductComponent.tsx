import { Fragment } from "react/jsx-runtime";
import CommonCardComponent from "../../card/CommonCardComponent";
import { Link } from "react-router-dom";





const SlideProductComponent = ({ products, backgroundImage }: { products: CustomModelSpace.CustomProduct[], backgroundImage: string }) => {
    return (
        <Fragment>
            <div
                className="flex overflow-auto gap-5 bg-cover bg-center bg-no-repeat px-2 py-6 rounded-md"
                style={{ backgroundImage: `url('${backgroundImage}')` }}
            >
                {Array.isArray(products) && products.map((product, index) => (
                    <Fragment key={index}>
                        <Link to={`/product/${product.id}`}>
                            <CommonCardComponent product={product}></CommonCardComponent>
                        </Link>
                    </Fragment>
                ))}
            </div>
        </Fragment>
    );
}

export default SlideProductComponent;