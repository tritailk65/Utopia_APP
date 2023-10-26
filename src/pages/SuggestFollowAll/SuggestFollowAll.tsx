import SuggestFollowItem from '../../components/Modal/SuggestFollowModal/SuggestFollowItem';
import oggy from '../../assets/image/oggy.png';

function SuggestFollowAll() {
    return (
        <div className="abc text-2xl  w-[650px] mt-16 pl-5">
            <div>
                <h3 className="font-medium pb-10 ">Suggested</h3>
            </div>
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
            <SuggestFollowItem fullName="Oggy et les Cafards" userName="Oggy" avatar={oggy} />
        </div>
    );
}

export default SuggestFollowAll;
