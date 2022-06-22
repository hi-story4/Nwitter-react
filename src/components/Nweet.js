import { dbService, storageService } from "firebs";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { deleteObject, ref } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async (event) => {
    const ok = window.confirm("트윗을 삭제하시겠습니까?");
    const desertRef = ref(storageService, nweetObj.fileURL);
    if (ok) {
      console.log("삭제");
      await deleteDoc(doc(dbService, "nweets", nweetObj.id));

      if (nweetObj.fileURL !== "") await deleteObject(desertRef);
    } else {
      event.preventDefault();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onChange = (event) => {
    setNewNweet(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();

    await updateDoc(doc(dbService, "nweets", nweetObj.id), { text: newNweet });

    setEditing(false);
  };
  const onCancel = (event) => {
    event.preventDefault();
    toggleEditing();
    setNewNweet(nweetObj.text);
  };

  return (
    <div>
      <div className="flex w-full max-w-2xl mx-auto border-[1px]  hover:bg-slate-50 h-fit">
        {editing ? (
          <>
            <div>
              <div>
                <form
                  onSubmit={onSubmit}
                  className="flex w-full justify-between px-3 py-1.5"
                >
                  <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    value={newNweet}
                    className="px-2, py-1 border border-slate-600 rounded-md focus:border-slate-600"
                    required
                  />
                  <div className="flex">
                    <input
                      className="mr-3 bg-blue-400 rounded-md px-2.5 py-1 text-white font-medium cursor-pointer"
                      type="submit"
                      value="확인"
                    />
                    <button
                      className="mr-2 bg-red-400 rounded-md px-2.5 py-1 text-white font-medium"
                      onClick={onCancel}
                    >
                      취소
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col  w-full h-fit p-10 pb-5   hover:bg-gray-50">
            <div className="text-lg mb-3">{nweetObj.text}</div>

            {nweetObj.fileURL && (
              <img
                className="inline rounded-xl my-5"
                src={nweetObj.fileURL}
                alt="사진"
                style={{ width: "100%", height: "100%" }}
              />
            )}

            {isOwner && (
              <div className="flex justify-end space-x-2">
                <button
                  className="rounded-2xl hover:bg-sky-50 focus:bg-sky-100"
                  onClick={onDeleteClick}
                >
                  삭제
                </button>
                <button
                  className="rounded-2xl hover:bg-sky-50 focus:bg-sky-100"
                  onClick={toggleEditing}
                >
                  수정
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Nweet;
