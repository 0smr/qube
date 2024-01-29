#version 440
layout(location = 0) in vec2 qt_TexCoord0;
layout(location = 0) out vec4 fragColor;
layout(std140, binding = 0) uniform buf {
    mat4 qt_Matrix;
    float qt_Opacity;
    float u_time;
    float u_value;
    float height;
    float width;
    vec4 u_off;
    vec4 u_on;
    vec2 u_mouse;
};
layout(binding = 1) uniform sampler2D source;

float px = 1/height;
vec2 size = vec2(width, height);
vec2 ratio = vec2(width, height)/height;

mat2 Rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }
float sdRoundBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0) - r;
}

float GetDist(vec3 p) {
    vec2 ro = (-u_mouse/size + 0.5)/10.0;
    vec3 s = mix(vec3(0.038), vec3(.0,.0,.065), u_value);
    float r = mix(0.005, 0.01, u_value);

    p.xz *= Rot(-ro.x * 3.14);
    p.yz *= Rot(ro.y * 3.14);

    float d = sdRoundBox(p, vec3(0.07 * ratio.x - px, 0.07 - px, 0.001), 0.5 * px);

    return d;
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

        vec2 rr = (-u_mouse/size + 0.5)/10.0;
        p.xz *= Rot(-rr.x * 3.14);
        p.yz *= Rot(rr.y * 3.14);
        vec4 tex = texture(source, -p.xy / ratio * 15 / 2.25 + vec2(0.4 - px, 0));
        col = mix(col, tex, tex.a);
    }

    col = pow(col, vec4(.4545)); // gamma correction

    fragColor = col;
}
