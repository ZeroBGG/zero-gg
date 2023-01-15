import { dbService } from 'src/firebase';
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';

const fetchData = async (id: string) => {
  const lckTeam = query(collection(dbService, 'lck_teamSquad'));
  onSnapshot(lckTeam, (querySnapshot) => {
    const info = querySnapshot.docs.map((docs) => ({
      id: docs.id,
      ...docs.data(),
    }));

    return info;
  });
};

export default fetchData;
