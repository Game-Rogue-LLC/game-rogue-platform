import { nanoid } from "nanoid";

export const mapUserData = (user) => {
  const { uid, email, xa, displayName, photoURL } = user;
  return {
    _id: nanoid(5),
    id: uid,
    email,
    name: displayName || "",
    userName: displayName || "",
    profilePic: photoURL || "",
    // gender: 0,
    residency: {
      code: "US",
      label: "United States",
      phone: "1"
    },
    followers: [],
    followings: [],
    birthday: new Date(),
    deleted: false
  };
};
