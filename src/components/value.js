import { useContext, useEffect, useState } from "react";
import ValuesContext from "../contexts/valuesContext";

if (!localStorage.getItem("username") && !localStorage.getItem("userimg")) {
  let username = {};
  let userimg = {};

  localStorage.setItem("username", JSON.stringify(username));
  localStorage.setItem("userimg", JSON.stringify(userimg));
}

function Value() {
  const { red, green, orange, blue } = useContext(ValuesContext) ?? {};

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [username1, setusername1] = useState("");
  const [username2, setusername2] = useState("");
  const [username3, setusername3] = useState("");
  const [username4, setusername4] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userimg"));
    const username = JSON.parse(localStorage.getItem("username"));
    if (data.imgred) {
      console.log(username.namered);
      setImage1(data.imgred);
    }
    if (data.imgblue) {
      setImage2(data.imgblue);
    }
    if (data.imgorange) {
      setImage3(data.imgorange);
    }
    if (data.imggreen) {
      setImage4(data.imggreen);
    }
    if (username.namered) {
      setusername1(username.namered);
    }
    if (username.nameblue) {
      setusername2(username.nameblue);
    }
    if (username.nameorange) {
      setusername3(username.nameorange);
    }
    if (username.namegreen) {
      setusername4(username.namegreen);
    }
  }, []);

  const onImageChange = async (event) => {
    const data = JSON.parse(localStorage.getItem("userimg"));

    if (event.target.files && event.target.files[0]) {
      const convertBlobToBase64 = function (blob) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        });
      };

      const base64String = await convertBlobToBase64(event.target.files[0]);

      if (event.target.getAttribute("status") === "1") {
        data.imgred = base64String;
        setImage1(URL.createObjectURL(event.target.files[0]));
      } else if (event.target.getAttribute("status") === "2") {
        data.imgblue = base64String;
        setImage2(URL.createObjectURL(event.target.files[0]));
      } else if (event.target.getAttribute("status") === "3") {
        data.imgorange = base64String;
        setImage3(URL.createObjectURL(event.target.files[0]));
      } else if (event.target.getAttribute("status") === "4") {
        data.imggreen = base64String;
        setImage4(URL.createObjectURL(event.target.files[0]));
      }

      localStorage.setItem("userimg", JSON.stringify(data));
    }
  };
  const onNameChange = function (event) {
    const value = event.target.value;
    const status = event.target.getAttribute("status");
    const username = JSON.parse(localStorage.getItem("username"));
    if (status === "1") {
      username.namered = value;
      setusername1(username.namered);
      console.log(username1);
    } else if (status === "2") {
      username.nameblue = value;
      setusername2(username.nameblue);
    } else if (status === "3") {
      username.nameorange = value;
      setusername3(username.nameorange);
    } else if (status === "4") {
      username.namegreen = value;
      setusername4(username.namegreen);
    }
    localStorage.setItem("username", JSON.stringify(username));
  };

  return (
    <>
      <div className="value">
        <div className="imgplayer">
          <div className="img1">
            {image1 ? null : (
              <input type="file" onChange={onImageChange} status="1"></input>
            )}

            {image1 ? <img src={image1} alt=""></img> : null}
          </div>
          <div className="img2">
            {image2 ? null : (
              <input type="file" onChange={onImageChange} status="2"></input>
            )}
            {image2 ? <img src={image2} alt=""></img> : null}
          </div>
          <div className="img3">
            {image3 ? null : (
              <input type="file" onChange={onImageChange} status="3"></input>
            )}
            {image3 ? <img src={image3} alt=""></img> : null}
          </div>
          <div className="img4">
            {image4 ? null : (
              <input type="file" onChange={onImageChange} status="4"></input>
            )}
            {image4 ? <img src={image4} alt=""></img> : null}
          </div>
        </div>
        <div className="nameplayer">
          <input
            type="text"
            className="name1"
            status="1"
            onChange={onNameChange}
            defaultValue={username1}
          ></input>
          <input
            type="text"
            className="name2"
            status="2"
            onChange={onNameChange}
            defaultValue={username2}
          ></input>
          <input
            type="text"
            className="name3"
            status="3"
            onChange={onNameChange}
            defaultValue={username3}
          ></input>
          <input
            type="text"
            className="name4"
            status="4"
            onChange={onNameChange}
            defaultValue={username4}
          ></input>
        </div>
        <div className="valueplayer">
          <div className="value1">{red}</div>
          <div className="value2">{blue}</div>
          <div className="value3">{orange}</div>
          <div className="value4">{green}</div>
        </div>
      </div>
    </>
  );
}

export default Value;
