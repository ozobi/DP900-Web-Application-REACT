import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Container,
  Grid,
  Responsive,
  GridColumn
} from "semantic-ui-react";
import NavBar from "./components/navbar";
import ControlBar from "./components/controlbar";
import Main from "./components/main";
import axios from "axios";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function getStatus(valIP, valPort, setDataState, setDataTest) {
  function getTestState(valIP, valPort) {
    return axios({
      method: "post",
      url: "/api/stateLastCmd",
      data: { valIP: valIP, valPort: valPort }
    });
  }

  function getTestData(valIP, valPort) {
    return axios({
      method: "post",
      url: "/api/statusTest",
      data: { valIP: valIP, valPort: valPort }
    });
  }

  axios.all([getTestState(valIP, valPort), getTestData(valIP, valPort)]).then(
    axios.spread((dataState, dataTest) => {
      setDataState(dataState.data);
      setDataTest(dataTest.data);
    })
  );
}

function getDefaultState(key) {
  switch (key) {
    case "valIP":
      return "localhost";
    case "valPort":
      return "8732";
    case "valRefRate":
      return "1";
    case "valTestName":
      return "";
    default:
      return "";
  }
}

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || getDefaultState(localStorageKey)
  );
  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};

function App() {
  // Test
  const [activeTab, setActiveTab] = useState("test");
  const [isCollapsed, setCollapsed] = useState(false);

  const [dataTest, setDataTest] = useState(null); // JSON test data
  const [dataState, setDataState] = useState(""); // Command state text

  // Settings Variables
  const [valIP, setIP] = useStateWithLocalStorage("valIP");
  const [valPort, setPort] = useStateWithLocalStorage("valPort");
  const [valRefRate, setRefRate] = useStateWithLocalStorage("valRefRate");

  useInterval(() => {
    getStatus(valIP, valPort, setDataState, setDataTest);
    // console.log("App - dataTest: " + dataTest);
    // console.log("App - dataState: " + dataState);
  }, Number(valRefRate) * 1000);

  function GetControlBarColParams(ColType, ViewType, isCollapsed) {
    const COL_CONTROLBAR = {
      mobile: 6,
      tablet: 5,
      computer: 4,
      largeScreen: 3
    };

    const COL_CONTROLBAR_CLPSED = {
      mobile: 6,
      tablet: 3,
      computer: 3,
      largeScreen: 2
    };

    const COL_MAIN = {
      mobile: 10,
      tablet: 11,
      computer: 12,
      largeScreen: 13
    };

    const COL_MAIN_CLPSED = {
      mobile: 10,
      tablet: 13,
      computer: 13,
      largeScreen: 14
    };

    switch (ColType) {
      case "controlbar":
        return isCollapsed
          ? COL_CONTROLBAR_CLPSED[ViewType]
          : COL_CONTROLBAR[ViewType];

      case "main":
        return isCollapsed ? COL_MAIN_CLPSED[ViewType] : COL_MAIN[ViewType];

      default:
        return 16;
    }
  }

  let breakpointWidth = 426;

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <NavBar setActiveTab={setActiveTab} />
        </Grid.Row>
        <Responsive as={Grid.Row} maxWidth={breakpointWidth}>
          <Grid.Column>
            <ControlBar
              data={dataTest}
              dataCollapsed={{ isCollapsed, setCollapsed }}
              isHorizontal={true}
            />
          </Grid.Column>
        </Responsive>
        <Responsive as={Grid.Row} maxWidth={breakpointWidth}>
          <Grid.Column>
            <Main
              id={"Main"}
              data={dataTest}
              activeTab={activeTab}
              connectionSettings={{
                valIP,
                valPort,
                valRefRate,
                setIP,
                setPort,
                setRefRate
              }}
              isCollapsed={isCollapsed}
            />
          </Grid.Column>
        </Responsive>
        <Responsive
          as={Grid.Column}
          minWidth={breakpointWidth + 1}
          mobile={GetControlBarColParams("controlbar", "mobile", isCollapsed)}
          tablet={GetControlBarColParams("controlbar", "tablet", isCollapsed)}
          computer={GetControlBarColParams(
            "controlbar",
            "computer",
            isCollapsed
          )}
          largeScreen={GetControlBarColParams(
            "controlbar",
            "largeScreen",
            isCollapsed
          )}
        >
          <ControlBar
            data={dataTest}
            dataCollapsed={{ isCollapsed, setCollapsed }}
            isHorizontal={false}
          />
        </Responsive>
        <Responsive
          as={Grid.Column}
          minWidth={breakpointWidth + 1}
          mobile={GetControlBarColParams("main", "mobile", isCollapsed)}
          tablet={GetControlBarColParams("main", "tablet", isCollapsed)}
          computer={GetControlBarColParams("main", "computer", isCollapsed)}
          largeScreen={GetControlBarColParams(
            "main",
            "largeScreen",
            isCollapsed
          )}
        >
          <Main
            id={"Main"}
            data={dataTest}
            activeTab={activeTab}
            connectionSettings={{
              valIP,
              valPort,
              valRefRate,
              setIP,
              setPort,
              setRefRate
            }}
            isCollapsed={isCollapsed}
          />
        </Responsive>
      </Grid>
    </Container>
  );
}

export default App;
