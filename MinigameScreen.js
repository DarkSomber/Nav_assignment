import React, { useEffect, useMemo, useReducer, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import { colors } from "./Theme";

const W = Dimensions.get("window").width - 40;
const H = 340;
const FALL_Y = H - 10;
const BR = 7;
const PR = 5;
const GRAVITY = 0.3;
const MAX_VY = 8;
const COST = 10;
const UPGRADE_COST = 20;

export default function MinigameScreen({
  points,
  setPoints,
  ballCount,
  setBallCount,
}) {
  const balls = useRef([]);
  const [, redraw] = useReducer((n) => n + 1, 0);

  const pins = useMemo(() => {
    const gap = W / 7;
    const list = [];
    for (let r = 0; r < 7; r++) {
      const odd = r % 2;
      for (let c = 0; c < 7 - odd; c++) {
        list.push({ x: gap * (c + (odd ? 1 : 0.5)), y: 60 + r * 38 });
      }
    }
    return list;
  }, []);

  useEffect(() => {
    let id;
    const tick = () => {
      const list = balls.current;
      if (list.length) {
        for (const b of list) {
          b.vy = Math.min(b.vy + GRAVITY, MAX_VY);
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < BR || b.x > W - BR) {
            b.x = Math.min(Math.max(b.x, BR), W - BR);
            b.vx *= -0.7;
          }
          for (const p of pins) {
            const dx = b.x - p.x,
              dy = b.y - p.y,
              d = Math.hypot(dx, dy);
            if (d === 0 || d >= BR + PR) continue;
            const nx = dx / d,
              ny = dy / d,
              dot = b.vx * nx + b.vy * ny;
            if (dot < 0) {
              b.vx -= 1.6 * dot * nx;
              b.vy -= 1.6 * dot * ny;
              b.vx += (Math.random() - 0.5) * 0.6;
              b.earned++;
            }
            b.x = p.x + nx * (BR + PR);
            b.y = p.y + ny * (BR + PR);
          }
        }
        const done = list.filter((b) => b.y > FALL_Y);
        if (done.length) {
          const gained = done.reduce((sum, b) => sum + b.earned, 0);
          balls.current = list.filter((b) => b.y <= FALL_Y);
          if (gained) setPoints((p) => p + gained);
        }
        redraw();
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [pins, setPoints]);

  const drop = () => {
    if (points < COST) return;
    setPoints((p) => p - COST);
    const gap = Math.min(24, (W - 40) / ballCount);
    for (let i = 0; i < ballCount; i++) {
      balls.current.push({
        x: W / 2 + (i - (ballCount - 1) / 2) * gap + Math.random() * 6,
        y: 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 0,
        earned: 0,
      });
    }
  };

  const upgrade = () => {
    if (points < UPGRADE_COST) return;
    setPoints((p) => p - UPGRADE_COST);
    setBallCount(ballCount + 1);
  };

  const pending = balls.current.reduce((sum, b) => sum + b.earned, 0);

  return (
    <View style={s.container}>
      <Text style={s.pending}>In play: +{pending}</Text>
      <Text style={s.points}>{points}</Text>
      <TouchableOpacity
        style={[s.button, points < COST && s.disabled]}
        onPress={drop}
        disabled={points < COST}
      >
        <Text style={s.buttonText}>
          Drop {ballCount} balls (-{COST})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[s.upgrade, points < UPGRADE_COST && s.disabled]}
        onPress={upgrade}
        disabled={points < UPGRADE_COST}
      >
        <Text style={s.upgradeText}>+1 ball (-{UPGRADE_COST})</Text>
      </TouchableOpacity>

      <View style={s.board}>
        {pins.map((p, i) => (
          <View key={i} style={[s.pin, { left: p.x - PR, top: p.y - PR }]} />
        ))}
        {balls.current.map((b, i) => (
          <View key={i} style={[s.ball, { left: b.x - BR, top: b.y - BR }]} />
        ))}
        <View style={s.hole} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 16, top: 30 },
  points: { fontSize: 30, fontWeight: "bold", color: colors.dark, marginBottom: 10 },
  upgrade: {
    backgroundColor: colors.light,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    marginBottom: 16,
  },
  upgradeText: { color: colors.dark, fontWeight: "bold" },
  pending: { fontSize: 14, color: colors.mid, marginBottom: 10 },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.dark,
    marginBottom: 16,
  },
  disabled: { opacity: 0.4 },
  buttonText: { color: colors.white, fontWeight: "bold", fontSize: 16 },
  board: {
    width: W,
    height: H,
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  pin: {
    position: "absolute",
    width: PR * 2,
    height: PR * 2,
    borderRadius: PR,
    backgroundColor: colors.primary,
  },
  ball: {
    position: "absolute",
    width: BR * 2,
    height: BR * 2,
    borderRadius: BR,
    backgroundColor: colors.mid,
    borderWidth: 2,
    borderColor: colors.dark,
  },
  hole: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 4,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.light,
  },
});