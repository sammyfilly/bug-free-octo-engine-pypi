module.exports = {
  root: true,
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: ["docs/", "create-turbo/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
