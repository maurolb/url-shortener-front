import { collection, addDoc, where, query, getDocs } from "firebase/firestore";
import { firebaseDB } from "./config";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuv0987654321", 6);

export const getByShortId = async (shortId: string) => {
  try {
    const q = query(
      collection(firebaseDB, "url/"),
      where("shortId", "==", shortId)
    );
    return await getDocs(q);
  } catch (error) {
    console.log("Error trying to find with query ", error);
  }
};

export const newDoc = async (destination: string) => {
  const shortId = nanoid();
  await addDoc(collection(firebaseDB, "url/"), {
    destination,
    shortId,
  });
  return {
    destination,
    shortId,
  };
};
