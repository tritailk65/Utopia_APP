import ModalContainer from '../ModalContainer/ModalContainer';
import avt from '../../../assets/image/avt2.png';
import { useState, useEffect } from 'react';
interface PostCommentModalProps {
    idPost: number;
    show: boolean;
    onClose: () => void;
}

function PostCommentModal(props: PostCommentModalProps) {
    const { idPost, show, onClose } = props;
    const [screenHeight, setScreenHeight] = useState(window.screen.height);

    useEffect(() => {
        // Định nghĩa hàm cập nhật chiều cao màn hình khi cửa sổ thay đổi kích thước
        const updateScreenHeight = () => {
            setScreenHeight(window.screen.height * 0.8);
        };

        // Thêm sự kiện lắng nghe thay đổi kích thước cửa sổ
        window.addEventListener('resize', updateScreenHeight);

        // Loại bỏ sự kiện lắng nghe khi component unmount
        return () => {
            window.removeEventListener('resize', updateScreenHeight);
        };
    }, []);

    console.log(screenHeight);

    return (
        <ModalContainer show={show} onClose={onClose} width="extra-larges">
            <div className={`min-h-[${screenHeight}px] flex flex-col w-full my-[-8px]`}>
                <div className="h-[90vh] flex ">
                    <div className=" h-full flex flex-col items-center justify-center border-r-2 border-gray-200 ">
                        <img src={avt} alt="selected img" className=" h-full" />
                    </div>
                    <div className="w-[540px] h-full  pt-4 bg-gray-400"></div>
                </div>
            </div>
        </ModalContainer>
    );
}

export default PostCommentModal;
