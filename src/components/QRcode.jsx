import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import "../styles/App.css"; //additional css for bounce the input feild when no text
// import "../styles/bootstrap.css";
//

function QRcode() {
  let [newQRcode, setnewQRcode] = useState({ name: "", email: "", date: "" });
  //let [validMail, setValidMail] = useState(false);
  let imgRef = useRef(0);
  let textRef = useRef(0);
  let emailRef = useRef(0);
  let dateRef = useRef(0);
  let visibleRef = useRef(0);
  //
  // function imageQR() {}
  function handlerQR() {
    //for email pattern
    let emailPatern = /[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
    //
    if (newQRcode.name === "") {
      textRef.current.classList.add("bounce");
      setTimeout(() => {
        textRef.current.classList.remove("bounce");
      }, 1000);
    }
    // for validation of email

    if (!newQRcode.email.match(emailPatern)) {
      // alert("enter correct mail");
      emailRef.current.classList.add("bounce");
      //setValidMail(false);
      setTimeout(() => {
        emailRef.current.classList.remove("bounce");
        //setValidMail(true);
      }, 1000);
    }

    //for validation of date
    if (newQRcode.date === "") {
      dateRef.current.classList.add("bounce");
      setTimeout(() => {
        dateRef.current.classList.remove("bounce");
      }, 1000);
    } else {
      visibleRef.current.classList.add("visible");
      // textRef.current.valueOf = "";
    }
    // for image src
    let { name, email, date } = newQRcode;

    imgRef.current.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
    \nname:${name} \n
      \nemail:${email}\n 
      \ndate:${date}\n`;
  }

  function handlerDownloadImg() {
    (async () => {
      let { name, email, date } = newQRcode;
      if (!name || !email || !date) return alert("enter your data");
      try {
        let responce = await fetch(
          `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
            name:${name} email:${email} date:${date}`
        );
        //
        let file = await responce.blob();
        //
        const link = document.createElement("a");
        link.href = URL.createObjectURL(file);
        console.log("link", link.href);
        link.download = "download-image-jpg";
        // link.download = new Date().getTime();
        link.click();
      } catch (error) {
        alert("file not download something gone wrong");
        console.error("alsdladsa", error);
      }
    })();
  }

  return (
    <>
      <div className="m-auto lg:w-2/4 md:w-2/4  sm:w-2/4  h-[500px]">
        <h1 className="text-4xl font-bold text-center m-auto mt-4 bg-red-400 py-4 rounded-xl">
          QR Code Generator
        </h1>
        <div className="rounded my-10 py-2 border-black lg:w-25 sm:w-full ">
          <div className="row">
            <div className="w-100 d-flex flex-column m-auto ">
              {/* name  input */}
              <input
                placeholder="Name"
                className="my-2 p-2 w-full rounded m-auto border border-black"
                type="text"
                ref={textRef}
                value={newQRcode.name}
                onChange={(e) =>
                  setnewQRcode({ ...newQRcode, name: e.target.value })
                }
              />
              {/* Email  input */}
              <input
                placeholder="E-mail"
                className="my-2 p-2 w-full rounded m-auto border border-black"
                type="text"
                ref={emailRef}
                value={newQRcode.email}
                onChange={(e) =>
                  setnewQRcode({ ...newQRcode, email: e.target.value })
                }
              />
              {/* {validMail ? (
                ""
              ) : (
                <span className="text-red-600">Enter valid mail</span>
              )} */}
              {/* Date  input */}
              <input
                className="my-2 p-2 w-full rounded m-auto border border-black"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                ref={dateRef}
                value={newQRcode.date}
                onChange={(e) =>
                  setnewQRcode({ ...newQRcode, date: e.target.value })
                }
              />
              {/* image */}
              <div
                ref={visibleRef}
                className="my-2 p-2 flex  justify-center hiddens"
              >
                <img ref={imgRef} src={""} alt="QR code" />
              </div>
              {/* button for generate QR - code */}
              <button
                className="my-2 m-auto p-2 w-full bg-blue-900 font-bold text-white rounded-lg"
                onClick={handlerQR}
              >
                Generate QR code
              </button>
              {/* Here is download Button */}
              <br />
              <button
                className="my-2 m-auto p-2 w-full bg-slate-600 font-bold text-black rounded-lg"
                onClick={handlerDownloadImg}
              >
                Download
              </button>
            </div>
          </div>
        </div>

        {/* <p
          className="text-3xl text-center m-auto py-2 rounded cursor-pointer active:text-blue-600 text-black font-bold bg-green-700 lg:w-1/4 sm:w=full"
          onClick={handlerScan}
        >
          Click Here to Scan Code
        </p> */}
      </div>
    </>
  );
}

export default QRcode;
