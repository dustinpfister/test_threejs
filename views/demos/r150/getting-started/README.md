# getting-started r150 demo

This is a my first 150 demo and so far it looks like the WebGlRender no longer works on raspberry pi os.

```
three.js:19109 THREE.WebGLProgram: Shader Error 0 - VALIDATE_STATUS false

Program Info Log: invalid shaders

VERTEX

ERROR: 0:166: 'textureLod' : no matching overloaded function found
ERROR: 0:166: 'textureLod' : no matching overloaded function found
ERROR: 0:167: 'textureLod' : no matching overloaded function found
ERROR: 0:167: 'textureLod' : no matching overloaded function found
ERROR: 0:166: 'return' : function return is not matching type:
ERROR: 0:170: 'textureSize' : no matching overloaded function found
ERROR: 0:171: 'textureSize' : no matching overloaded function found
ERROR: 0:174: 'textureSize' : no matching overloaded function found

161:     vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
  162:     vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
  163:     vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
  164:     
  165:     vec2 lodFudge = pow( 1.95, lod ) / fullSize;
> 166: 	return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
  167: 		   g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
  168: }
  169: vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
  170: 	vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
  171: 	vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
  172: 	vec2 fLodSizeInv = 1.0 / fLodSize;
FRAGMENT

ERROR: 0:137: 'textureLod' : no matching overloaded function found
ERROR: 0:137: 'textureLod' : no matching overloaded function found
ERROR: 0:138: 'textureLod' : no matching overloaded function found
ERROR: 0:138: 'textureLod' : no matching overloaded function found
ERROR: 0:137: 'return' : function return is not matching type:
ERROR: 0:141: 'textureSize' : no matching overloaded function found
ERROR: 0:142: 'textureSize' : no matching overloaded function found
ERROR: 0:145: 'textureSize' : no matching overloaded function found
```