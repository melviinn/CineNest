module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    // Allow Tailwind and custom at-rules such as @theme
    "at-rule-no-unknown": [true, {
      "ignoreAtRules": [
        "tailwind",
        "apply",
        "variants",
        "responsive",
        "screen",
        "layer",
        "theme"
      ]
    }]
  }
};
