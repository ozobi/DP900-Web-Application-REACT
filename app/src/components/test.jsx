import React, { useState, useEffect } from "react";
import { Accordion, Icon, Grid } from "semantic-ui-react";

function TestStatusPanel(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  return (
    <Accordion>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <Grid divided="vertically" stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>Remaining:</div>
            </Grid.Column>
            <Grid.Column>
              <div>0:10:40</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>At Level:</div>
            </Grid.Column>
            <Grid.Column>
              <div>0:00:40</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>Total Time:</div>
            </Grid.Column>
            <Grid.Column>
              <div>0:01:40</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>Level:</div>
            </Grid.Column>
            <Grid.Column>
              <div>-12 dB</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>Reference:</div>
            </Grid.Column>
            <Grid.Column>
              <div>0.31 g</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>Control:</div>
            </Grid.Column>
            <Grid.Column>
              <div>0.014 g</div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div>Drive:</div>
            </Grid.Column>
            <Grid.Column>
              <div>0.01095 V</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Accordion.Content>
    </Accordion>
  );
}

export default TestStatusPanel;
