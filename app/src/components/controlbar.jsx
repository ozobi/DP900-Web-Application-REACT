import React, { useState, useEffect, Fragment } from "react";
import {
  Button,
  Progress,
  Icon,
  Grid,
  Responsive,
  Container
} from "semantic-ui-react";
import StatusPanel from "./statusPanel";
import axios from "axios";

function ProgressPanel(props) {
  // const [valProgress, setValProgress] = useState(0);
  // const [totalProgress, setTotalProgress] = useState(1);
  let data = props.data;
  let activeTestType = props.activeTestType;
  let valProgress = 0;
  let totalProgress = 1;

  // useEffect(() => {
  //   // setValProgress(data.MeasStatus[0].RunStatus.RVC_Status.Stage);
  //   // setTotalProgress(data.MeasStatus[0].RunStatus.RVC_Status.TotalStages);
  // }, [data]);

  switch (activeTestType) {
    case "RVC":
      valProgress = data.MeasStatus[0].RunStatus.RVC_Status.Stage;
      totalProgress = data.MeasStatus[0].RunStatus.RVC_Status.TotalStages;
      break;
    case "MMC":
      valProgress = data.MeasStatus[0].RunStatus.MMC_Status.Stage;
      totalProgress = data.MeasStatus[0].RunStatus.MMC_Status.TotalStages;
      break;
    case "SVC":
      valProgress = data.MeasStatus[0].RunStatus.SVC_Status.Stage;
      totalProgress = data.MeasStatus[0].RunStatus.SVC_Status.TotalStages;
      break;
    case "RSD":
      valProgress = data.MeasStatus[0].RunStatus.RSD_Status.Stage;
      totalProgress = data.MeasStatus[0].RunStatus.RSD_Status.TotalStages;
      break;
    case "CSC":
      valProgress = data.MeasStatus[0].RunStatus.CSC_Status.Stage;
      totalProgress = data.MeasStatus[0].RunStatus.CSC_Status.TotalStages;
      break;
    case "SRS":
      valProgress = data.MeasStatus[0].RunStatus.SRS_Status.Stage;
      totalProgress = data.MeasStatus[0].RunStatus.SRS_Status.TotalStages;
      break;
    default:
      break;
  }

  return (
    <Progress
      size="small"
      value={valProgress}
      total={totalProgress}
      progress="ratio"
    />
  );
}

function GetTestType(typeTest) {
  var testCtrlr = ["CSC", "MMC", "RSD", "RVC", "SVC", "SRS"];
  var testAnlyzr = [
    "APS",
    "COR",
    "DEM",
    "HIS",
    "MIO",
    "ORD",
    "REC",
    "SYN",
    "TRF"
  ];

  if (testCtrlr.includes(typeTest)) {
    return 1;
  } else if (testAnlyzr.includes(typeTest)) {
    return 0;
  } else {
    console.log("Error! Unknown test type!");
    return 0;
  }
}

function TestDataPanels(props) {
  let data = props.data.dataTest;
  let testState = props.data.testState;
  let isCollapsed = props.isCollapsed;
  let isHorizontal = props.isHorizontal;

  const [activeTestType, setActiveTestType] = useState(null);

  // Display StatusPanel either with or without data!!!
  switch (testState) {
    case 0: // 0: None
      return <></>;

    case 1: // 1: Open
    case 2: // 2: Initalized
    case 3: // 3: Pretest
      return (
        <StatusPanel
          data={data}
          isCollapsed={isCollapsed}
          isHorizontal={isHorizontal}
          setActiveTestType={setActiveTestType}
        />
      );

    case 4: // 4: Running
    case 5: // 5: Stopped
      return (
        <>
          <StatusPanel
            data={data}
            isCollapsed={isCollapsed}
            isHorizontal={isHorizontal}
            setActiveTestType={setActiveTestType}
          />
          {GetTestType(activeTestType) ? (
            <ProgressPanel data={data} activeTestType={activeTestType} />
          ) : (
            ""
          )}
        </>
      );

    case 9: // 9: No Connection
      return <></>;

    default:
      console.log("Error: testState=" + testState);
      return <></>;
  }
}

function ButtonPanel(props) {
  let testState = props.data.testState;
  let isCollapsed = props.isCollapsed;
  let isVertical = props.isVertical;

  const [isDisInit, setDisInit] = useState(true);
  const [isDisStart, setDisStart] = useState(true);
  const [isDisStop, setDisStop] = useState(true);
  const [isHidStop, setHidStop] = useState(false);
  const [isDisResume, setDisResume] = useState(true);
  const [isHidResume, setHidResume] = useState(true);
  const [isDisEnd, setDisEnd] = useState(true);
  const [isDisOpen, setDisOpen] = useState(true);
  const [isDisClose, setDisClose] = useState(true);

  function btnStateManager(state) {
    // 0: None
    // 1: Initalized
    // 2: Running
    // 3: Stopped
    // 4: End, Test Open
    // 9: No Connection
    switch (state) {
      case 0: // None
        setDisInit(true);
        setDisStart(true);
        setDisStop(true);
        setHidStop(false);
        setDisResume(true);
        setHidResume(true);
        setDisEnd(true);
        setDisOpen(true);
        setDisClose(true);
        break;
      case 1: // Initalized
        setDisInit(true);
        setDisStart(false);
        setDisStop(true);
        setHidStop(false);
        setDisResume(true);
        setHidResume(true);
        setDisEnd(false);
        setDisOpen(true);
        setDisClose(true);
        break;
      case 2: // Running
        setDisInit(true);
        setDisStart(true);
        setDisStop(false);
        setHidStop(false);
        setDisResume(true);
        setHidResume(true);
        setDisEnd(true);
        setDisOpen(true);
        setDisClose(true);
        break;
      case 3: // Stopped
        setDisInit(true);
        setDisStart(true);
        setDisStop(true);
        setHidStop(true);
        setDisResume(false);
        if (true) {
          setHidResume(false);
        } else {
          setHidResume(false);
        }
        setDisEnd(false);
        setDisOpen(true);
        setDisClose(true);
        break;
      case 4: // End
        setDisInit(false);
        setDisStart(true);
        setDisStop(true);
        setHidStop(false);
        setDisResume(true);
        setHidResume(true);
        setDisEnd(true);
        setDisOpen(false);
        setDisClose(false);
        break;
      case 9: // 9: No Connection
        setDisInit(true);
        setDisStart(true);
        setDisStop(true);
        setHidStop(false);
        setDisResume(true);
        setHidResume(true);
        setDisEnd(true);
        setDisOpen(true);
        setDisClose(true);
        break;
    }
  }

  function setButtonState(testState) {
    switch (testState) {
      case 0: // 0: None
        btnStateManager(0);
        break;
      case 1: // 1: Open
        btnStateManager(4);
        break;
      case 2: // 2: Initalized
        btnStateManager(1);
        break;
      case 3: // 3: Pretest
      case 4: // 4: Running
        btnStateManager(2);
        break;
      case 5: // 5: Stopped
        btnStateManager(3);
        break;
      case 9: // 9: No Connection
        btnStateManager(9);
        break;
    }
  }

  useEffect(() => {
    setButtonState(testState);
  }, [testState]);

  const handleButtonClick = btn => {
    const dataAPI = { valIP: "localhost", valPort: "8732" };
    switch (btn) {
      case "init":
        axios({
          method: "post",
          url: "/api/initTest",
          data: dataAPI
        })
          .then(function(response) {
            // handle success
            console.log(response);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
        break;
      case "start":
        axios({
          method: "post",
          url: "/api/startTest",
          data: dataAPI
        })
          .then(function(response) {
            // handle success
            console.log(response);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
        break;
      case "stop":
        axios({
          method: "post",
          url: "/api/stopTest",
          data: dataAPI
        })
          .then(function(response) {
            // handle success
            console.log(response);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
        break;
      case "resume":
        axios({
          method: "post",
          url: "/api/resumeTest",
          data: dataAPI
        })
          .then(function(response) {
            // handle success
            console.log(response);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
        break;
      case "end":
        axios({
          method: "post",
          url: "/api/endTest",
          data: dataAPI
        })
          .then(function(response) {
            // handle success
            console.log(response);
          })
          .catch(function(error) {
            // handle error
            console.log(error);
          });
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      {!isCollapsed ? (
        <Button.Group
          id={"ControlBarButtonPanel"}
          size={isVertical ? "small" : "tiny"}
          vertical={isVertical}
          widths={!isVertical && 4}
        >
          <Button
            color="grey"
            animated="fade"
            disabled={isDisInit}
            onClick={() => handleButtonClick("init")}
          >
            <Button.Content visible={!isCollapsed} hidden={isCollapsed}>
              INIT
            </Button.Content>
            <Button.Content visible={isCollapsed} hidden={!isCollapsed}>
              <Icon name="cog" />
            </Button.Content>
          </Button>
          <Button
            color="green"
            animated="fade"
            disabled={isDisStart}
            onClick={() => handleButtonClick("start")}
          >
            <Button.Content visible={!isCollapsed} hidden={isCollapsed}>
              START
            </Button.Content>
            <Button.Content visible={isCollapsed} hidden={!isCollapsed}>
              <Icon name="play" />
            </Button.Content>
          </Button>
          {!isHidStop && (
            <Button
              color="yellow"
              animated="fade"
              disabled={isDisStop}
              onClick={() => handleButtonClick("stop")}
            >
              <Button.Content visible={!isCollapsed} hidden={isCollapsed}>
                STOP
              </Button.Content>
              <Button.Content visible={isCollapsed} hidden={!isCollapsed}>
                <Icon name="stop" />
              </Button.Content>
            </Button>
          )}
          {!isHidResume && (
            <Button
              color="yellow"
              animated="fade"
              disabled={isDisResume}
              onClick={() => handleButtonClick("resume")}
            >
              <Button.Content visible={!isCollapsed} hidden={isCollapsed}>
                RES
              </Button.Content>
              <Button.Content visible={isCollapsed} hidden={!isCollapsed}>
                <Icon name="play circle" />
              </Button.Content>
            </Button>
          )}
          <Button
            color="red"
            animated="fade"
            disabled={isDisEnd}
            onClick={() => handleButtonClick("end")}
          >
            <Button.Content visible={!isCollapsed} hidden={isCollapsed}>
              END
            </Button.Content>
            <Button.Content visible={isCollapsed} hidden={!isCollapsed}>
              <Icon name="checkered flag" />
            </Button.Content>
          </Button>
        </Button.Group>
      ) : (
        <>
          <Button.Group
            size="tiny"
            fluid
            icon
            widths={2}
            style={{ marginBottom: "1rem" }}
          >
            <Button
              icon="cog"
              color="grey"
              disabled={isDisInit}
              onClick={() => handleButtonClick("init")}
            />
            <Button
              icon="play"
              color="green"
              disabled={isDisStart}
              onClick={() => handleButtonClick("start")}
            />
          </Button.Group>
          <Button.Group size="tiny" fluid icon widths={2}>
            {!isHidStop && (
              <Button
                icon="stop"
                color="yellow"
                disabled={isDisStop}
                onClick={() => handleButtonClick("stop")}
              />
            )}
            {!isHidResume && (
              <Button
                icon="play circle"
                color="yellow"
                disabled={isDisResume}
                onClick={() => handleButtonClick("resume")}
              />
            )}
            <Button
              icon="checkered flag"
              color="red"
              disabled={isDisEnd}
              onClick={() => handleButtonClick("end")}
            />
          </Button.Group>
        </>
      )}
    </Container>
  );
}

function ControlBar(props) {
  const [dataTest, setDataTest] = useState(props.data);
  let isCollapsed = props.dataCollapsed.isCollapsed;
  let setCollapsed = props.dataCollapsed.setCollapsed;
  let isHorizontal = props.isHorizontal;

  // ??are states necessary???
  const [testState, setTestState] = useState(0); // Array of measurement last stop codes
  const [measState, setMeasState] = useState([0]); // Array of measurement states
  const [lastStopCode, setLastStopCode] = useState([0]); // Array of measurement last stop codes

  function checkState(dataTest, setTestState, setMeasState, setLastStopCode) {
    // REST Data:
    // -1: No test / test open
    // 0: Initalized
    // 1: Pretest
    // 2: Running
    // 3: Stopped

    // Test State:
    // 0: None
    // 1: Open
    // 2: Initalized
    // 3: Pretest
    // 4: Running
    // 5: Stopped
    // 1: End
    // 9: No Connection

    let measState = [0];
    let lastStopCode = [0];
    // TEST & MEASUREMENT STATE
    if (dataTest && dataTest.MeasStatus && dataTest.MeasStatus.length !== 0) {
      for (var i = 0; i < dataTest.MeasStatus.length; i++) {
        switch (dataTest.MeasStatus[i].State) {
          case -1: // Test opened
            measState[i] = 1;
            lastStopCode[i] = null;
            break;
          case 0: // Initalized
            measState[i] = 2;
            lastStopCode[i] = null;
            break;
          case 1: // Pretest
            measState[i] = 3;
            lastStopCode[i] = dataTest.MeasStatus[i].RunStatus.LastStopCode;
            break;
          case 2: // Running
            measState[i] = 4;
            lastStopCode[i] = dataTest.MeasStatus[i].RunStatus.LastStopCode;
            break;
          case 3: // Stopped
            measState[i] = 5;
            lastStopCode[i] = dataTest.MeasStatus[i].RunStatus.LastStopCode;
            break;
          case 9: // No Connection
            measState[i] = 9;
            lastStopCode[i] = null;
            break;
          default:
            console.log("Error: MeasStatus[" + i + "]");
            break;
        }
      }
    }
    setMeasState(measState);
    setLastStopCode(lastStopCode);
    setTestState(measState.sort()[0]);
  }

  useEffect(() => {
    setDataTest(props.data);
    checkState(dataTest, setTestState, setMeasState, setLastStopCode);
  }, [props.data]);

  // console.log("ControlBar - testState: " + testState);
  return (
    <Container>
      {isHorizontal ? (
        <Grid id={"ControlBar"} className="collapsed" verticalAlign="middle">
          <Grid.Column width={11}>
            <TestDataPanels
              data={{ dataTest, testState, measState }}
              isCollapsed={true}
              isHorizontal={true}
            />
          </Grid.Column>
          <Grid.Column width={5}>
            <ButtonPanel
              data={{ dataTest, testState, measState }}
              isCollapsed={false}
              isVertical={true}
            />
          </Grid.Column>
        </Grid>
      ) : (
        // <div id={"ControlBar"} className={isCollapsed ? "collapsed" : ""}></div>
        <Grid id={"ControlBar"} className={isCollapsed ? "collapsed" : ""}>
          <Grid.Column>
            <Grid.Row>
              <Button
                icon="bars"
                onClick={() => {
                  setCollapsed(!isCollapsed);
                }}
              />
            </Grid.Row>
            <Grid.Row>
              <TestDataPanels
                data={{ dataTest, testState, measState }}
                isCollapsed={isCollapsed}
                isHorizontal={false}
                isVertical={false}
              />
            </Grid.Row>
            <Grid.Row>
              <ButtonPanel
                data={{ dataTest, testState, measState }}
                isCollapsed={isCollapsed}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      )}
    </Container>
  );
}

export default ControlBar;
