export default {
  __schema: {
    types: [
      {
        kind: "UNION",
        name: "Result",
        possibleTypes: [
          {
            name: "User"
          },
          {
            name: "Status"
          }
        ]
      }
    ]
  }
};
