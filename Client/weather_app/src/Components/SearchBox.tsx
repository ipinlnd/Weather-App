import React, { useState } from "react";
import { Query } from "react-apollo";
import { Queries } from "../graphql/weather";
import { SearchBoxComponents } from "../StyledComponents/SearchBox";

interface SearchBoxProps {
  onSelect: (name: string) => void;
}

let options: any[] = [];

const SearchBox = (props: SearchBoxProps) => {
  const [selected, setSelected] = useState("");
  const [textInput, setTextInput] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);

  return (
    <SearchBoxComponents.SearchContainer
      isAnimating={selected !== ""}
      onKeyDown={(event: any) => {
        if (event.key === "ArrowDown" && optionIndex < options.length - 1)
          setOptionIndex(optionIndex + 1);
        if (event.key === "ArrowUp" && optionIndex > 0)
          setOptionIndex(optionIndex - 1);
        if (event.key === "Enter" && options.length > 0) {
          setSelected(options[optionIndex].id);
          setTextInput(options[optionIndex].title);
          props.onSelect(options[optionIndex].id);
        }
      }}
    >
      <SearchBoxComponents.SearchInput
        placeholder="Enter a city name..."
        value={textInput}
        onChange={(value: any) => {
          setTextInput(value.target.value);
          setSelected("");
          props.onSelect("");
        }}
      />
      {textInput !== "" && selected === "" ? (
        <Query
          query={Queries.getNameCompletion}
          variables={{ input: textInput }}
        >
          {({ loading, error, data }: any) => {
            if (loading || error)
              return (
                <SearchBoxComponents.DropDownContainer>
                  <SearchBoxComponents.DropDownOption isSelected={false}>
                    Loading
                  </SearchBoxComponents.DropDownOption>
                </SearchBoxComponents.DropDownContainer>
              );

            options = data.getNameCompletion;
            if (options.length === 0) return null;

            return (
              <SearchBoxComponents.DropDownContainer>
                {options.map((item: any, index: number) => (
                  <SearchBoxComponents.DropDownOption
                    key={index}
                    value={item.id}
                    onClick={() => {
                      setSelected(item.id);
                      setTextInput(item.title);
                      props.onSelect(item.id);
                    }}
                    isSelected={optionIndex === index}
                  >
                    {item.title}
                  </SearchBoxComponents.DropDownOption>
                ))}
              </SearchBoxComponents.DropDownContainer>
            );
          }}
        </Query>
      ) : null}
    </SearchBoxComponents.SearchContainer>
  );
};

export { SearchBox };
