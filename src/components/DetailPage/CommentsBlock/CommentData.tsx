import { useEffect, useState } from "react";
import { Publication } from "@/utils/lens";
import { useAppStore } from "src/store/app";
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import getAvatar from "@/lib/getAvatar";
import LitJsSdk from "@lit-protocol/sdk-browser";
import lit from "@/lib/lit";
import formatHandle from "@/utils/functions/formatHandle";

interface Props {
  comment: Publication;
  publication: Publication;
}

const CommentData: FC<Props> = ({ comment, publication }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [decryptedComment, setDecryptedComment] = useState("");
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
            publication.profile.ownedBy,
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
    <div className="flex border-2 p-3 bg-cyan-100 rounded-xl hover:bg-blue-400 gap-2">
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
      <div className="flex-grow w-[90%]">
        <p className="font-bold ">{formatHandle(comment.profile.handle)}</p>
        <p className="text-sm text-black pt-1 pl-2"
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
           
          }}
        >
          {comment.metadata.content}
        </p>
      </div>
    </div>
  );
};

export default CommentData;
