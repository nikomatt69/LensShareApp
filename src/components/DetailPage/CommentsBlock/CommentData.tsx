import { useEffect, useState } from "react";
import { Publication } from "@/types/lens";
import { useAppStore } from "src/store/app";
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import getAvatar from "@/lib/getAvatar";
import LitJsSdk from "@lit-protocol/sdk-browser";
import lit from "@/lib/lit";
import formatHandle from "@/utils/functions/formatHandle";
import CommentOptions from "./CommentOptions";

interface Props {
  comment: Publication;
  video: Publication;

}

const CommentData: FC<Props> = ({ comment, video,}) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [decryptedComment, setDecryptedComment] = useState("");
  const [showReport, setShowReport] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
   useEffect(() => {
    const decrypted = async () => {
      if (comment.metadata.attributes[0]?.traitType === "encrypted") {
        const response = await decrypt();
        console.log("Response decrypted comment:", response);
        setDecryptedComment(
          response
            ? response
            : `Encrypted on LensShare 👀 : ${comment.metadata.content}`
        );
      } else {
        setDecryptedComment(comment.metadata.content);
      }
    };
    decrypted();
  }, []); 

  async function decrypt() {
    const attributes = comment.metadata.attributes[0];
    if (attributes && attributes.traitType === "encrypted") {
      try {
        const ipfsUrl = comment.metadata.attributes[0].value;
        if (ipfsUrl) {
          const body = { url: ipfsUrl };
          const response = await fetch("/api/get-encrypted", {
            method: "",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body),
          });
          const jsonLit = await response.json();
          const blob = LitJsSdk.base64StringToBlob(jsonLit.litComment);
          const message = await lit.decryptString(
            blob,
            jsonLit.litKkey,
            video.profile.ownedBy,
            currentProfile?.ownedBy
          );
          const decrypted = message.decryptedFile;
          console.log("DECRYPTED", decrypted);
          return message.decryptedFile ? decrypted : "Encrypted Comment";
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return comment.metadata.content;
    }
  }

  return (
    <div className="flex pt-2 text-black border-2 border-blue-700 p-3 mt-1 bg-cyan-100 rounded-xl hover:bg-blue-400 gap-2">
      <Link href={`/u/${comment.profile.id}`} key={comment.profile.id}>
        <div className="flex-shrink-0 rounded-full">
          <Image
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
            src={getAvatar(comment.profile)}
            alt={comment.profile.handle}
          />
        </div>
      </Link>
      <div className="flex text-black flex-col w-[90%]">
        <p className="font-bold ">{formatHandle(comment.profile.handle)}</p>
        <p className="text-sm text-black pt-1 pl-1"
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
           
          }}
        >
          {comment.metadata.content}
        </p>
        <button className="r-0 t-0 p-1">
    
    { <CommentOptions video={video} setShowReport={setShowReport} /> }
    </button>
      </div>
    </div>
  );
};

export default CommentData;
