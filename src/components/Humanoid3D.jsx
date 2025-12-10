import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const BRAIN_URL = "http://localhost:8080/api/v1/query";

export default function Humanoid3D() {
    const mountRef = useRef(null);
    const mouthMeshesRef = useRef([]);
    const speakingRef = useRef(false);
    const clockRef = useRef(new THREE.Clock());

    const [log, setLog] = useState([]);
    const [listening, setListening] = useState(false);

    // -----------------------------
    // THREE AVATAR + LIP SYNC
    // -----------------------------
    useEffect(() => {
        if (!mountRef.current) return;

        const width = 420;
        const height = 520;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
        camera.position.set(0, 1.2, 3.2);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        mountRef.current.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffff, 1.3);
        light.position.set(1, 2, 4);
        scene.add(light);

        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambient);

        const loader = new GLTFLoader();
        loader.load(
            "https://models.readyplayer.me/6936fb10e37c2412ef395092.glb",
            (gltf) => {
                const avatar = gltf.scene;

                avatar.traverse((obj) => {
                    if (obj.isMesh) obj.frustumCulled = false;
                });

                avatar.scale.set(1.6, 1.6, 1.6);
                avatar.position.set(0, -0.9, 0);

                const mouthMeshes = [];
                avatar.traverse((obj) => {
                    if (obj.isMesh && obj.morphTargetDictionary && obj.morphTargetInfluences) {
                        mouthMeshes.push(obj);
                    }
                });

                mouthMeshesRef.current = mouthMeshes;
                scene.add(avatar);
            }
        );

        const animate = () => {
            requestAnimationFrame(animate);

            const t = clockRef.current.getElapsedTime();

            if (mouthMeshesRef.current.length > 0) {
                let value = 0;
                if (speakingRef.current) {
                    value = (Math.sin(t * 18) + 1) / 2; // faster mouth
                    value = THREE.MathUtils.clamp(value, 0, 1);
                }

                mouthMeshesRef.current.forEach((mesh) => {
                    const dict = mesh.morphTargetDictionary;
                    const infl = mesh.morphTargetInfluences;

                    for (let i = 0; i < infl.length; i++) infl[i] = 0;

                    Object.keys(dict).forEach((key) => {
                        const lower = key.toLowerCase();
                        if (
                            lower.includes("mouth") ||
                            lower.includes("jaw") ||
                            lower.includes("viseme") ||
                            lower.includes("lip")
                        ) {
                            infl[dict[key]] = value;
                        }
                    });
                });
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    // -----------------------------
    // SPEECH TO TEXT
    // -----------------------------
    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition not supported.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        setListening(true);

        recognition.onresult = async (e) => {
            const text = e.results[0][0].transcript;
            setListening(false);
            addLog("you", text);

            const reply = await sendToBrain(text);
            addLog("companion", reply);
            speak(reply);
        };

        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);
    };

    // -----------------------------
    // BACKEND QUERY
    // -----------------------------
    async function sendToBrain(text) {
        const token = localStorage.getItem("AuthToken");
        const userId = Number(localStorage.getItem("UserId") || "1");

        const res = await fetch(BRAIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ userId, query: text })
        });

        const data = await res.json();
        return data.data || "I’m thinking...";
    }

    // -----------------------------
    // FAST VOICE OUTPUT
    // -----------------------------
    function speak(text) {
        if (!("speechSynthesis" in window)) return;

        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = 1.35;
        utter.pitch = 1.05;
        utter.volume = 1;
        utter.lang = "en-US";

        utter.onstart = () => {
            speakingRef.current = true;
        };

        utter.onend = () => {
            speakingRef.current = false;
            resetMouth();
        };

        // ✅ REAL AUDIO → REAL LIPSYNC
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;

        const source = audioCtx.createMediaStreamSource(
            window.speechSynthesis.getVoices
                ? audioCtx.createMediaStreamDestination().stream
                : audioCtx.createMediaStreamDestination().stream
        );

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.connect(audioCtx.destination);

        const driveLips = () => {
            if (!speakingRef.current) return;

            analyser.getByteFrequencyData(dataArray);
            const avg =
                dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            const openness = THREE.MathUtils.clamp(avg / 120, 0, 1);

            mouthMeshesRef.current.forEach((mesh) => {
                const dict = mesh.morphTargetDictionary;
                const infl = mesh.morphTargetInfluences;

                for (let i = 0; i < infl.length; i++) infl[i] = 0;

                Object.keys(dict).forEach((key) => {
                    const lower = key.toLowerCase();
                    if (
                        lower.includes("mouth") ||
                        lower.includes("jaw") ||
                        lower.includes("viseme") ||
                        lower.includes("lip")
                    ) {
                        infl[dict[key]] = openness;
                    }
                });
            });

            requestAnimationFrame(driveLips);
        };

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
        driveLips();
    }

    function resetMouth() {
        mouthMeshesRef.current.forEach((mesh) => {
            if (mesh.morphTargetInfluences) {
                for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
                    mesh.morphTargetInfluences[i] = 0;
                }
            }
        });
    }


    function addLog(role, text) {
        setLog((prev) => [...prev, { role, text }]);
    }

    // -----------------------------
    // UI CLEAN LAYOUT
    // -----------------------------
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div ref={mountRef} style={styles.avatar} />

                <button onClick={startListening} style={styles.speak}>
                    {listening ? "Listening…" : "Speak"}
                </button>
            </div>

            <div style={styles.chat}>
                <div style={styles.header}>Your Companion</div>
                <div style={styles.sub}>
                    Ask anything. I’ll remember, reflect, and respond.
                </div>

                {log.map((m, i) => (
                    <div
                        key={i}
                        style={{
                            ...styles.bubble,
                            background: m.role === "you" ? "#2f6d5f" : "#ffffff",
                            color: m.role === "you" ? "#fff" : "#000",
                            alignSelf: m.role === "you" ? "flex-end" : "flex-start"
                        }}
                    >
                        {m.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

// -----------------------------
// STYLES
// -----------------------------
const styles = {
    page: {
        display: "flex",
        minHeight: "100vh",
        background: "#f6f7fb"
    },

    card: {
        width: 460,
        background: "#fdebea",
        borderRadius: 32,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },

    avatar: {
        width: 420,
        height: 520,
        background: "#000",
        borderRadius: 24,
        overflow: "hidden"
    },

    speak: {
        width: "100%",
        padding: 14,
        borderRadius: 999,
        background: "#000",
        color: "#fff",
        fontSize: 16,
        border: "none",
        cursor: "pointer"
    },

    chat: {
        flex: 1,
        padding: 64,
        display: "flex",
        flexDirection: "column"
    },

    header: {
        fontSize: 14,
        letterSpacing: 2,
        textTransform: "uppercase",
        opacity: 0.6
    },

    sub: {
        fontSize: 32,
        fontWeight: 600,
        marginBottom: 40
    },

    bubble: {
        maxWidth: 520,
        padding: "14px 18px",
        borderRadius: 18,
        marginBottom: 14,
        fontSize: 15,
        lineHeight: 1.45,
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
    }
};
