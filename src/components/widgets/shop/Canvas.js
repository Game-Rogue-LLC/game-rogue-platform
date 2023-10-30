import {
  AccumulativeShadows,
  Center,
  Decal,
  Environment,
  OrbitControls,
  RandomizedLight,
  useGLTF,
  useTexture
} from "@react-three/drei";
import { Box, Grid, IconButton, IconButtonk } from "@mui/material";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

import { Close } from "@mui/icons-material";
import { easing } from "maath";
import { state } from "@/src/store";
import { useSnapshot } from "valtio";

export default ({ position = [0, 0, -220], fov = 25, sx }) => {
  const snap = useSnapshot(state);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectPrimary, setSelectPrimary] = useState(false);
  const [selectSecondary, setSelectSecondary] = useState(false);
  const [selectTertiary, setSelectTertiary] = useState(false);
  const [selectLogo, setSelectLogo] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#ffffff");
  const [secondaryColor, setSecondaryColor] = useState("#01378d");
  const [tertiaryColor, setTertiaryColor] = useState("#e3001b");
  const [logoColor, setLogoColor] = useState("#65402c");
  const orbitRef = useRef();
  return (
    <div style={{ ...sx }}>
      <Canvas
        style={{
          position: "absolute",
          left: 0
        }}
        shadows
        camera={{ position, fov }}
        gl={{ preserveDrawingBuffer: true }}
        eventSource={document.getElementsByTagName("body")[0]}
        eventPrefix="client"
      >
        <ambientLight intensity={0.1} />
        <Environment
          background={false} // Whether to affect scene.background
          files={"HDR.hdr"}
          path={"/"}
        />
        <OrbitControls
          ref={orbitRef}
          target={[0, 0, 0]}
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          top: "96%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          gap: 3
        }}
      >
        <div
          className={`circle_direction`}
          style={{ background: state.angle === Math.PI ? "#000000" : "#FFFFFF" }}
          onClick={() => {
            state.angle = Math.PI;
            orbitRef?.current?.reset();
          }}
        ></div>

        <div
          className={`circle_direction`}
          style={{ background: state.angle === Math.PI / 2 ? "#000000" : "#FFFFFF" }}
          onClick={() => {
            state.angle = Math.PI / 2;
            orbitRef?.current?.reset();
          }}
        ></div>

        <div
          className={`circle_direction`}
          style={{ background: state.angle === Math.PI + Math.PI / 2 ? "#000000" : "#FFFFFF" }}
          onClick={() => {
            state.angle = Math.PI + Math.PI / 2;
            orbitRef?.current?.reset();
          }}
        ></div>
        <div
          className={`circle_direction`}
          style={{ background: state.angle === 0 ? "#000000" : "#FFFFFF" }}
          onClick={() => {
            state.angle = 0;
            orbitRef?.current?.reset();
          }}
        ></div>
      </Box>
      <Box
        sx={{
          display: "flex",
          paddingBlock: 0,
          justifyContent: "center",
          position: "absolute",
          top: "4%",
          right: "0%"
        }}
      >
        {selectPrimary && (
          <div
            style={{
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              padding: "7px",
              display: showColorPicker ? "flex" : "none"
            }}
          >
            {snap.colors.map((color) => (
              <Grid
                key={color}
                item
                xs={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
              >
                <div
                  className={`circle`}
                  style={{ background: color }}
                  onClick={() => {
                    state.color = color;
                    setPrimaryColor(color);
                  }}
                ></div>
              </Grid>
            ))}
            <IconButton
              onClick={() => {
                setShowColorPicker(false);
                setSelectPrimary(false);
                setSelectSecondary(false);
                setSelectTertiary(false);
                setSelectLogo(false);
              }}
            >
              <Close fontSize="large" htmlColor="white" />
            </IconButton>
          </div>
        )}
        {selectSecondary && (
          <div
            style={{
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              padding: "7px",
              display: showColorPicker ? "flex" : "none"
            }}
          >
            {snap.colors.map((color) => (
              <Grid
                key={color}
                item
                xs={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
              >
                <div
                  className={`circle`}
                  style={{ background: color }}
                  onClick={() => {
                    state.color = color;
                    setSecondaryColor(color);
                  }}
                ></div>
              </Grid>
            ))}
            <IconButton
              onClick={() => {
                setShowColorPicker(false);
                setSelectPrimary(false);
                setSelectSecondary(false);
                setSelectTertiary(false);
                setSelectLogo(false);
              }}
            >
              <Close fontSize="large" htmlColor="white" />
            </IconButton>
          </div>
        )}
        {selectTertiary && (
          <div
            style={{
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              padding: "7px",
              display: showColorPicker ? "flex" : "none"
            }}
          >
            {snap.colors.map((color) => (
              <Grid
                key={color}
                item
                xs={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
              >
                <div
                  className={`circle`}
                  style={{ background: color }}
                  onClick={() => {
                    state.color = color;
                    setTertiaryColor(color);
                  }}
                ></div>
              </Grid>
            ))}
            <IconButton
              onClick={() => {
                setShowColorPicker(false);
                setSelectPrimary(false);
                setSelectSecondary(false);
                setSelectTertiary(false);
                setSelectLogo(false);
              }}
            >
              <Close fontSize="large" htmlColor="white" />
            </IconButton>
          </div>
        )}
        {selectLogo && (
          <div
            style={{
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
              padding: "7px",
              display: showColorPicker ? "flex" : "none"
            }}
          >
            {snap.colors.map((color) => (
              <Grid
                key={color}
                item
                xs={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
              >
                <div
                  className={`circle`}
                  style={{ background: color }}
                  onClick={() => {
                    state.color_decal = color;
                    setLogoColor(color);
                  }}
                ></div>
              </Grid>
            ))}
            <IconButton
              onClick={() => {
                setShowColorPicker(false);
                setSelectPrimary(false);
                setSelectSecondary(false);
                setSelectTertiary(false);
                setSelectLogo(false);
              }}
            >
              <Close fontSize="large" htmlColor="white" />
            </IconButton>
          </div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            margin: "20px",
            marginRight: "50px"
          }}
        >
          <Grid
            item
            xs={4}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
          >
            <div
              key={primaryColor}
              className={`circle_colorPicker`}
              style={{ background: primaryColor }}
              onClick={() => {
                setShowColorPicker(true);
                setSelectPrimary(true);
                setSelectSecondary(false);
                setSelectTertiary(false);
                setSelectLogo(false);
              }}
            ></div>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
          >
            <div
              key={secondaryColor}
              className={`circle_colorPicker`}
              style={{ background: secondaryColor }}
              onClick={() => {
                setShowColorPicker(true);
                setSelectPrimary(false);
                setSelectSecondary(true);
                setSelectTertiary(false);
                setSelectLogo(false);
              }}
            ></div>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
          >
            <div
              key={tertiaryColor}
              className={`circle_colorPicker`}
              style={{ background: tertiaryColor }}
              onClick={() => {
                setShowColorPicker(true);
                setSelectPrimary(false);
                setSelectSecondary(false);
                setSelectTertiary(true);
                setSelectLogo(false);
              }}
            ></div>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}
          >
            <div
              key={logoColor}
              className={`circle_colorPicker`}
              style={{ background: logoColor }}
              onClick={() => {
                setShowColorPicker(true);
                setSelectPrimary(false);
                setSelectSecondary(false);
                setSelectTertiary(false);
                setSelectLogo(true);
              }}
            ></div>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

function Backdrop() {
  const shadows = useRef();
  useFrame((state, delta) =>
    easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta)
  );
  return (
    <>
      <AccumulativeShadows
        ref={shadows}
        temporal
        frames={60}
        alphaTest={0.85}
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.14]}
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.55}
          ambient={0.25}
          position={[5, 5, -10]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.55}
          position={[-5, 5, -9]}
        />
      </AccumulativeShadows>
    </>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    // easing.damp3(state.camera.position, [0, 0, 200], 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5 + snap.angle, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

function Shirt(props) {
  const snap = useSnapshot(state);
  const texture = useTexture(snap.texture);

  const shirtRef = useRef();
  const { nodes, materials } = useGLTF("/static/models/HOODIE.glb");
  useFrame((state, delta) => {
    easing.dampC(materials.default.color, snap.color, 0.25, delta);
  });

  useEffect(() => {
    shirtRef.current.position.set(0, 0, 0);
  }, []);
  return (
    <mesh
      ref={shirtRef}
      castShadow
      geometry={nodes.default.geometry}
      material={materials.default}
      material-roughness={1}
      {...props}
      dispose={null}
    >
      {snap.frontLogoDisplay && (
        <Decal
          position={[10, 10.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={12}
          color={snap.color_decal}
          map={texture}
          map-anisotropy={16}
        />
      )}
      {snap.backLogoDisplay && (
        <Decal
          position={[0, 5.04, -30.15]}
          rotation={[0, Math.PI, 0]}
          scale={20}
          color={snap.color_decal}
          map={texture}
          map-anisotropy={16}
        />
      )}
    </mesh>
  );
}

useGLTF.preload("/static/models/HOODIE.glb");
