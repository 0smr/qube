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

float GetDist(vec3 p) {
    p.x += 0.16 * (u_value - 0.5);

    p.yz *= Rot(u_value * 3.14);
    p.xy *= Rot(u_value * -3.14);
    p.xz *= Rot(u_value * 3.14);

    return sdRoundBox(p, vec3(0.038), 0.005);
}

float RayMarch(vec3 ro, vec3 rd) {
    float dO = 0.0;

    for(int i = 0; i < 100; i++) {
        vec3 p = ro + rd * dO;
        float dS = GetDist(p);
        dO += dS;
        if(dO > 10.0 || abs(dS) < 0.001) break;
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
	vec3 ro = vec3(0, 0, 2.25); // camera position

    vec3 rd = GetRayDir(uv, ro, 15.0);
    vec4 col = vec4(0);

    float d = RayMarch(ro, rd);

    vec3 p = ro + rd * d;
    if(d<10.0) {
        vec3 n = GetNormal(p);
        float dif = dot(n, normalize(vec3(1))) * .5 + .5;
        col = vec4(dif) * mix(u_off, u_on, u_value);
    }

    fragColor = col;
}
