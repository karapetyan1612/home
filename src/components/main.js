import { useCallback, useContext, useEffect, useState } from "react";
import DataContext from "../contexts/dataContext";

function CreatInpit(props) {
  const data = useContext(DataContext);
  const [red, setRed] = useState();
  const [blue, setBlue] = useState();
  const [orange, setOrange] = useState();
  const [green, setGreen] = useState();
  const changeHandler = useCallback((color) => {
    return (event) => {
      let userArray = JSON.parse(localStorage.getItem("data"));
      if (!userArray[props.t]) userArray[props.t] = {};
      if (!userArray[props.t][color]) userArray[props.t][color] = {};
      userArray[props.t][color][props.add] = event.target.value;
      localStorage.setItem("data", JSON.stringify(userArray));
    };
  }, []);
  useEffect(() => {
    if (!data) return;
    if (
      data[props.t] &&
      data[props.t]["red"] &&
      data[props.t]["red"][props.add]
    ) {
      setRed(data[props.t]["red"][props.add]);
    }
    if (
      data[props.t] &&
      data[props.t]["blue"] &&
      data[props.t]["blue"][props.add]
    ) {
      setBlue(data[props.t]["blue"][props.add]);
    }
    if (
      data[props.t] &&
      data[props.t]["orange"] &&
      data[props.t]["orange"][props.add]
    ) {
      setOrange(data[props.t]["orange"][props.add]);
    }
    if (
      data[props.t] &&
      data[props.t]["green"] &&
      data[props.t]["green"][props.add]
    ) {
      setGreen(data[props.t]["green"][props.add]);
    }
  }, [data]);
  return (
    <div className="div1">
      <div className="input1">{props.add}</div>
      <input
        className="input2"
        type="number"
        value={red}
        onChange={changeHandler("red")}
      ></input>
      <input
        className="input3"
        type="number"
        value={blue}
        onChange={changeHandler("blue")}
      ></input>
      <input
        className="input4"
        type="number"
        value={orange}
        onChange={changeHandler("orange")}
      ></input>
      <input
        className="input5"
        type="number"
        value={green}
        onChange={changeHandler("green")}
      ></input>
    </div>
  );
}

function Main(props) {
  const a = Number(props.value);

  return (
    <div className="maindiv">
      <span className="span1">{props.index}</span>
      <div className="main">
        <CreatInpit add={a} t="t1"></CreatInpit>
        <CreatInpit add={2 * a} t="t2"></CreatInpit>
        <CreatInpit add={3 * a} t="t3"></CreatInpit>
        <CreatInpit add={4 * a} t="t4"></CreatInpit>
        <CreatInpit add={5 * a} t="t5"></CreatInpit>
      </div>
    </div>
  );
}

export default Main;
