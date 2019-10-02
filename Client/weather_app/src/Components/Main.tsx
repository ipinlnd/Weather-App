import React, { CSSProperties } from "react";
import { SearchBox } from "./SearchBox";

const styles: Styles = {
  container: {
    backgroundImage: "linear-gradient(#0055aaff, #0055aa99)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    position: "relative",
  },
};

interface Styles {
  container: CSSProperties;
}

interface MainProps {}

const Main = (props: MainProps) => {
  return (
    <div style={styles.container}>
      <SearchBox onSelect={(value: string) => console.log(value)} />
    </div>
  );
};

export { Main };
