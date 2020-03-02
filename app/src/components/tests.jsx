import React, { useState } from "react";
import { Image, Container, Grid, Divider } from "semantic-ui-react";

// let buttonsBackup = (
//   <>
//     <Button.Group
//       id={"SidebarButtonPanel"}
//       size="tiny"
//       // fluid
//       // icon={isCollapsed}
//       // labeled={!isCollapsed}
//       // icon="false"
//       // labeled="false"
//       // widths={4}
//     >
//       {/* <Container fluid> */}
//       <Button
//         // fluid
//         // size="tiny"
//         // icon="angle double up"
//         // content={isCollapsed ? null : "INIT"}
//         color="grey"
//         animated="fade"
//         disabled={isDisInit}
//         onClick={() => handleButtonClick("init")}
//       >
//         <Button.Content visible>INIT</Button.Content>
//         <Button.Content hidden>
//           <Icon name="angle double up" />
//         </Button.Content>
//       </Button>
//       <Button
//         // fluid
//         size="tiny"
//         icon="play"
//         content={isCollapsed ? null : "START"}
//         color="green"
//         disabled={isDisStart}
//         onClick={() => handleButtonClick("start")}
//       />
//       {!isHidStop && (
//         <Button
//           // fluid
//           size="tiny"
//           icon="stop"
//           content={isCollapsed ? null : "STOP"}
//           color="yellow"
//           disabled={isDisStop}
//           onClick={() => handleButtonClick("stop")}
//         />
//       )}
//       {!isHidResume && (
//         <Button
//           // fluid
//           size="tiny"
//           icon="play circle"
//           content={isCollapsed ? null : "RESUME"}
//           color="yellow"
//           disabled={isDisResume}
//           onClick={() => handleButtonClick("resume")}
//         />
//       )}
//       <Button
//         // fluid
//         size="tiny"
//         icon="eject"
//         content={isCollapsed ? null : "END"}
//         color="red"
//         disabled={isDisEnd}
//         onClick={() => handleButtonClick("end")}
//       />
//       {/* </Container> */}
//       {/* </Button.Group>
// <Button.Group
//   id={"SidebarButtonPanel"}
//   size="mini"
//   fluid
//   icon={isCollapsed}
//   labeled={!isCollapsed}
// > */}
//     </Button.Group>
//   </>
// );

function Tests(props) {
  let data = props.data;
  let isCollapsed = props.isCollapsed;

  return (
    <Grid>
      <Grid.Column>
        <Grid.Row>
          <Image src="sample_graph.png" alt="Sample Graph" />
          <Divider />
          <Image src="sample_graph2.png" alt="Sample Graph 2" />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default Tests;
