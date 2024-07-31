import { useEffect, useRef, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import instance from "../../../axios/Instance";
import OverviewProductCard from "../../card/OverviewProductCard";

const CollectionComponent = () => {
    const collectionRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [productOverviews, setProductOverviews] = useState<OverviewProductV3[]>([])
    const [collections, setCollections] = useState<Collection[]>([])
    const [collectionsSelected, setCollectionsSelected] = useState<Collection>()

    useEffect(() => {
        const fetchData = async () => {

            await instance.get("api/manage/collections?limit=1000&offset=0").then(function (response) {
                if (response.status == 200) {
                    setCollections(response?.data?.content)
                    setCollectionsSelected(response?.data?.content[0])
                }

            }).catch(function () {
            })
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchOverview = async () => {
            await instance.get(`api/manage/products/collection/overview?code=${collectionsSelected?.code}&limit=6&offset=0`).then(function (response) {
                if (response.status == 200) {
                    setProductOverviews(response.data.content)
                }
            }).catch(function () {
            })
        }
        fetchOverview()
    }, [collectionsSelected])


    const handleClick = (item: Collection, index: number) => {
        setCollectionsSelected(item);
        collectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        console.log(item)
    };

    return (
        <Fragment>
            <div>
                <div>
                    <ul className="flex text-sm flex-row gap-3 overflow-hidden overflow-x-scroll md:justify-center md:text-xl md:gap-10">
                        {collections.map((item, index) => (
                            <li
                                onClick={() => handleClick(item, index)}
                                key={index}
                                ref={(el) => (collectionRefs.current[index] = el)}
                                className={`underline-transition whitespace-nowrap transition-colors duration-300 ease-in-out uppercase py-1.5 font-semibold tracking-tighter ${item.id === collectionsSelected?.id
                                    ? 'underline-transition-active text-gray-800 dark:text-gray-200'
                                    : 'text-gray-400'
                                    }`}
                            >
                                <span>{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {
                    Array.isArray(productOverviews) && productOverviews.map((item, index) => (
                        <Fragment key={index}>
                            <OverviewProductCard item={item} />
                        </Fragment>
                    ))
                }
            </div>
        </Fragment>
    );
}

export default CollectionComponent;