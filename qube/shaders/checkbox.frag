#version 440
layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;
layout(std140, binding = 0) uniform buf {
    mat4 qt_Matrix;
    float qt_Opacity;
    float u_value;
    float height;
    float width;
    vec4 u_off;
    vec4 u_on;
};

float px = 1/height;
vec2 size = vec2(width, height);
vec2 ratio = vec2(width, height)/height;

mat2 Rot(float a) { float s=sin(a), c = cos(a); return mat2(c, -s, s, c); }
float sdRoundBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

float sdFrame(in vec3 p, in vec2 b, in vec4 r, float tikness) {
    r.xy = (p.x>0.0)?r.xy : r.zw;
    r.x  = (p.y>0.0)?r.x  : r.y;
    vec2 q = abs(p.xy) - b+r.x;
    q = vec2(min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x, p.z);
    return length(q) - tikness;
}

float GetDist(vec3 p) {
    float st1 = min(u_value, 1); // 0 - 1
    float st2 = clamp(u_value - 1, 0, 1); // 1 - 2

    vec2  ro  = mix(vec2(-0.25, 1.0), mix(vec2(-1.25, 0.515), vec2(-2.25, 1.25), st2), st1);
    vec3  s   = mix(vec3(0), mix(vec3(0,0,1.1), vec3(0.55), st2), st1);
    float r   = mix(0, mix(0.1, 0.05, st2), st1);
    vec3 bp = p;

    p.xy *= Rot(ro.x * 3.14);
    p.xz *= Rot(ro.y * 3.14);
    p.yz *= Rot(ro.y * 3.14);

    bp.yz *= Rot(st2 * -0.5);
    bp.xz *= Rot(st2 * 0.7);
    bp.yx *= Rot(st2 * 0.2);

    float f = sdFrame(bp, vec2(mix(1.15, .85, st2)), vec4(0.3), 0.08);
    return min(sdRoundBox(p, s, r), f);
}

float RayMarch(vec3 ro, vec3 rd) {
    float dO = 0.0;

    for(int i = 0; i < 100; i++) {
        vec3 p = ro + rd * dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO > 10. || abs(dS) < 0.001) break;
    }

    return dO;
}

vec3 GetNormal(vec3 p) {
    vec2 e = vec2(.001, 0);
    vec3 n = GetDist(p) - vec3(GetDist(p-e.xyy), GetDist(p-e.yxy),GetDist(p-e.yyx));
    return normalize(n);
}

vec3 GetRayDir(vec2 uv, vec3 p, float z) {
    vec3 f = normalize(-p),
         r = normalize(cross(vec3(0,1,0), f)),
         u = cross(f,r),
         c = f*z,
         i = c + uv.x*r + uv.y*u;
    return normalize(i);
}

void main() {
	vec2 uv = (qt_TexCoord0.xy - 0.5) * ratio;
	vec3 ro = vec3(0, 0, 2.75); // camera position

    vec3 rd = GetRayDir(uv, ro, 1.0);
    vec4 col = vec4(0);

    float d = RayMarch(ro, rd);

    vec3 p = ro + rd * d;
    if(d<10.) {
        vec3 n = GetNormal(p);
        float dif = dot(n, normalize(vec3(1))) * .5 + .5;
        col = vec4(dif) * mix(u_off, u_on, u_value);
    }

    fragColor = col;
}
