import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 24 24' {...props}>
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' xmlSpace='preserve'>
        <g id='XMLID_1_'>
          <path
            id='XMLID_3_'
            d='M349.1,321.2L283.9,256l65.2-65.2c7.4-7.4,7.4-20.5,0-27.9s-20.5-7.4-27.9,0L256,228.1l-65.2-65.2
                c-7.4-7.4-19.5-8.4-27.9,0c-8.4,8.4-7.4,20.5,0,27.9l65.2,65.2l-65.2,65.2c-8.4,8.4-7.4,20.5,0,27.9s20.5,7.4,27.9,0l65.2-65.2
                l65.2,65.2c7.4,7.4,20.5,7.4,27.9,0C356.5,340.7,356.5,328.6,349.1,321.2L349.1,321.2z'
          />
          <path
            id='XMLID_6_'
            d='M256,34.4c59.6,0,114.5,23.3,156.4,65.2c41.9,41.9,65.2,97.7,65.2,156.4s-23.3,114.5-65.2,156.4
                c-41.9,41.9-97.7,65.2-156.4,65.2s-114.5-23.3-156.4-65.2S34.4,314.6,34.4,256S57.7,141.5,99.6,99.6S196.4,34.4,256,34.4 M256,0
                C114.5,0,0,114.5,0,256s114.5,256,256,256s256-114.5,256-256S397.5,0,256,0z'
          />
        </g>
      </svg>
    </Svg>
  )
}

export default Icon