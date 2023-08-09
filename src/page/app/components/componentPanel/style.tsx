import { css } from "@emotion/react"

export const componentContainerStyle = css`
  border-top: 1px solid blue;
  width: 100%;
`
export const searchWrapperStyle = css`
  padding: 16px 16px 8px 16px;
`

export const sessionListContainerStyle = css`
  ${searchWrapperStyle};
  padding-top: 0;
  padding-bottom: 0;
  max-height: calc(100vh - 158px);
  overflow-y: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const sessionContainerStyle = css`
  height: 100%;
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  &:not(:nth-of-type(1)) {
    margin-top: 8px;
  }
`

export const sessionTitleStyle = css`
  height: 38px;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`

export const componentListContainerStyle = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 88px);
  gap: 16px 8px;
`

export const itemContainerStyle = css`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 88px;
`

export const dragPreviewStyle = css`
  position: absolute;
  background: ; #e2e3e8;
  height: 1px;
  width: 1px;
`

export const iconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e3e8;
  cursor: grab;
  border-radius: 4px;
  color:white;
  transition: background-color 200ms ease-in-out;
  padding: 8px;
  &:hover {
    background-color: #eef2ee;
  }
`

export const nameStyle = css`
  font-size: 12px;
  width: 100%;
  color:#565656;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 4px 8px 0 8px;
  overflow: hidden;
  text-align: center;
  line-height: 14px;
`

export const emptyStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 122.5px;
  flex-direction: column;
  align-items: center;
  color: white;
`
