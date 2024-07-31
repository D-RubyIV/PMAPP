import { Fragment } from "react/jsx-runtime";

const RegisterNotification = () => {
    return (
        <Fragment>
            <div className="text-center col-span-3 md:col-span-6 widget-footer widget-footer-newsletter mt-3">
                <h2 className="text-lg font-semibold">Đăng ký nhận tin</h2>
                <div className="block-collapse">
                    {/*  */}
                    <div className="text-sm">
                        <form>
                            <input className="border-2 px-2 py-1 rounded-l-md text-[12.5px] focus:outline-none focus:border-gray-300" placeholder="Nhập email tại đây" />
                            <button className="bg-black text-white font-thin text-[13px] py-1 px-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-300">
                                <span>Xác nhận</span>
                            </button>
                        </form>

                    </div>
                    {/*  */}
                    <div className="mt-4 flex justify-center">
                        <a href="http://online.gov.vn/Home/WebDetails/47936" target="_blank" rel="noreferrer">
                            <img className="lazyload w-32" data-src="//theme.hstatic.net/200000690725/1001078549/14/footer_logobct_img.png?v=418" src="//theme.hstatic.net/200000690725/1001078549/14/footer_logobct_img.png?v=418" alt="Bộ Công Thương" />
                        </a>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default RegisterNotification;