import styled from 'styled-components'

export const DivPostContainer = styled.div`
  width: 100%;
  height: 100%;
`
export const DivPostHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`

export const DivLoadingIndicator = styled(DivPostHeader)``

export const DivErrorMessage = styled(DivPostHeader)``

export const DivTableContainer = styled(DivPostHeader)`
  td.align-left {
    text-align: left;
  }
`

export const DivDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const DivDetailHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  width: 50%;
  margin-top: 10px;
  span.detail-value {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  span.head-title {
    display: flex;
    justify-content: flex-start;
    flex: 1;
  }
  span.detail-value {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    flex: 5;
  }
  textarea.detail-value {
    flex: 5;
  }
`

export const DivButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: RELATIVE;
  top: 10px;
  bottom: 20px;
  button.is-clear {
    position: relative;
    left: 20px;
  }
`