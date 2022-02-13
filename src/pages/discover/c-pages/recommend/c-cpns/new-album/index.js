import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getNewAlbumAction } from '../../store/actionCreators'
// import { NEW_ALBUM_PAGE_NUM, NEW_ALBUM_PER_PAGE } from '@/common/contants'

import { Carousel } from 'antd'
import HYAlbumCover from '@/components/album-cover'
import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import { AlbumWrapper } from './style'

const HYNewAlbum = memo(() => {
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(['recommend', 'newAlbums']),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  const pageRef = useRef()
  useEffect(() => {
    dispatch(getNewAlbumAction())
  }, [dispatch])

  return (
    <AlbumWrapper>
      (<HYThemeHeaderRCM title="新碟"></HYThemeHeaderRCM>
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={() => pageRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map((item, index) => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return (
                      <HYAlbumCover
                        key={iten.id}
                        info={iten}
                        size={100}
                        width={118}
                        bgp="-570px"
                      >
                        {iten.name}
                      </HYAlbumCover>
                    )
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={() => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  )
})

export default HYNewAlbum
