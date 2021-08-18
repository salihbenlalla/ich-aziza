import Profile from '../components/profile';
import { db } from '../firebase/firebaseAdmin';
import { NextPageContext } from 'next';

const ProfilePage = ({ userInfo }: { userInfo: any }) => {
    if (userInfo.error) {
        console.log(userInfo.error);
    } else {
        console.log(userInfo);
    }
    return (
        <>
            <Profile username={userInfo.username} />
        </>
    );
};

export default ProfilePage;

export async function getStaticProps(context: NextPageContext) {
    let userInfo = null;
    try {
        const doc = await db.collection('users').doc('khalisah_touma').get();
        userInfo = doc.exists
            ? doc.data()
            : {
                  error: 'this user does not exist in our database',
              };
    } catch (error: any) {
        console.log('Error getting document:', error);
    }
    userInfo = userInfo
        ? {
              ...userInfo,
              birthday: userInfo.birthday.valueOf(),
          }
        : { username: 'hi', birthday: '2021' };
    return {
        props: {
            userInfo,
        },
    };
}
