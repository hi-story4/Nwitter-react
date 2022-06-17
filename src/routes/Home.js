import React, { useEffect, useState, useRef } from "react";
import { dbService, storageService } from "firebs";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Nweet from "components/Nweet";
//compornent 를 import할때는 중괄호 x
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  useEffect(() => {
    //Cloud Firestore 실시간 업데이트 수신대기 -컬렉션의 여러 문서 수신 대기
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (querySnapshot) => {
      const nweetArr = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let fileURL = "";
      if (attachment !== "") {
        const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        console.log(response);
        fileURL = await getDownloadURL(response.ref);
      }

      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: serverTimestamp(),
        creatorId: userObj.uid,
        fileURL,
      });

      //console.log(auth);
    } catch (error) {
      console.error("Error writing new message to Firebase Data");
    }
    setNweet("");
    onClearClick();
  };
  const onChange = (event) => {
    setNweet(event.target.value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const fileInput = useRef(null);
  /* null 값을 넣어주지 않고 useRef()로 쓰면 null값 오류가 뜬다. */

  const onClearClick = () => {
    fileInput.current.value = "";
    setAttachment("");
  };

  return (
    <>
      <div>
        <div className="flex w-full mb-20 ">
          <form className="w-full max-w-lg mx-auto " onSubmit={onSubmit}>
            <div className="flex flex-col font-semibold  text-xl">
              <div className="flex w-full text-3xl mb-4 font-normal font-sans">
                무슨 일이 일어나고 있나요?
              </div>
              <div>
                <textarea
                  className="w-full pb-5 mb-3 "
                  type="text"
                  value={nweet}
                  onChange={onChange}
                  placeholder="작성하기"
                  maxLength={120}
                  required
                />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              ref={fileInput}
            />
            <button
              type="submit"
              className="rounded-2xl hover:bg-sky-50 focus:bg-sky-100"
            >
              확인
            </button>
            {attachment && (
              <div>
                <img src={attachment} alt="파일 없음" className=" w-20 h-20" />
                <button onClick={onClearClick}>취소</button>
              </div>
            )}
          </form>
        </div>

        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
