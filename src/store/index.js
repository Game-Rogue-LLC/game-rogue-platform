import { proxy } from "valtio";

const state = proxy({
  intro: true,
  texture: "/static/images/GR_Letters.png",
  colors: ["#ccc", "#f59a39", "#80C670", "#726DE8", "#EF674E", "#353934"],
  decals: ["react", "three2", "pmndrs"],
  color: "#f59a39",
  decal: "three2",
  angle: 0
});

export { state };
