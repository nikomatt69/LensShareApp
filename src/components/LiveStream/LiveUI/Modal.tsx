import React from "react";
import { Button, Input } from "./index";

export default function Modal({
  onInputChange,
  onSubmit,
  onClose,
}: {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 md:w-9/12  w-10/12 lg:w-1/3">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none">
            <div className="relative p-6 flex-auto ">
              <h2 className="text-white font-sans text-xl mb-4 font-medium">
                Watch a stream
              </h2>
              <Input
                label="Stream ID"
                placeholder="Enter Stream ID"
                onChange={onInputChange}
              />
            </div>
            <div className="flex items-center justify-end p-6 -mt-10">
              <Button
                className={`bg-zinc-700 text-white px-5 py-3  border border-zinc-700  mr-6`}
                text="text-md"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className={`bg-primary text-background px-5 py-3 border border-primary hover:border-primary hover:text-primary hover:bg-background`}
                text="text-md"
                onClick={onSubmit}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
