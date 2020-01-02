export const ENUM_PROP_NAMESPACE_REGEX = /^(.*)::/;

export const PACKAGE_JSON_FILENAME = "package.json" as const;
export const STYLING_CONFIG_FILENAME = "styling.config.js" as const;
export const STYLING_CSS_FILENAME = "styling.css" as const;

export const COMBO_NUMBER_PLACEHOLDER = "%{number}";

export const EXCESSIVE_PROPS_WARNING = `Consider reducing the number of props driving the styling of this component.
  The props you have declared create ${COMBO_NUMBER_PLACEHOLDER} combinations.`;

export const CLASSNAME = "className" as const;

export const ERROR = "error" as const;
export const WARN = "warn" as const;
export const INFO = "info" as const;

export const LOG_PREFIX = ">>>>>>" as const;
