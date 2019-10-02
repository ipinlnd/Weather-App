import React, { CSSProperties, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { Query } from "react-apollo";
import { Queries } from "../graphql/weather";

interface ContainerProps {
  isAnimating: boolean;
}

interface OptionProps {
  isSelected: boolean;
}

const DropDownContainer = styled.div`
  width: 100%;
  margin-top: -1w;
  padding-top: 1vw;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: white;
`;

const DropDownOption = styled.option`
  width: 100%;
  background-color: white;
  height: 2vw;
  cursor: pointer;

  :hover {
    background-color: #0000ff22;
  }

  background-color: ${(props: OptionProps) =>
    props.isSelected ? "#0000ff22" : "white"};
`;

const move = keyframes`
  from {top: 50%;}
  to {top: 5vw;}
`;

const scale = keyframes`
  from {width: 80%;}
  to {width: 50%;}
`;

const SearchInput = styled.input`
  height: 3vw;
  border-radius: 0.5vw;
  font-size: 1.5vw;
  width: 100%;
`;

const SearchContainer = styled.div`
  width: 80%;
  top: 50%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${(props: ContainerProps) =>
    props.isAnimating
      ? css`${move} 1s linear forwards, ${scale} 1s linear forwards`
      : "none"};
`;

interface SearchBoxProps {
  onSelect: (name: string) => void;
}

let options: any[] = [];

const SearchBox = (props: SearchBoxProps) => {
  const [selected, setSelected] = useState("");
  const [textInput, setTextInput] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);

  return (
    <SearchContainer
      isAnimating={selected !== ""}
      onKeyDown={(event: any) => {
        if (event.key === "ArrowDown" && optionIndex < options.length - 1)
          setOptionIndex(optionIndex + 1);
        if (event.key === "ArrowUp" && optionIndex > 0)
          setOptionIndex(optionIndex - 1);
        if (event.key === "Enter") {
          setSelected(options[optionIndex].id);
          setTextInput(options[optionIndex].title);
        }
      }}
    >
      <SearchInput
        placeholder="Enter a city name..."
        value={textInput}
        onChange={(value: any) => {
          setTextInput(value.target.value);
          setSelected("");
        }}
      />
      {textInput !== "" && selected == "" ? (
        <Query
          query={Queries.getNameCompletion}
          variables={{ input: textInput }}
        >
          {({ loading, error, data }: any) => {
            if (loading || error)
              return (
                <DropDownOption isSelected={false}>Loading</DropDownOption>
              );

            options = data.getNameCompletion;
            if (options.length === 0) return null;

            return (
              <DropDownContainer>
                {options.map((item: any, index: number) => (
                  <DropDownOption
                    key={index}
                    value={item.id}
                    onClick={() => {
                      setSelected(item.id);
                      setTextInput(item.title);
                    }}
                    isSelected={optionIndex === index}
                  >
                    {item.title}
                  </DropDownOption>
                ))}
              </DropDownContainer>
            );
          }}
        </Query>
      ) : null}
    </SearchContainer>
  );
};

export { SearchBox };
