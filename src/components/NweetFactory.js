import { dbService, storageService } from "firebs";
import React, { useState, useRef } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

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
    <div className="flex w-full mb-20 ">
      <form className="w-full max-w-lg mx-auto " onSubmit={onSubmit}>
        <div className="flex flex-col font-semibold  text-xl">
          <div className="flex w-full text-3xl mb-4 font-normal font-sans">
            무슨 일이 일어나고 있나요?
          </div>
          <div className="flex flex-wrap relative w-full justify-between itmes-center ">
            <input
              className=" flex-grow-1 h-10 w-5/6 max-h-fit p-3 mb-3 rounded-3xl"
              style={{ border: "1px solid #04aaff" }}
              type="text"
              value={nweet}
              onChange={onChange}
              placeholder="작성하기"
              maxLength={120}
              required
            />

            <button
              type="submit"
              className="p-1 mb-1 rounded-2xl hover:bg-sky-50
              focus:bg-sky-100"
            >
              확인
            </button>
          </div>
        </div>
        <div className="flex justify-center p-3 mb-2 rounded-3xl border-[1px] border-sky-200 hover:bg-sky-100 hover:border-sky-400">
          <label htmlFor="attach-file" className="">
            <span className="pr-1">Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
          </label>
          <input
            id="attach-file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInput}
            className="hidden"
          />
        </div>

        <div className="flex justify-center "></div>

        {attachment && (
          <div>
            <img src={attachment} alt="파일 없음" className=" w-20 h-20" />
            <button onClick={onClearClick}>
              취소
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default NweetFactory;
