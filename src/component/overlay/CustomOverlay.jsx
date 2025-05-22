import { useEffect, useRef } from 'react'
import { useControls } from 'leva'
import CustomEffectBase from "../../r3f-gist/effect/CustomEffectBase"
import fragmentShader from '../../shader/overlay/fragment.glsl'

class OverlayEffect extends CustomEffectBase {
  constructor() {
    super('Overlay', {
      fragmentShader,
      childUniforms: [
        ['uFoldY', { value: 0.5 }],
        ['uFoldStrength', { value: 0.03 }],
        ['uFoldFrequency', { value: 120 }],
        ['uShadowIntensity', { value: 0.15 }]
      ]
    })
  }
}

export default function CustomOverlay() {
  const effectRef = useRef(new OverlayEffect())

  const {
    foldY,
    foldStrength,
    foldFrequency,
    shadowIntensity
  } = useControls('Overlay Effect', {
    foldY: { value: 0.5, min: 0, max: 1, step: 0.01 },
    foldStrength: { value: 0.03, min: 0, max: 0.1, step: 0.001 },
    foldFrequency: { value: 120, min: 1, max: 200, step: 1 },
    shadowIntensity: { value: 0.15, min: 0, max: 1, step: 0.01 }
  })

  useEffect(() => {

    const effect = effectRef.current
    if (effect) {
      effect.setUniform('uFoldY', foldY)
      effect.setUniform('uFoldStrength', foldStrength)
      effect.setUniform('uFoldFrequency', foldFrequency)
      effect.setUniform('uShadowIntensity', shadowIntensity)
    }
  }, [foldY, foldStrength, foldFrequency, shadowIntensity])

  return <primitive object={effectRef.current} />
}
