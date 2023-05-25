import React from 'react';
import styled from "styled-components";

const StyledLoadingModal = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  
    & .content {
      padding: 50px;
      margin:  auto;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 23px;
      border-radius: 20px;
    }
`

const LoadingModal = () => {
    return (
        <StyledLoadingModal>
            <div className="content">
                행사를 불러오는 중...<br />
                잠시만 기다려주세요...
            </div>
        </StyledLoadingModal>
    );
};

export default LoadingModal;