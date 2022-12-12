const firestoreCollection = {
  BASE_COLLECTION: "users",
  SCHEMES: "schemes",
  CURRENT_SCHEME: "currentSchemeId",
};

const firestoreSubCollection = {
  PRIMARY_PALETTES: "primary-palettes",
  NEUTRAL_PALETTES: "neutral-palettes",
  ACCENT_PALETTES: "accent-palettes",
};

const paletteType = {
  PRIMARY: "primary",
  NEUTRAL: "neutral",
  ACCENT: "accent",
};

const queryKeys = {
  GET_ALL_SCHEMES: [firestoreCollection.SCHEMES],
  GET_CURRENT_SCHEME_ID: [firestoreCollection.CURRENT_SCHEME],
  GET_CURRENT_SCHEME: [
    firestoreCollection.CURRENT_SCHEME,
    "get current scheme",
  ],
  CHECK_USER_EXISTENCE: ["Checking if the user exist already."],
};

export { paletteType, firestoreCollection, firestoreSubCollection, queryKeys };
