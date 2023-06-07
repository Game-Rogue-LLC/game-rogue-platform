import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Environment,
  Center,
  OrbitControls
} from "@react-three/drei";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "@/src/store";

export default ({ position = [0, 0, 5], fov = 25, sx }) => {
  const snap = useSnapshot(state);

  const rotate = (direction) => {
    if (direction > 0) state.angle = (snap.angle + Math.PI / 2) % (Math.PI * 2);
    else state.angle = (snap.angle - Math.PI / 2) % (Math.PI * 2);
  };

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
        <Environment preset="city" />
        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>

      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          left: "100px",
          transform: "translate(0, -50%)"
        }}
        onClick={() => rotate(-1)}
      >
        <KeyboardArrowLeft fontSize="large" htmlColor="white" />
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          top: "50%",
          right: "100px",
          transform: "translate(0, -50%)"
        }}
        onClick={() => rotate(1)}
      >
        <KeyboardArrowRight fontSize="large" htmlColor="white" />
      </IconButton>
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
    easing.damp3(state.camera.position, [0, 0, 200], 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5 + snap.angle, 0],
      0.25,
      delta
    );
  });
  // console.log ('cameraRig', children, group)
  return <group ref={group}>{children}</group>;
}

function Shirt(props) {
  const snap = useSnapshot(state);
  const texture = useTexture(snap.texture);
  console.log(snap.texture);
  const { nodes, materials } = useGLTF("/static/models/HOODIE.glb");
  console.log({ nodes, materials });
  useFrame((state, delta) => {
    easing.dampC(materials.default.color, snap.color, 0.25, delta);
  });
  // useEffect(() => {
  //   console.log('lambert', materials.lambert1);

  // }, [materials.lambert1.color])

  return (
    <mesh
      castShadow
      geometry={nodes.default.geometry}
      material={materials.default}
      material-roughness={1}
      {...props}
      dispose={null}
    >
      <Decal
        position={[10, 10.04, 0.15]}
        rotation={[0, 0, 0]}
        scale={12}
        color={"#000000"}
        map={texture}
        map-anisotropy={16}
      />

      <Decal
        position={[0, 5.04, -30.15]}
        rotation={[0, Math.PI, 0]}
        scale={20}
        color={"#000000"}
        map={texture}
        map-anisotropy={16}
      />
    </mesh>
  );
}

useGLTF.preload("/static/models/HOODIE.glb");
