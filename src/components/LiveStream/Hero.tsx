import Image from "next/image";
import React, { useState } from "react";
import { Button, Modal } from "./LiveUI";
import { Card } from "../UI/Card";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [onInputChange, setOnInputChange] = useState("");
  return (
    <Card>
    
      <section className="relative py-12 sm:py-16 lg:py-20 lg:pb-36">

              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-4xl font-sans font-medium leading-tight text-white sm:text-5xl sm:leading-tight lg:leading-tight lg:text-6xl font-sams">
                  Control who can watch your live streams
                </h1>
                <p className="mt-2 text-lg text-gray-400 sm:mt-8 font-sans">
                  A demo application that demonstrates how to use the Livepeer
                  to create token gating live streams
                </p>
              </div>
  
              <div className="mt-8 text-center lg:text-left flex flex-col md:flex-row ">
                <Button
                  to="/create"
                  text="text-xl"
                  className="bg-primary border-primary text-background px-10 py-4 hover:border-primary hover:text-primary hover:bg-background"
                >
                  Set up stream
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  text="text-xl"
                  className="border-primary px-10 py-4 text-primary md:ml-8 hover:bg-primary hover:text-background mt-3 md:mt-0"
                >
                  Watch stream
                </Button>
              </div>
            
      </section>
      <div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onInputChange={(e) => setOnInputChange(e.target.value)}
          onSubmit={() => {
            window.location.href = `/watch/${onInputChange}`;
          }}
        />
      )}
      </div>
      </Card>
  );
        }
