import { Toaster} from 'react-hot-toast';


const Toast = () => {
    return (
        <div>
            <Toaster
                gutter={24}
                toastOptions={{
                    className: '',
                    style: {
                        border: '1px solid #713200',
                        padding: '3px',
                        color: '#713200',
                        fontSize: '12px',
                        alignContent: "text-center",
                    },
                }}
                containerStyle={{
                    top: 20,
                    left: 20,
                    bottom: 20,
                    right: 20,
                }}
                
            >
            </Toaster>
        </div>
    );
};
export default Toast