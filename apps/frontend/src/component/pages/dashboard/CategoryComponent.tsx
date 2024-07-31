import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import instance from "../../../axios/Instance";
import { useTranslation } from "react-i18next";

const CategoryComponent = () => {
    const { t } = useTranslation()
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const fetchData = async () => {
            await instance.get("api/manage/categories?limit=5&offset=0").then(function (response) {
                if (response.status == 200) {
                    setCategories(response?.data?.content)
                }

            }).catch(function () {
            })
        }
        fetchData();
    }, [])
    return (
        <Fragment>
            <div className="mt-3">
                <div>
                    <p className="text-xl font-bold tracking-tight">{t('our_product')}</p>
                </div>
                <ul className="flex flex-row gap-1.5 overflow-y-auto mt-1.5">
                    {
                        Array.isArray(categories) && categories.map((item, index) => (
                            <li key={index} className={`border-2 whitespace-nowrap py-1.5 px-3 text-[12px] rounded-2xl border-spacing-2 border-gray-300 shadow-sm text-gray-400`}>
                                {item.name}
                            </li>))
                    }
                </ul>
            </div>
        </Fragment>
    );
}

export default CategoryComponent;