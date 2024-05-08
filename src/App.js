import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Main from "./components/main";
import Value from "./components/value";
import ValuesContext from "./contexts/valuesContext";
import DataContext from "./contexts/dataContext";
import { Link, Route, Routes } from "react-router-dom";

const colors = ["red", "blue", "orange", "green"];
if (!localStorage.getItem("data")) {
  let obj = {};

  localStorage.setItem("data", JSON.stringify(obj));
}
function App() {
  const [value, setValue] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const id = setInterval(() => {
      const result = {};
      if (localStorage.getItem("data")) {
        const data = JSON.parse(localStorage.getItem("data"));
        for (const key in data) {
          for (let i = 0; i < colors.length; i++) {
            const color = colors[i];
            const object = data[key][color];
            if (object) {
              for (const key in object) {
                if (Object.hasOwnProperty.call(object, key)) {
                  const element = object[key];
                  if (result[color]) {
                    result[color] += key * element;
                  } else {
                    result[color] = key * element;
                  }
                }
              }
            }
          }
        }
        setValue(result);
        setData(data);
      }
    }, 500);
    return () => {
      clearInterval(id);
    };
  }, []);

  const clickHandler = function () {
    const a = window.confirm("Are you sure for deleting datas?");
    if (a === true) {
      localStorage.setItem("username", JSON.stringify({}));
      localStorage.setItem("userimg", JSON.stringify({}));
      localStorage.setItem("data", JSON.stringify({}));
    } else {
      alert("thanks");
    }
  };
  // const openInNewTab = (url) => {

  // };
  // const openInNewTab = useCallback((url) => {
  //   window.open(url, "_blank", "noreferrer");
  // }, []);
  return (
    <DataContext.Provider value={data}>
      <ValuesContext.Provider value={value}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="head">
                <div className="mainhead">
                  <Main value="10" index="Topic 1"></Main>
                  <Main value="20" index="Topic 2"></Main>
                  <Main value="30" index="Topic 3"></Main>
                </div>
                <Link to="/user" target="_blank">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/business-flat-16/64/e-commerce-10-256.png"
                    className="Open"
                  ></img>
                </Link>

                <button className="button" onClick={clickHandler}>
                  Clear
                </button>

                <Value></Value>
              </div>
            }
          />
          <Route
            path="/user"
            element={
              <div className="userValue">
                <Value></Value>
              </div>
            }
          />
        </Routes>
      </ValuesContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
