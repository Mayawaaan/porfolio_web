uniform float uTime;
uniform vec3 uColorA; // Deep cyber emerald
uniform vec3 uColorB; // Neon mint / hyper teal
uniform vec3 uColorC; // Electric cyan
uniform vec3 uColorD; // Iridescent accent
uniform float uFresnelPower;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel Rim Glow
    float NdotV = max(dot(normal, viewDir), 0.0);
    float fresnel = pow(1.0 - NdotV, uFresnelPower);
    fresnel = clamp(fresnel, 0.0, 1.0);

    // Dynamic color gradient based on vertex displacement
    float normDisp = clamp(vDisplacement * 2.5 + 0.5, 0.0, 1.0);
    
    // Smooth multi-stop color gradient
    vec3 baseColor = mix(uColorA, uColorB, smoothstep(0.1, 0.6, normDisp));
    baseColor = mix(baseColor, uColorC, smoothstep(0.5, 0.9, normDisp));

    // Iridescent chromatic shift across viewing angle
    float chromatic = sin(dot(normal, vec3(0.0, 1.0, 0.0)) * 3.1415 + uTime * 0.8) * 0.5 + 0.5;
    vec3 iridColor = mix(uColorB, uColorD, chromatic);

    // Subsurface and internal energy pulse
    float pulse = sin(uTime * 1.5 + vPosition.y * 3.0) * 0.5 + 0.5;
    vec3 internalGlow = uColorC * pulse * 0.25;

    // Specular lighting
    vec3 lightDir = normalize(vec3(2.0, 4.0, 3.0));
    vec3 halfVector = normalize(lightDir + viewDir);
    float NdotH = max(dot(normal, halfVector), 0.0);
    float specular = pow(NdotH, 48.0) * 0.8;

    // Secondary rim highlight
    vec3 rimLight = uColorD * fresnel * 1.4;

    // Final color composite
    vec3 finalColor = baseColor * 0.85 + iridColor * 0.25 + internalGlow;
    finalColor += rimLight;
    finalColor += vec3(specular) * uColorC;
    finalColor *= uIntensity;

    // Ethereal alpha falloff near extreme grazing angles with solid core
    float alpha = clamp(0.92 + fresnel * 0.08, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, alpha);
}
