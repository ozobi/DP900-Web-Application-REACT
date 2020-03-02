import React, { useState } from "react";
import {
  Divider,
  Icon,
  Menu,
  Segment,
  Table,
  Container,
  Button,
  Responsive,
  Grid
} from "semantic-ui-react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonPlay,
  Dot
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const CustomDotGroup = ({ slides, size }) => (
  <Container textAlign="center" id="CustomDotGroup">
    <Button.Group size={size}>
      <Button
        as={ButtonPlay}
        childrenPlaying={<Icon name="pause"></Icon>}
        childrenPaused={<Icon name="play"></Icon>}
        id="CustomDotGroupPlayButton"
      ></Button>
      {[...Array(slides).keys()].map(slide => (
        <Button as={Dot} key={slide} icon="circle" slide={slide} />
      ))}
    </Button.Group>
  </Container>
);

function getData(testTabs, activeTabIndex, param) {
  let isDataAvailable = testTabs[activeTabIndex].data != null;
  if (isDataAvailable) {
    let data = testTabs[activeTabIndex].data;
    switch (param) {
      // Analyzer
      case "frames":
        return data.Frames;
      case "averages":
        return data.Avg;
      case "time":
        return data.Time.Display;
      case "totalSaves":
        return data.TotalSaves;
      case "waterfallRecords":
        return data.WFRecs;
      case "triggerState":
        return data.WaitForTrig;
      case "recordSize":
        return formatBytes(data.RecSize_Bytes);

      // Controller
      case "level":
        return data.Level_dB.toPrecision(2) + " dB";
      case "reference":
        return data.Ref.toPrecision(2) + " " + data.RefEU;
      case "control":
        return data.Control.toPrecision(4) + " " + data.ControlEU;
      case "drive":
        return data.Drive.toPrecision(4) + " " + data.DriveEU;
      case "frequency":
        return data.Freq_Hz.toPrecision(4) + " Hz";
      case "displacement":
        return data.Disp.toPrecision(4) + " " + data.DispEU;
      case "remainingTime":
        return data.TimeRemaining.Display;
      case "atLevelTime":
        return data.TimeAtLevel.Display;
      case "totalTime":
        return testTabs[activeTabIndex].data.TotalTime.Display;
      case "SweepOrCycleRemaining":
        if (
          data.SweepsElapsed + data.SweepsRemaining >
          data.CyclesElapsed + data.CyclesRemaining
        ) {
          return data.SweepsRemaining + " Sweeps";
        } else {
          return data.CyclesRemaining + " Cycles";
        }
      case "SweepOrCycleElapsed":
        if (
          data.SweepsElapsed + data.SweepsRemaining >
          data.CyclesElapsed + data.CyclesRemaining
        ) {
          return data.SweepsElapsed + " Sweeps";
        } else {
          return data.CyclesElapsed + " Cycles";
        }
      case "remaining":
        return data.Remaining;
      case "atLevel":
        return data.AtLevel;
      case "total":
        return data.Total;
      default:
        return "Unknown parameter!";
    }
  } else {
    return "-";
  }
}

function getDisplay(testTabs, activeTabIndex, orientation) {
  let statsVTable1 = "";
  let statsVTable2 = "";
  let statsHTable1 = "";
  let statsHTable2 = "";
  let testName = testTabs[activeTabIndex].name;

  switch (testName) {
    // Controller
    case "RVC":
    case "MMC":
      statsVTable1 = (
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Level:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "level")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Reference:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "reference")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>Control:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "control")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={4}>
            <Table.Cell>Drive:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "drive")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsVTable2 = (
        <Table.Body>
          <Table.Row key={5}>
            <Table.Cell>Remaining:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "remainingTime")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>At Level:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "atLevelTime")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={7}>
            <Table.Cell>Total Time:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "totalTime")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsHTable1 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={1}>
                  <Table.Cell>Level:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "level")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={4}>
                  <Table.Cell>Drive:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "drive")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={2}>
                  <Table.Cell>Reference:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "reference")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={3}>
                  <Table.Cell>Control:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "control")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      statsHTable2 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={5}>
                  <Table.Cell>Remaining:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "remainingTime")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={6}>
                  <Table.Cell>At Level:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "atLevelTime")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={7}>
                  <Table.Cell>Total Time:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "totalTime")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      break;

    case "SVC":
    case "RSD":
      statsVTable1 = (
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Frequency:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "frequency")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Control:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "control")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>Displ. (pk-pk):</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "displacement")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={4}>
            <Table.Cell>Drive:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "drive")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsVTable2 = (
        <Table.Body>
          <Table.Row key={5}>
            <Table.Cell>Remaining:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "SweepOrCycleRemaining")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>Elapsed:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "SweepOrCycleElapsed")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={7}>
            <Table.Cell>Total Time:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "totalTime")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsHTable1 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={1}>
                  <Table.Cell>Frequency:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "frequency")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={4}>
                  <Table.Cell>Drive:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "drive")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={3}>
                  <Table.Cell>Displ. (pk-pk):</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "displacement")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={2}>
                  <Table.Cell>Control:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "control")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      statsHTable2 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={5}>
                  <Table.Cell>Remaining:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "SweepOrCycleRemaining")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={6}>
                  <Table.Cell>Elapsed:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "SweepOrCycleElapsed")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={7}>
                  <Table.Cell>Total Time:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "totalTime")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      break;

    case "CSC":
    case "SRS":
      statsVTable1 = (
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Level:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "level")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Reference:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "reference")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>Control:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "control")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={4}>
            <Table.Cell>Drive:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "drive")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsVTable2 = (
        <Table.Body>
          <Table.Row key={5}>
            <Table.Cell>Remaining:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "remaining")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>At Level:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "atLevel")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={7}>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "total")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsHTable1 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={1}>
                  <Table.Cell>Level:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "level")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={4}>
                  <Table.Cell>Drive:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "drive")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={2}>
                  <Table.Cell>Reference:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "reference")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={3}>
                  <Table.Cell>Control:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "control")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      statsHTable2 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={5}>
                  <Table.Cell>Remaining:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "remaining")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={6}>
                  <Table.Cell>At Level:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "atLevel")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={7}>
                  <Table.Cell>Total:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "total")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      break;

    // Analyzer
    case "APS":
    case "COR":
    case "DEM":
    case "HIS":
    case "MIO":
    case "SYN":
    case "TRF":
    case "ORD": //changed in the future
      statsVTable1 = (
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Frames:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "frames")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Averages:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "averages")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>Time:</Table.Cell>
            <Table.Cell>{getData(testTabs, activeTabIndex, "time")}</Table.Cell>
          </Table.Row>
          <Table.Row key={4}>
            <Table.Cell>Σ Saves:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "totalSaves")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsVTable2 = (
        <Table.Body>
          <Table.Row key={5}>
            <Table.Cell>Waterfall Records:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "waterfallRecords")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={6}>
            <Table.Cell>Trigger State:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "triggerState")}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      );

      statsHTable1 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={1}>
                  <Table.Cell>Frames:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "frames")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={2}>
                  <Table.Cell>Averages:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "averages")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={3}>
                  <Table.Cell>Time:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "time")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={4}>
                  <Table.Cell>Σ Saves:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "totalSaves")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      statsHTable2 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={5}>
                  <Table.Cell>WF Records:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "waterfallRecords")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={6}>
                  <Table.Cell>Trig State:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "triggerState")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      break;
    case "REC":
      statsVTable1 = (
        <Table.Body>
          <Table.Row key={1}>
            <Table.Cell>Frames:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "frames")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={2}>
            <Table.Cell>Record Size:</Table.Cell>
            <Table.Cell>
              {getData(testTabs, activeTabIndex, "recordSize")}
            </Table.Cell>
          </Table.Row>
          <Table.Row key={3}>
            <Table.Cell>Time:</Table.Cell>
            <Table.Cell>{getData(testTabs, activeTabIndex, "time")}</Table.Cell>
          </Table.Row>
        </Table.Body>
      );
      statsHTable1 = (
        <Grid columns={2}>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={1}>
                  <Table.Cell>Frames:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "frames")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column>
            <Table basic="very" stackable compact>
              <Table.Body>
                <Table.Row key={2}>
                  <Table.Cell>Record Size:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "recordSize")}
                  </Table.Cell>
                </Table.Row>
                <Table.Row key={3}>
                  <Table.Cell>Time:</Table.Cell>
                  <Table.Cell>
                    {getData(testTabs, activeTabIndex, "time")}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      );
      break;
    default:
      break;
  }
  switch (orientation) {
    case "horizontal":
      return [statsHTable1, statsHTable2];
    case "vertical":
      return [statsVTable1, statsVTable2];
    default:
      return "select orientation!";
  }
}

function GetVerticalPagedDisplay(props) {
  let testTabs = props.testTabs;
  let activeTabIndex = props.activeTabIndex;
  let [statsTable1, statsTable2] = getDisplay(
    testTabs,
    activeTabIndex,
    "vertical"
  );

  return (
    <Segment attached="bottom" id={"DataStatusPanel"}>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={2.1}
        totalSlides={2}
        visibleSlides={1}
        isPlaying="false"
        interval={3000}
      >
        <Slider>
          <Slide index={0}>
            <Table basic="very" stackable compact>
              {statsTable1}
            </Table>
          </Slide>
          <Slide index={1}>
            <Table basic="very" stackable compact>
              {statsTable2}
            </Table>
          </Slide>
        </Slider>

        <CustomDotGroup slides={2} size="mini" />
      </CarouselProvider>
    </Segment>
  );
}

function GetVerticalSingleDisplay(props) {
  let testTabs = props.testTabs;
  let activeTabIndex = props.activeTabIndex;
  let [statsTable1, statsTable2] = getDisplay(
    testTabs,
    activeTabIndex,
    "vertical"
  );

  return (
    <Segment attached="bottom" id={"DataStatusPanel"}>
      <Table basic="very" stackable compact>
        {statsTable1}
      </Table>
      <Divider />
      <Table basic="very" stackable compact>
        {statsTable2}
      </Table>
    </Segment>
  );
}

function GetHorizontalPagedDisplay(props) {
  let testTabs = props.testTabs;
  let activeTabIndex = props.activeTabIndex;
  let [statsTable1, statsTable2] = getDisplay(
    testTabs,
    activeTabIndex,
    "horizontal"
  );

  return (
    <Segment attached="bottom" id={"DataStatusPanel"}>
      <CarouselProvider
        naturalSlideWidth={16}
        naturalSlideHeight={10}
        totalSlides={2}
        visibleSlides={1}
        isPlaying="false"
        interval={3000}
      >
        <Slider>
          <Slide index={0}>{statsTable1}</Slide>
          <Slide index={1}>{statsTable2}</Slide>
        </Slider>

        <CustomDotGroup slides={2} size="mini" />
      </CarouselProvider>
    </Segment>
  );
}

function StatusPanel(props) {
  let data = props.data;
  let isCollapsed = props.isCollapsed;
  let isHorizontal = props.isHorizontal;

  // Update and Create Test Tabs
  function getTabs() {
    let tabs = [];
    for (var k = 0; k < data.MeasStatus.length; k++) {
      tabs[k] = {
        id: k,
        name: data.MeasStatus[k].Type,
        data:
          data.MeasStatus[k].RunStatus &&
          eval(
            "data.MeasStatus[k].RunStatus." +
              data.MeasStatus[k].Type +
              "_Status"
          )
      };
    }
    return tabs;
  }
  let testTabs = getTabs();

  // Manage Active Tab
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  props.setActiveTestType(testTabs[activeTabIndex].name);

  return (
    <>
      <Menu
        size="tiny"
        attached="top"
        tabular
        className={isCollapsed && !isHorizontal ? "vertical" : ""}
      >
        {testTabs.map(tab => (
          <Menu.Item
            name={tab.name}
            key={tab.id}
            active={activeTabIndex === tab.id}
            onClick={() => {
              setActiveTabIndex(tab.id);
            }}
          />
        ))}
      </Menu>

      {!isHorizontal ? (
        !isCollapsed ? (
          <GetVerticalSingleDisplay
            testTabs={testTabs}
            activeTabIndex={activeTabIndex}
          />
        ) : (
          <GetVerticalPagedDisplay
            testTabs={testTabs}
            activeTabIndex={activeTabIndex}
          />
        )
      ) : (
        <GetHorizontalPagedDisplay
          testTabs={testTabs}
          activeTabIndex={activeTabIndex}
        />
      )}
    </>
  );
}

export default StatusPanel;
