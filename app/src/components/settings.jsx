import React, { useState, useEffect } from "react";
import { Form, Grid } from "semantic-ui-react";

// function getDefaultState(key) {
//   switch (key) {
//     case "valIP":
//       return "localhost";
//     case "valPort":
//       return "8732";
//     case "valRefRate":
//       return "1";
//     case "valTestName":
//       return "";
//     default:
//       return "";
//   }
// }

// const useStateWithLocalStorage = localStorageKey => {
//   const [value, setValue] = useState(
//     localStorage.getItem(localStorageKey) || getDefaultState(localStorageKey)
//   );
//   useEffect(() => {
//     localStorage.setItem(localStorageKey, value);
//   }, [value]);
//   return [value, setValue];
// };

function SettingsConnection(params) {
  const [valIP, setIP] = useState(params.settings.valIP);
  const [valPort, setPort] = useState(params.settings.valPort);
  const [valRefRate, setRefRate] = useState(params.settings.valRefRate);

  // const setIP = () => params.settings.setIP;
  // const setPort = () => params.settings.setPort;
  // const setRefRate = () => params.settings.setRefRate;

  // useEffect(() => {
  //   valIP = params.settings.valIP;
  //   valPort = params.settings.valPort;
  //   valRefRate = params.settings.valRefRate;
  // });

  const handleChange = (val, type) => {
    switch (type) {
      case "ip":
        setIP(val);
        params.settings.setIP(val);
        break;
      case "port":
        setPort(val);
        params.settings.setPort(val);
        break;
      case "refrate":
        setRefRate(val);
        params.settings.setRefRate(val);
        break;
      default:
        break;
    }
  };

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <h3>Connection Settings</h3>
          <Form>
            <Form.Group width="equal">
              <Form.Input
                label="IP Address"
                value={valIP}
                onChange={(e, obj) => handleChange(obj.value, "ip")}
              />
              <Form.Input
                label="Port"
                type="number"
                value={valPort}
                onChange={(e, obj) => handleChange(obj.value, "port")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Refresh Rate"
                type="number"
                min="0.4"
                max="4"
                step="0.2"
                width={4}
                value={valRefRate}
                onChange={(e, obj) => handleChange(obj.value, "refrate")}
              />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

function Settings(params) {
  return <SettingsConnection settings={params.connectionSettings} />;
}

export default Settings;
