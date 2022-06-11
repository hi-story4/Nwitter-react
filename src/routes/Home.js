import React, { useEffect, useState } from "react";
import { dbService, auth } from "firebs";
import {
  addDoc,
  collection,
  query,
  serverTimestamp,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    //const q = query(collection(dbService, "nweets"), orderBy("createdAt"));
    //조건 유무 차이.where
    const querySnapshot = await getDocs(collection(dbService, "nweets"));
    console.log(querySnapshot);

    querySnapshot.forEach((doc) => {
      //console.log(doc);
      const nweetObj = {
        ...doc.data(),
        id: doc.id,
      };
      console.log(nweetObj);
      setNweets((prev) => [nweetObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(dbService, "nweets"), {
        name: auth.currentUser.email,
        text: nweet,
        createdAt: serverTimestamp(),
      });
      //console.log(auth);
    } catch (error) {
      console.error("Error writing new message to Firebase Data");
    }
    setNweet("");
  };
  const onChange = (event) => {
    setNweet(event.target.value);
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={nweet}
            onChange={onChange}
            placeholder="무슨 일이 일어나고 있나요? "
            maxLength={120}
          />
          <input type="submit" value="submit" />
        </form>
        <div>
          {nweets.map((nweet) => (
            <div key={nweet.id}>
              <h4>{nweet.text}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
