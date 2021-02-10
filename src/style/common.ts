import styled from "@emotion/styled";

export const Row = styled.div<{
  gap?: number | boolean;
  justify?: string;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.justify ? props.justify : "flex-start")};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : 0};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
