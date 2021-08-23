import Profile from '../../components/profile';
import { NextPageContext } from 'next';

const ProfilePage = ({ profileId }: { profileId: { uid: string } }) => {
    return (
        <>
            <Profile profileId={profileId.uid} />
        </>
    );
};

export default ProfilePage;

export async function getServerSideProps(context: NextPageContext) {
    const profileId = context.query;

    return {
        props: {
            profileId: profileId,
        },
    };
}
