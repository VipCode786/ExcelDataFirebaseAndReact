import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc , getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAln1_mnJRuI1F7o6A0Ls6a_doFK7QW0-s",
    authDomain: "excel-6d7c2.firebaseapp.com",
    projectId: "excel-6d7c2",
    storageBucket: "excel-6d7c2.appspot.com",
    messagingSenderId: "505560627966",
    appId: "1:505560627966:web:9f9db606488c49cab783af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const uploadDataToFirebase = async (data: any[],onProgress: (progress: number) => void) => {
  try {
    // const excelCollection = collection(db, 'excelData');
    // await Promise.all(
    //   data.map(async (item) => {
    //     await addDoc(excelCollection, item);
    //   })
    // );
    const excelCollection = collection(db, 'excelData');

    // Calculate total items for progress calculation
    const totalItems = data.length;

    await Promise.all(
      data.map(async (item, index) => {
        await addDoc(excelCollection, item);
        const progress = ((index + 1) / totalItems) * 100; // Calculate progress percentage
        onProgress(progress); // Update progress
      })
    );

  
    console.log('Data uploaded successfully!');
    return true;
  } catch (error) {
    console.error('Error uploading data: ', error);
    return false;
  }
};

export const fetchDataFromFirebase = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'excelData'));
      const fetchedData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return fetchedData;
    } catch (error) {
      console.error('Error fetching data from Firebase: ', error);
      throw error;
    }
  };