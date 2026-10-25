uniform float uTime;
uniform vec2 uMouse;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;
varying float vAlpha;

void main() {
    vec3 pos = position;

    // Harmonious flowing wave motion
    float waveX = sin(pos.y * 1.8 + uTime * 0.9 + aRandomness.x * 6.28) * 0.15;
    float waveY = cos(pos.x * 1.8 + uTime * 0.8 + aRandomness.y * 6.28) * 0.15;
    float waveZ = sin((pos.x + pos.y) * 1.2 + uTime * 0.7) * 0.2;
    pos += vec3(waveX, waveY, waveZ);

    // Subtle repulsion from mouse
    vec2 dir = pos.xy - uMouse * 2.0;
    float dist = length(dir);
    if (dist < 1.8) {
        float force = (1.8 - dist) / 1.8;
        pos.xy += normalize(dir) * force * 0.35;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation based on depth
    gl_PointSize = (aScale * 38.0) * (1.0 / -mvPosition.z);

    // Dynamic color variation: emerald to cyan
    float colorMix = sin(pos.x * 2.0 + uTime * 0.5) * 0.5 + 0.5;
    vec3 colorEmerald = vec3(0.06, 0.94, 0.56);
    vec3 colorTeal = vec3(0.18, 0.88, 0.92);
    vColor = mix(colorEmerald, colorTeal, colorMix);

    // Fade particles that are too close or too far
    vAlpha = clamp(1.2 / (-mvPosition.z * 0.4), 0.2, 0.85);
}
