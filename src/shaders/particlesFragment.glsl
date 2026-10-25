varying vec3 vColor;
varying float vAlpha;

void main() {
    // Distance from center of point for soft circular glow
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) {
        discard;
    }

    // Soft gaussian radial falloff
    float glow = exp(-dist * dist * 10.0);
    float edge = smoothstep(0.5, 0.05, dist);

    float finalAlpha = edge * glow * vAlpha;

    gl_FragColor = vec4(vColor * 1.25, finalAlpha);
}
