import React, { CSSProperties, useState } from "react";
import { SearchBox } from "./SearchBox";
import { WeatherForecast } from "./WeatherForecast";

const styles: Styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    position: "relative"
  }
};

interface Styles {
  container: CSSProperties;
}

interface MainProps {}

const Main = (props: MainProps) => {
  const [id, setId] = useState("");
  return (
    <div style={styles.container}>
      <SearchBox onSelect={(value: string) => setId(value)} />
      {id !== "" ? <WeatherForecast id={id} /> : null}
    </div>
  );
};

export { Main };
