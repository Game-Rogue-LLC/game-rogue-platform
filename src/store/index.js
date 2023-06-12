import { proxy } from "valtio";

const state = proxy({
  intro: true,
  texture: "/static/images/GR_Letters.png",
  colors: [
    "#01378d",
    "#562382",
    "#e3001b",
    "#ec7404",
    "#ffffff",
    "#ffec00",
    "#01914b",
    "#d1cec3",
    "#65402c",
    "#000000"
  ],
  decals: ["react", "three2", "pmndrs"],
  color: "#d1cec3",
  color_decal: "#ec7404",
  decal: "three2",
  angle: Math.PI,
  frontLogoDisplay: true,
  backLogoDisplay: true
});

export { state };
