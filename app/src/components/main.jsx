import React, { useState } from "react";
import Settings from "./settings";
import Tests from "./tests";
import { Container, Grid } from "semantic-ui-react";

function Main(props) {
  const displayedTab = {
    test: <Tests data={props.data} />,
    settings: <Settings connectionSettings={props.connectionSettings} />
  };

  return (
    <Container>
      <Grid>
        <Grid.Column>
          <Grid.Row>{/* <h1>Main Panel</h1> */}</Grid.Row>
          <Grid.Row>{displayedTab[props.activeTab]}</Grid.Row>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default Main;
