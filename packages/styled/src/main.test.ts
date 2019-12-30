import { getInterpolations } from "./__tests__/helpers";
import styled from "./main";

jest.mock("./helpers/write-css");
const writeCSS = require("./helpers/write-css") as { default: jest.Mock };

describe("styled", () => {
  const checkedInterpolation = getInterpolations`
    color: ${p => (p.disabled ? "grey" : "blue")};
  `;

  const { propsToClassNamesMap } = styled("div", ["checked", "disabled"], "Container")`
    font-family: Arial;
    font-size: 16px;
    line-height: 1.25;
    ${p => p.checked && checkedInterpolation};
    ${p => p.disabled && "curser: default"};
  `;

  it("SHOULD generate the correct props to class names map", () => {
    Object.keys(propsToClassNamesMap).forEach(key => {
      expect(propsToClassNamesMap[key].startsWith("container")).toBe(true);
      expect(propsToClassNamesMap[key].endsWith(key)).toBe(true);
    });
  });

  it("SHOULD write the correct css to file", () => {
    expect(writeCSS.default.mock.calls[0][0]).toMatchSnapshot();
  });
});