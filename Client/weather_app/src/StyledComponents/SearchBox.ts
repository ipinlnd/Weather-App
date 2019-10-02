import styled, { keyframes, css } from "styled-components";

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
  height: 10vw;
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

const SearchBoxComponents = {
  DropDownContainer,
  DropDownOption,
  SearchInput,
  SearchContainer,
};

export { SearchBoxComponents };
