import './Home.css';
import avatar from '../../assets/image/avatar.png';
import avt2 from '../../assets/image/avt2.png';
import HomePost from '../../components/Post/HomePost/HomePost';
import { useState, useEffect } from 'react';
import { PostForViewer } from '../../types/post-type';
import { Response } from '../../types/api-type';
import { getListPostForViewer } from '../../services/post-service';

function Home() {
    const [data, setData] = useState<Response<PostForViewer[]>>();

    useEffect(() => {
        const callApi = async () => {
            const res: Response<PostForViewer[]> = await getListPostForViewer();
            setData(res);
        };

        callApi();
    }, []);

    console.log(data);

    return (
        <div className="abc text-2xl  w-[630px] mt-8">
            <div className="w-[468px] mx-auto">
                <HomePost
                    avatar={avatar}
                    username={'cr7.ronaldo.official'}
                    since="2d"
                    img={avatar}
                    likes="23.346"
                    title="Siuuu !!!"
                    comments="5604"
                />
                <HomePost
                    avatar={avt2}
                    username={'sooyaaa__'}
                    since="1d"
                    img={avt2}
                    likes="17.092"
                    title="Beautiful day"
                    comments="1208"
                />
            </div>
        </div>
    );
}

export default Home;
