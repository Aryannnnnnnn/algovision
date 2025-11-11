"use client";
import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & {
      new (): ThreeGlobe;
    };
  }
}

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: {
    lat: number;
    lng: number;
  };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
};

interface Office {
  name: string;
  label: string;
  team: string;
  lat: number;
  lng: number;
}

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
  offices?: Office[];
}

let numbersOfRings = [0];

export function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [countries, setCountries] = useState<any>({ features: [] });

  const defaultProps = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ...globeConfig,
  };

  // Load countries data
  useEffect(() => {
    console.log('Fetching globe data...');
    fetch('/globe.json')
      .then(res => {
        console.log('Globe data fetch response:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Globe data loaded:', data.features ? data.features.length : 0, 'features');
        setCountries(data);
      })
      .catch(err => console.error('Failed to load globe data:', err));
  }, []);

  // Initialize globe only once
  useEffect(() => {
    if (!globeRef.current && groupRef.current) {
      globeRef.current = new ThreeGlobe({} as any);
      (groupRef.current as any).add(globeRef.current);
      setIsInitialized(true);
    }
  }, []);

  // Build material when globe is initialized or when relevant props change
  useEffect(() => {
    if (!globeRef.current || !isInitialized) return;

    try {
      const globeMaterial = globeRef.current.globeMaterial() as unknown as {
        color: Color;
        emissive: Color;
        emissiveIntensity: number;
        shininess: number;
      };
      globeMaterial.color = new Color(globeConfig.globeColor || "#1d072e");
      globeMaterial.emissive = new Color(globeConfig.emissive || "#000000");
      globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
      globeMaterial.shininess = globeConfig.shininess || 0.9;
    } catch (error) {
      console.error("Error setting globe material:", error);
    }
  }, [
    isInitialized,
    globeConfig.globeColor,
    globeConfig.emissive,
    globeConfig.emissiveIntensity,
    globeConfig.shininess,
  ]);

  // Build data when globe is initialized or when data changes
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data || countries.features.length === 0) return;

    try {
      const arcs = data;
      let points = [];
      for (let i = 0; i < arcs.length; i++) {
        const arc = arcs[i];
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.startLat,
          lng: arc.startLng,
        });
        points.push({
          size: defaultProps.pointSize,
          order: arc.order,
          color: arc.color,
          lat: arc.endLat,
          lng: arc.endLng,
        });
      }

      // remove duplicates for same lat and lng
      const filteredPoints = points.filter(
        (v, i, a) =>
          a.findIndex((v2) =>
            ["lat", "lng"].every(
              (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"],
            ),
          ) === i,
      );

      console.log("Setting up globe with", countries.features.length, "countries");

      // Lower resolution for mobile/low-spec devices
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const hexResolution = isMobile ? 2 : 3;

      globeRef.current
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(hexResolution)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);

      globeRef.current
        .arcsData(data)
        .arcStartLat((d) => (d as { startLat: number }).startLat * 1)
        .arcStartLng((d) => (d as { startLng: number }).startLng * 1)
        .arcEndLat((d) => (d as { endLat: number }).endLat * 1)
        .arcEndLng((d) => (d as { endLng: number }).endLng * 1)
        .arcColor((e: any) => (e as { color: string }).color)
        .arcAltitude((e) => (e as { arcAlt: number }).arcAlt * 1)
        .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
        .arcDashLength(defaultProps.arcLength)
        .arcDashInitialGap((e) => (e as { order: number }).order * 1)
        .arcDashGap(15)
        .arcDashAnimateTime(() => defaultProps.arcTime);

      globeRef.current
        .pointsData(filteredPoints)
        .pointColor((e) => (e as { color: string }).color)
        .pointsMerge(true)
        .pointAltitude(0.0)
        .pointRadius(2);

      globeRef.current
        .ringsData([])
        .ringColor(() => defaultProps.polygonColor)
        .ringMaxRadius(defaultProps.maxRings)
        .ringPropagationSpeed(RING_PROPAGATION_SPEED)
        .ringRepeatPeriod(
          (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings,
        );

      console.log("Globe setup complete");
    } catch (error) {
      console.error("Error setting up globe data:", error);
    }
  }, [
    isInitialized,
    data,
    countries.features.length, // Use length instead of entire object to prevent array size changes
    defaultProps.pointSize,
    defaultProps.showAtmosphere,
    defaultProps.atmosphereColor,
    defaultProps.atmosphereAltitude,
    defaultProps.polygonColor,
    defaultProps.arcLength,
    defaultProps.arcTime,
    defaultProps.rings,
    defaultProps.maxRings,
  ]);

  // Handle rings animation with cleanup
  useEffect(() => {
    if (!globeRef.current || !isInitialized || !data) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newNumbersOfRings = genRandomNumbers(
        0,
        data.length,
        Math.floor((data.length * 4) / 5),
      );

      const ringsData = data
        .filter((d, i) => newNumbersOfRings.includes(i))
        .map((d) => ({
          lat: d.startLat,
          lng: d.startLng,
          color: d.color,
        }));

      globeRef.current.ringsData(ringsData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInitialized, data]);

  return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    // Limit pixel ratio for better performance on mobile
    const isMobile = window.innerWidth < 768;
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio;

    gl.setPixelRatio(pixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffffff, 0); // Transparent background
  }, [gl, size]);

  return null;
}

// Component to render office labels at 3D positions
function OfficeLabels({ offices }: { offices?: Office[] }) {
  if (!offices || offices.length === 0) {
    console.log('No offices to display');
    return null;
  }

  console.log('Rendering office labels for', offices.length, 'offices');

  // Convert lat/lng to 3D coordinates on a sphere (matching three-globe coordinate system)
  const latLngToVector3 = (lat: number, lng: number, radius: number = 100) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((90 - lng) * Math.PI) / 180;

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z] as [number, number, number];
  };

  return (
    <>
      {offices.map((office, idx) => {
        const position = latLngToVector3(office.lat, office.lng, 105);
        console.log(`Office ${office.name} at lat:${office.lat}, lng:${office.lng} -> position:`, position);

        return (
          <Html
            key={idx}
            position={position}
            center
            occlude
            style={{
              transition: 'all 0.2s',
              pointerEvents: 'auto',
            }}
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-xl p-3 border-2 border-[#00b5ff] w-[140px] backdrop-blur-sm">
              <div className="text-xs text-gray-600 mb-1 font-bold uppercase tracking-wide">{office.label}</div>
              <div className="text-2xl font-black text-transparent bg-gradient-to-br from-[#00b5ff] to-[#0099dd] bg-clip-text">{office.team}</div>
              <div className="text-xs text-gray-700 font-medium">Team</div>
            </div>
          </Html>
        );
      })}
    </>
  );
}

export function World(props: WorldProps) {
  const { globeConfig, offices } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  console.log('World component rendering with offices:', offices);

  return (
    <Canvas
      scene={scene}
      camera={new PerspectiveCamera(50, aspect, 180, 1800)}
      style={{ width: '100%', height: '100%' }}
      gl={{
        alpha: true,
        antialias: typeof window !== 'undefined' && window.innerWidth >= 768, // Disable antialias on mobile for performance
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1.5] : [1, 2]}
      performance={{ min: 0.5 }}
    >
      <WebGLRendererConfig />
      <ambientLight color={globeConfig.ambientLight} intensity={0.8} />
      <directionalLight
        color={globeConfig.directionalLeftLight}
        position={new Vector3(-400, 100, 400)}
        intensity={1}
      />
      <directionalLight
        color={globeConfig.directionalTopLight}
        position={new Vector3(-200, 500, 200)}
        intensity={0.5}
      />
      <pointLight
        color={globeConfig.pointLight}
        position={new Vector3(-200, 500, 200)}
        intensity={1}
      />
      <Globe {...props} />
      <OfficeLabels offices={offices} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotateSpeed={8}
        autoRotate={true}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}

export function hexToRgb(hex: string) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min: number, max: number, count: number) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
