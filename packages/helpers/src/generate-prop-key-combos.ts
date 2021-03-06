import { EnumPropList, PropListWithoutCSSVariables } from "@styling/types";
import { isArray, isEqual, isString } from "lodash";
import { ENUM_PROP_NAMESPACE_REGEX } from "./constants";

function generateEnumCombos(props: EnumPropList) {
  return props.reduce((combos, [name, values]) => {
    combos.push(...values.map(value => `${name}::${value}`));
    return combos;
  }, [] as string[]);
}

function getEnumNamespace(prop: string) {
  return ENUM_PROP_NAMESPACE_REGEX.exec(prop)?.[0];
}

function generateCombos(active: string[] = [], rest: string[], combos: string[][]) {
  if (!active.length && !rest.length) return;

  if (!rest.length) {
    if (!combos.find(c => isEqual(c, active))) {
      combos.push(active);
    }
  } else {
    const namespace = getEnumNamespace(rest[0]);
    let newActive;

    if (!!namespace && !!active.find(a => a.startsWith(namespace))) {
      newActive = active;
    } else {
      newActive = [...active, rest[0]];
    }

    generateCombos(newActive, rest.slice(1), combos);
    generateCombos(active, rest.slice(1), combos);
  }
}

export default function generatePropKeyCombos(props: PropListWithoutCSSVariables) {
  const flagProps = props.filter(prop => isString(prop)) as string[];
  const enumProps = generateEnumCombos(props.filter(prop => isArray(prop)) as EnumPropList);

  const combos: string[][] = [];
  generateCombos([], [...flagProps, ...enumProps], combos);
  return combos;
}
